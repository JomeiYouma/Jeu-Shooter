import Player from '../classes/Player.js'
import { world1 } from '../data/index.js'
import { STATE, createStars, clamp } from './constants.js'
import { resetWeapons, fireWeapon, fireEnemyWeapons } from './weapons.js'
import { spawnEnemies, spawnItems, spawnObstacles } from './spawners.js'
import { movePlayer, moveEnemies, handleCollisions } from './physics.js'

// -- Build initial game state ------------------------------------
export function buildGameState(width, height) {
  const player = new Player({
    acceleration: 1,
    weapons: [18],
    shieldForce: 0,
    healthPoints: 10,
    maxHealth: 10,
    contactDamage: 0,
    maxSpeed: 220,
    maxSideSpeed: 180,
    maxBrakeSpeed: 120,
    immunityTime: 1200,
    width: 48,
    height: 48,
  })
  player.x = width / 2
  player.y = height - 40

  return {
    phase: STATE.START,
    world: world1,
    currentLevelIndex: 0,
    levelTime: 0,
    transitionTimer: 0,
    transitionText: '',

    player,
    score: 0,
    mouseX: width / 2,
    mouseY: height - 40,
    mouseDown: false,

    bullets: [],
    enemies: [],
    activeItems: [],
    activeObstacles: [],
    spawnedEnemyIds: new Set(),
    itemSpawnTimer: 0,
    obstacleSpawnTimer: 0,
    itemsSpawnedThisLevel: 0,
    obstaclesSpawnedThisLevel: 0,
    weaponStates: new Map(),
    enemyBullets: [],

    stars: createStars(80, width, height),
    itemPickedUp: null,
    itemPickedUpTimer: 0,

    bossRef: null,

    playerPrevX: width / 2,
    playerPrevY: height - 40,
    playerSpeedPct: 0,
    playerAccelTime: 0,
  }
}

// -- Reset game (on game over / victory) -------------------------
export function resetGame(G, width, height) {
  resetWeapons()
  Object.assign(G, buildGameState(width, height))
  G.phase = STATE.START
}

// -- Start a level -----------------------------------------------
export function startLevel(g) {
  const level = g.world.getLevel(g.currentLevelIndex)
  if (!level) { g.phase = STATE.VICTORY; return }
  g.phase = STATE.PLAYING
  g.levelTime = 0
  g.enemies = []
  g.bullets = []
  g.enemyBullets = []
  g.spawnedEnemyIds = new Set()
  g.itemSpawnTimer = 0
  g.obstacleSpawnTimer = 0
  g.itemsSpawnedThisLevel = 0
  g.obstaclesSpawnedThisLevel = 0
  g.bossRef = null
}

// -- Check level completion --------------------------------------
function checkLevelEnd(g) {
  const level = g.world.getLevel(g.currentLevelIndex)
  if (!level) return

  const allSpawned = g.spawnedEnemyIds.size >= level.enemies.length
  const allDead = g.enemies.length === 0

  if (allSpawned && allDead) {
    if (level.type === 'bonus') {
      if (g.itemsSpawnedThisLevel < level.amountOfItems) return
      if (g.activeItems.length > 0) return
    }
    g.phase = STATE.LEVEL_TRANSITION
    g.transitionTimer = 5

    const nextLevel = g.world.getLevel(g.currentLevelIndex + 1)
    if (nextLevel) {
      g.transitionText = `Niveau ${nextLevel.levelNo}${nextLevel.isBoss ? ' BOSS' : nextLevel.isBonus ? ' BONUS' : ''}`
    } else {
      g.transitionText = 'Niveau final termine !'
    }
  }
}

// -- Main update tick --------------------------------------------
export function update(G, dtMs, bounds) {
  const dt = dtMs / 1000
  const g = G
  const { width, height } = bounds

  // Animate stars always
  for (const s of g.stars) {
    s.y += s.speed * dt
    if (s.y > height) { s.y = -2; s.x = Math.random() * width }
  }

  if (g.phase === STATE.START || g.phase === STATE.GAME_OVER || g.phase === STATE.VICTORY) return

  // Player movement
  movePlayer(g, dt, bounds)

  // LEVEL TRANSITION countdown
  if (g.phase === STATE.LEVEL_TRANSITION) {
    g.transitionTimer -= dt
    if (g.transitionTimer <= 0) {
      g.currentLevelIndex++
      if (g.currentLevelIndex >= g.world.levelCount) {
        g.phase = STATE.VICTORY
      } else {
        startLevel(g)
      }
      return
    }
    // Continue to game logic below (no enemies, but items/obstacles/shooting persist)
  }

  // PLAYING or LEVEL_TRANSITION
  const level = g.world.getLevel(g.currentLevelIndex)
  if (!level) return
  g.levelTime += dt

  // Fire
  fireWeapon(g, dt)

  // Move bullets (with homing support)
  const HOMING_TURN = 8 // radians/s – how fast headed bullets steer
  g.bullets = g.bullets
    .map((b) => {
      if (b.headed) {
        // Lock onto first target; never switch
        if (!b._headTarget || !b._headTarget.isAlive) {
          if (!b._headTarget) {
            // First assignment: pick nearest enemy
            let closest = null
            let minDist = Infinity
            for (const e of g.enemies) {
              const d = Math.hypot(e.x - b.x, e.y - b.y)
              if (d < minDist) { minDist = d; closest = e }
            }
            b._headTarget = closest // may be null if no enemies
          }
          // Target dead or no target → fly straight
          if (!b._headTarget || !b._headTarget.isAlive) {
            return { ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt }
          }
        }
        const t = b._headTarget
        const speed = Math.hypot(b.vx, b.vy)
        const curAngle = Math.atan2(b.vy, b.vx)
        const targetAngle = Math.atan2(t.y - b.y, t.x - b.x)
        let diff = targetAngle - curAngle
        while (diff > Math.PI) diff -= Math.PI * 2
        while (diff < -Math.PI) diff += Math.PI * 2
        const maxTurn = HOMING_TURN * dt
        const turn = Math.max(-maxTurn, Math.min(maxTurn, diff))
        const newAngle = curAngle + turn
        return {
          ...b,
          vx: Math.cos(newAngle) * speed,
          vy: Math.sin(newAngle) * speed,
          x: b.x + Math.cos(newAngle) * speed * dt,
          y: b.y + Math.sin(newAngle) * speed * dt,
        }
      }
      return { ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt }
    })
    .filter((b) => b.y > -20 && b.y < height + 20 && b.x > -20 && b.x < width + 20)

  // Spawn & move enemies (only while playing)
  if (g.phase === STATE.PLAYING) {
    spawnEnemies(g, level, bounds)
    moveEnemies(g, dt, bounds)
    fireEnemyWeapons(g, dt, bounds)
  }

  // Spawn & move items
  spawnItems(g, level, dt, bounds)
  g.activeItems = g.activeItems
    .map((it) => ({ ...it, y: it.y + it.speed * dt }))
    .filter((it) => it.y < height + 30)

  // Move enemy bullets
  g.enemyBullets = g.enemyBullets
    .map((b) => ({ ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt }))
    .filter((b) => b.y > -20 && b.y < height + 40 && b.x > -20 && b.x < width + 20)

  // Spawn & move obstacles
  spawnObstacles(g, level, dt, bounds)
  g.activeObstacles = g.activeObstacles
    .map((obs) => ({ ...obs, y: obs.y + obs.speed * dt }))
    .filter((obs) => obs.y < height + 60)

  // Collisions
  handleCollisions(g)

  // Item pickup text timer
  if (g.itemPickedUpTimer > 0) {
    g.itemPickedUpTimer -= dt
    if (g.itemPickedUpTimer <= 0) g.itemPickedUp = null
  }

  // Player dead?
  if (!g.player.isAlive) {
    g.phase = STATE.GAME_OVER
    return
  }

  // Level done? (only while playing)
  if (g.phase === STATE.PLAYING) {
    checkLevelEnd(g)
  }
}
