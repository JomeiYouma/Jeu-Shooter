import { useEffect, useRef, useState, useCallback } from 'react'
import './ShooterGame.css'
import Player from './classes/Player.js'
import Enemy from './classes/Enemy.js'
import { weapons, enemyTypes, items, obstacles, world1 } from './data/index.js'
import GifPlayer from './utils/gifPlayer.js'

// -- GUI bar images -------------------------------------------
import accelbar0 from './assets/gui/Accelbar/accelbar_0.png'
import accelbar1 from './assets/gui/Accelbar/accelbar_.1.png'
import accelbar2 from './assets/gui/Accelbar/accelbar_.2.png'
import accelbar3 from './assets/gui/Accelbar/accelbar_.3.png'
import accelbar4 from './assets/gui/Accelbar/accelbar_.4.png'
import accelbar5 from './assets/gui/Accelbar/accelbar_.5.png'
import redbar0 from './assets/gui/Redbar/redbar_0.png'
import redbar1 from './assets/gui/Redbar/redbar_1.png'
import redbar2 from './assets/gui/Redbar/redbar_2.png'
import redbar3 from './assets/gui/Redbar/redbar_3.png'
import redbar4 from './assets/gui/Redbar/redbar_4.png'
import bluebar0 from './assets/gui/Bluebar/bluebar_0.png'
import bluebar1 from './assets/gui/Bluebar/bluebar_1.png'
import bluebar2 from './assets/gui/Bluebar/bluebar_2.png'
import bluebar3 from './assets/gui/Bluebar/bluebar_3.png'
import bluebar4 from './assets/gui/Bluebar/bluebar_4.png'

// -- Helpers ----------------------------------------------------
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const randBetween = (a, b) => a + Math.random() * (b - a)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const DEG2RAD = Math.PI / 180

// -- Image preloader / cache (PNGs only) ----------------------
const _imgCache = {}
function loadImg(src) {
  if (!src) return null
  if (!_imgCache[src]) {
    const img = new Image()
    img.src = src
    _imgCache[src] = img
  }
  return _imgCache[src]
}

// Pre-load bar images into arrays
const ACCEL_BARS = [accelbar0, accelbar1, accelbar2, accelbar3, accelbar4, accelbar5].map(loadImg)
const RED_BARS   = [redbar0, redbar1, redbar2, redbar3, redbar4].map(loadImg)
const BLUE_BARS  = [bluebar0, bluebar1, bluebar2, bluebar3, bluebar4].map(loadImg)

// -- Animated GIF players (one per unique bullet GIF) ----------
const _gifPlayers = {}
function getGifPlayer(src) {
  if (!src) return null
  if (!_gifPlayers[src]) {
    const player = new GifPlayer()
    player.load(src) // async, frames arrive later
    _gifPlayers[src] = player
  }
  return _gifPlayers[src]
}
// Pre-load all weapon bullet GIFs
for (const w of weapons) {
  if (w.bulletGif) getGifPlayer(w.bulletGif)
}

// -- Save initial weapon stats so we can reset after victory --
const _weaponDefaults = weapons.map(w => ({
  damage: w.damage,
  bulletsSize: w.bulletsSize,
  bulletsPerSalve: w.bulletsPerSalve,
  salveDuration: w.salveDuration,
  cooldownTime: w.cooldownTime,
  salveRotationStep: w.salveRotationStep,
  bulletShootRotation: [...w.bulletShootRotation],
}))
function resetWeapons() {
  weapons.forEach((w, i) => Object.assign(w, _weaponDefaults[i]))
}

// -- Game states ------------------------------------------------
const STATE = {
  START: 'start',
  PLAYING: 'playing',
  LEVEL_TRANSITION: 'level_transition',
  GAME_OVER: 'game_over',
  VICTORY: 'victory',
}

// -- Stars for parallax background ------------------------------
function createStars(count, w, h) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.5 + Math.random() * 1.5,
    speed: 15 + Math.random() * 40,
    alpha: 0.3 + Math.random() * 0.7,
  }))
}

// ---------------------------------------------------------------
//  ShooterGame component
// ---------------------------------------------------------------
function ShooterGame({ width = 900, height = 600 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [uiState, setUiState] = useState({
    phase: STATE.START,
    score: 0,
    hp: 10,
    maxHp: 10,
    shield: 0,
    levelNo: 1,
    levelType: 'attack',
    worldName: world1.name,
    transitionText: '',
    itemPickedUp: null,
    bossHp: 0,
    bossMaxHp: 0,
  })

  // -- Build initial game state ---------------------------------
  const buildGameState = useCallback(() => {
    const player = new Player({
      acceleration: 1,
      weapons: [0],
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
      weaponCooldownTimer: 0,
      playerSalveRemaining: 0,
      playerSalveTimer: 0,
      playerSalveFiredCount: 0,
      enemyBullets: [],

      stars: createStars(80, width, height),
      itemPickedUp: null,
      itemPickedUpTimer: 0,

      // boss tracking
      bossRef: null,

      // speed tracking for acceleration bar
      playerPrevX: width / 2,
      playerPrevY: height - 40,
      playerSpeedPct: 0,
    }
  }, [width, height])

  // -- Main game loop in useEffect ------------------------------
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId = 0
    let lastTime = 0

    // Init game state
    const G = buildGameState()
    gameRef.current = G

    // -- Input handlers ---------------------------------------
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = width / rect.width
      const scaleY = height / rect.height
      G.mouseX = clamp((e.clientX - rect.left) * scaleX, 20, width - 20)
      G.mouseY = clamp((e.clientY - rect.top) * scaleY, 20, height - 20)
    }
    const onMouseDown = () => { G.mouseDown = true }
    const onMouseUp = () => { G.mouseDown = false }

    const onTouchMove = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const scaleX = width / rect.width
      const scaleY = height / rect.height
      G.mouseX = clamp((touch.clientX - rect.left) * scaleX, 20, width - 20)
      G.mouseY = clamp((touch.clientY - rect.top) * scaleY, 20, height - 20)
    }
    const onTouchStart = (e) => {
      G.mouseDown = true
      onTouchMove(e)
    }
    const onTouchEnd = () => { G.mouseDown = false }

    const onClick = () => {
      if (G.phase === STATE.START) {
        startLevel(G)
      } else if (G.phase === STATE.GAME_OVER || G.phase === STATE.VICTORY) {
        // Reset weapons on victory (world complete) or game over (lost)
        resetWeapons()
        Object.assign(G, buildGameState())
        G.phase = STATE.START
      }
    }

    // -- Start a level ----------------------------------------
    function startLevel(g) {
      const level = g.world.getLevel(g.currentLevelIndex)
      if (!level) { g.phase = STATE.VICTORY; return }
      g.phase = STATE.PLAYING
      g.levelTime = 0
      g.enemies = []
      g.bullets = []
      g.enemyBullets = []
      g.activeItems = []
      g.activeObstacles = []
      g.spawnedEnemyIds = new Set()
      g.itemSpawnTimer = 0
      g.obstacleSpawnTimer = 0
      g.itemsSpawnedThisLevel = 0
      g.obstaclesSpawnedThisLevel = 0
      g.bossRef = null
    }

    // -- Spawn enemies from level data ------------------------
    function spawnEnemies(g, level) {
      for (let i = 0; i < level.enemies.length; i++) {
        if (g.spawnedEnemyIds.has(i)) continue
        const def = level.enemies[i]
        if (g.levelTime >= (def.timeOfEntry ?? 0)) {
          g.spawnedEnemyIds.add(i)
          const typeIndex = typeof def.type === 'number' ? def.type : 0
          const etype = enemyTypes[typeIndex] || enemyTypes[0]
          const posX = def.positionOfEntry === 'random'
            ? randBetween(etype.width, width - etype.width)
            : def.positionOfEntry

          const enemy = new Enemy({
            timeOfEntry: def.timeOfEntry,
            positionOfEntry: posX,
            type: etype,
          })
          enemy.x = posX
          enemy.y = -etype.height
          enemy.spawnTime = g.levelTime
          enemy.zigzagPhase = 0
          enemy.weaponCooldown = 0
          enemy.salveCount = 0
          enemy.salveTimer = 0

          if (etype.isBoss) g.bossRef = enemy
          g.enemies.push(enemy)
        }
      }
    }

    // -- Spawn items falling ----------------------------------
    function spawnItems(g, level, dt) {
      if (g.itemsSpawnedThisLevel >= level.amountOfItems) return
      g.itemSpawnTimer += dt
      const interval = 8 / Math.max(1, level.amountOfItems)
      if (g.itemSpawnTimer >= interval) {
        g.itemSpawnTimer = 0
        g.itemsSpawnedThisLevel++
        const itemDef = pick(items)
        g.activeItems.push({
          def: itemDef,
          x: randBetween(30, width - 30),
          y: -20,
          speed: 50 + Math.random() * 30,
          w: 22,
          h: 22,
        })
      }
    }

    // -- Spawn obstacles falling ------------------------------
    function spawnObstacles(g, level, dt) {
      if (g.obstaclesSpawnedThisLevel >= level.amountOfObstacles) return
      g.obstacleSpawnTimer += dt
      const interval = 6 / Math.max(1, level.amountOfObstacles)
      if (g.obstacleSpawnTimer >= interval) {
        g.obstacleSpawnTimer = 0
        g.obstaclesSpawnedThisLevel++
        const obsDef = pick(obstacles)
        g.activeObstacles.push({
          def: obsDef,
          x: randBetween(30, width - 30),
          y: -obsDef.height,
          speed: 45 + Math.random() * 25,
          hp: obsDef.isBreakable ? 3 : -1,
        })
      }
    }

    // -- Fire player weapon -----------------------------------
    // Supports salves: bulletsPerSalve shots spaced over salveDuration,
    // each shot rotated by salveRotationStep (recoil). If bulletsPerSalve=1
    // it behaves like a normal semi-auto.
    function emitPlayerBullets(g, w, salveIdx) {
      const extraRot = salveIdx * w.salveRotationStep
      for (const rot of w.bulletShootRotation) {
        const rad = (rot + extraRot) * DEG2RAD
        g.bullets.push({
          x: g.player.x,
          y: g.player.y - g.player.height / 2,
          vx: Math.sin(rad) * 500,
          vy: -Math.cos(rad) * 500,
          radius: w.bulletsSize,
          damage: w.damage,
          bulletGif: w.bulletGif,
        })
      }
    }

    function fireWeapon(g, dt) {
      const dtMs = dt * 1000

      // --- Salve in progress: emit remaining bursts ---------------
      if (g.playerSalveRemaining > 0) {
        g.playerSalveTimer -= dtMs
        if (g.playerSalveTimer <= 0) {
          for (const wIdx of g.player.weapons) {
            const w = weapons[wIdx] || weapons[0]
            emitPlayerBullets(g, w, g.playerSalveFiredCount)
          }
          g.playerSalveFiredCount++
          g.playerSalveRemaining--
          if (g.playerSalveRemaining > 0) {
            // Time between each burst in the salve
            const w0 = weapons[g.player.weapons[0]] || weapons[0]
            g.playerSalveTimer = w0.salveDuration / w0.bulletsPerSalve
          }
        }
        return
      }

      // --- Cooldown between salves --------------------------------
      g.weaponCooldownTimer -= dtMs
      if (g.weaponCooldownTimer > 0) return
      if (!g.mouseDown) return

      // --- Start a new salve --------------------------------------
      for (const wIdx of g.player.weapons) {
        const w = weapons[wIdx] || weapons[0]
        // Set cooldown = cooldownTime (starts after salve finishes)
        g.weaponCooldownTimer = w.cooldownTime + w.salveDuration

        // Fire the first burst immediately
        emitPlayerBullets(g, w, 0)

        // Schedule remaining bursts if salve > 1
        if (w.bulletsPerSalve > 1) {
          g.playerSalveRemaining = w.bulletsPerSalve - 1
          g.playerSalveFiredCount = 1
          g.playerSalveTimer = w.salveDuration / w.bulletsPerSalve
        }
      }
    }

    // -- Fire enemy weapons -----------------------------------
    function fireEnemyWeapons(g, dt) {
      for (const e of g.enemies) {
        if (e.weapon == null) continue
        const w = weapons[e.weapon]
        if (!w) continue
        // Only fire when on screen
        if (e.y < 0 || e.y > height) continue

        // Salve in progress
        if (e.salveCount > 0) {
          e.salveTimer -= dt * 1000
          if (e.salveTimer <= 0) {
            const salveIdx = w.bulletsPerSalve - e.salveCount
            const extraRot = salveIdx * w.salveRotationStep
            for (const rot of w.bulletShootRotation) {
              const rad = (rot + extraRot) * DEG2RAD
              g.enemyBullets.push({
                x: e.x,
                y: e.y + e.height / 2,
                vx: Math.sin(rad) * 300,
                vy: Math.cos(rad) * 300,
                radius: w.bulletsSize,
                damage: w.damage,
                bulletGif: w.bulletGif,
              })
            }
            e.salveCount--
            if (e.salveCount > 0) {
              e.salveTimer = w.salveDuration / w.bulletsPerSalve
            }
          }
          continue
        }

        // Cooldown
        e.weaponCooldown -= dt * 1000
        if (e.weaponCooldown > 0) continue

        // Start firing (first bullet of salve)
        e.weaponCooldown = w.cooldownTime + w.salveDuration
        const firstSalveIdx = 0
        const firstExtraRot = firstSalveIdx * w.salveRotationStep
        for (const rot of w.bulletShootRotation) {
          const rad = (rot + firstExtraRot) * DEG2RAD
          g.enemyBullets.push({
            x: e.x,
            y: e.y + e.height / 2,
            vx: Math.sin(rad) * 300,
            vy: Math.cos(rad) * 300,
            radius: w.bulletsSize,
            damage: w.damage,
            bulletGif: w.bulletGif,
          })
        }
        if (w.bulletsPerSalve > 1) {
          e.salveCount = w.bulletsPerSalve - 1
          e.salveTimer = w.salveDuration / w.bulletsPerSalve
        }
      }
    }

    // -- Move enemies -----------------------------------------
    //  Enemies stay in the play zone: top of screen → 60% height.
    //  They enter from the top then move according to their pattern.
    const ENEMY_ZONE_MAX = () => height * 0.6

    function moveEnemies(g, dt) {
      for (const e of g.enemies) {
        const elapsed = g.levelTime - (e.spawnTime || 0)
        const zoneMax = ENEMY_ZONE_MAX()

        // --- Entry phase: slide down until reaching target Y ----
        if (e.targetY == null) {
          // Assign a random resting Y inside the zone
          e.targetY = randBetween(e.height, zoneMax - e.height)
        }

        if (e.y < e.targetY) {
          // Entering: move straight down
          e.y += e.movementSpeed * 1.5 * dt
          if (e.y > e.targetY) e.y = e.targetY
          e.x = clamp(e.x, e.width / 2, width - e.width / 2)
          continue
        }

        // --- In-zone movement according to pattern --------------
        switch (e.movementPattern) {
          case 'zigzag':
            e.x += Math.sin(elapsed * 3) * 150 * dt
            e.y += Math.cos(elapsed * 2) * 30 * dt
            break
          case 'sine':
            e.x += Math.cos(elapsed * 1.5) * 100 * dt
            e.y += Math.sin(elapsed * 0.8) * 40 * dt
            break
          default: // straight — gentle horizontal drift
            e.x += Math.sin(elapsed * 0.5 + e.targetY) * 60 * dt
            break
        }

        // Clamp inside play zone
        e.x = clamp(e.x, e.width / 2, width - e.width / 2)
        e.y = clamp(e.y, e.height / 2, zoneMax)
      }
    }

    // -- Collisions -------------------------------------------
    function handleCollisions(g) {
      const p = g.player
      const pR = p.width / 2.5

      // Bullets vs enemies
      const remainingEnemies = []
      for (const enemy of g.enemies) {
        let destroyed = false
        const eR = enemy.width / 2
        g.bullets = g.bullets.filter((b) => {
          if (destroyed) return true
          const dist = Math.hypot(enemy.x - b.x, enemy.y - b.y)
          if (dist < eR + b.radius) {
            const dead = enemy.takeDamage(b.damage)
            if (dead) {
              destroyed = true
              g.score += enemy.isBoss ? 50 : 10
              if (enemy.isBoss && g.bossRef === enemy) g.bossRef = null
            }
            return false
          }
          return true
        })
        if (!destroyed) remainingEnemies.push(enemy)
      }
      g.enemies = remainingEnemies

      // Enemies vs player
      for (const enemy of g.enemies) {
        const dist = Math.hypot(enemy.x - p.x, enemy.y - p.y)
        if (dist < (enemy.width / 2) + pR) {
          if (!p.isImmune) {
            p.takeDamage(enemy.contactDamage)
            p.isImmune = true
            setTimeout(() => { p.isImmune = false }, p.immunityTime)
          }
        }
      }

      // Player vs items
      g.activeItems = g.activeItems.filter((it) => {
        const dist = Math.hypot(it.x - p.x, it.y - p.y)
        if (dist < it.w + pR) {
          it.def.applyTo(p, weapons)
          // Cap healthPoints to maxHealth
          if (p.healthPoints > p.maxHealth) p.healthPoints = p.maxHealth
          // Cap shield to maxShield
          if (p.shieldForce > p.maxShield) p.shieldForce = p.maxShield
          g.itemPickedUp = it.def.name
          g.itemPickedUpTimer = 2
          return false
        }
        return true
      })

      // Player vs obstacles
      for (const obs of g.activeObstacles) {
        const dist = Math.hypot(obs.x - p.x, obs.y - p.y)
        if (dist < (obs.def.width / 2) + pR && obs.def.damage > 0) {
          if (!p.isImmune) {
            p.takeDamage(obs.def.damage)
            p.isImmune = true
            setTimeout(() => { p.isImmune = false }, p.immunityTime)
          }
        }
      }

      // Bullets vs breakable obstacles
      g.activeObstacles = g.activeObstacles.filter((obs) => {
        if (obs.hp <= 0 && obs.def.isBreakable) return false
        if (!obs.def.isBreakable) return true
        const oR = obs.def.width / 2
        g.bullets = g.bullets.filter((b) => {
          const dist = Math.hypot(obs.x - b.x, obs.y - b.y)
          if (dist < oR + b.radius) {
            obs.hp -= b.damage
            return false
          }
          return true
        })
        return obs.hp > 0
      })

      // Enemy bullets vs player
      for (const eb of g.enemyBullets) {
        const dist = Math.hypot(eb.x - p.x, eb.y - p.y)
        if (dist < eb.radius + pR) {
          if (!p.isImmune) {
            p.takeDamage(eb.damage)
            p.isImmune = true
            setTimeout(() => { p.isImmune = false }, p.immunityTime)
          }
          eb.hit = true
        }
      }
      g.enemyBullets = g.enemyBullets.filter((eb) => !eb.hit)
    }

    // -- Check level completion -------------------------------
    function checkLevelEnd(g) {
      const level = g.world.getLevel(g.currentLevelIndex)
      if (!level) return

      const allSpawned = g.spawnedEnemyIds.size >= level.enemies.length
      const allDead = g.enemies.length === 0

      if (allSpawned && allDead) {
        // For bonus levels : wait until items/obstacles done too
        if (level.type === 'bonus') {
          if (g.itemsSpawnedThisLevel < level.amountOfItems) return
          if (g.activeItems.length > 0) return
        }
        // Transition
        g.phase = STATE.LEVEL_TRANSITION
        g.transitionTimer = 3

        const nextLevel = g.world.getLevel(g.currentLevelIndex + 1)
        if (nextLevel) {
          g.transitionText = `Niveau ${nextLevel.levelNo}${nextLevel.isBoss ? ' � BOSS' : nextLevel.isBonus ? ' � BONUS' : ''}`
        } else {
          g.transitionText = 'Niveau final termine !'
        }
      }
    }

    // -- UPDATE -----------------------------------------------
    function update(dtMs) {
      const dt = dtMs / 1000
      const g = G

      // Animate stars always
      for (const s of g.stars) {
        s.y += s.speed * dt
        if (s.y > height) { s.y = -2; s.x = Math.random() * width }
      }

      if (g.phase === STATE.START || g.phase === STATE.GAME_OVER || g.phase === STATE.VICTORY) return

      // Player movement (always active during play & transition)
      const p = g.player
      // X axis — lateral (maxSideSpeed)
      const dx = g.mouseX - p.x
      const targetX = p.x + clamp(dx, -p.maxSideSpeed * dt * 3, p.maxSideSpeed * dt * 3)
      p.x = clamp(targetX, p.width / 2, width - p.width / 2)
      // Y axis — forward = up (maxSpeed), backward = down (maxBrakeSpeed)
      const dy = g.mouseY - p.y
      const maxUp = p.maxSpeed * dt * 3     // going up = forward
      const maxDown = p.maxBrakeSpeed * dt * 3  // going down = brake
      const targetY = p.y + clamp(dy, -maxUp, maxDown)
      p.y = clamp(targetY, height * 0.4, height - p.height / 2)

      // -- Track player speed for acceleration bar --------
      const moveDx = p.x - g.playerPrevX
      const moveDy = p.y - g.playerPrevY
      const actualSpeed = Math.sqrt(moveDx * moveDx + moveDy * moveDy) / dt
      g.playerPrevX = p.x
      g.playerPrevY = p.y
      // Smooth to avoid jitter
      g.playerSpeedPct = g.playerSpeedPct * 0.75 + clamp(actualSpeed / p.maxSpeed, 0, 1) * 0.25

      // LEVEL TRANSITION
      if (g.phase === STATE.LEVEL_TRANSITION) {
        g.transitionTimer -= dt
        if (g.transitionTimer <= 0) {
          g.currentLevelIndex++
          if (g.currentLevelIndex >= g.world.levelCount) {
            g.phase = STATE.VICTORY
          } else {
            startLevel(g)
          }
        }
        return
      }

      // PLAYING
      const level = g.world.getLevel(g.currentLevelIndex)
      if (!level) return
      g.levelTime += dt

      // Fire
      fireWeapon(g, dt)

      // Move bullets
      g.bullets = g.bullets
        .map((b) => ({ ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt }))
        .filter((b) => b.y > -20 && b.y < height + 20 && b.x > -20 && b.x < width + 20)

      // Spawn & move enemies
      spawnEnemies(g, level)
      moveEnemies(g, dt)

      // Fire enemy weapons
      fireEnemyWeapons(g, dt)

      // Enemies stay in zone — no off-screen removal needed

      // Spawn & move items
      spawnItems(g, level, dt)
      g.activeItems = g.activeItems
        .map((it) => ({ ...it, y: it.y + it.speed * dt }))
        .filter((it) => it.y < height + 30)

      // Move enemy bullets
      g.enemyBullets = g.enemyBullets
        .map((b) => ({ ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt }))
        .filter((b) => b.y > -20 && b.y < height + 40 && b.x > -20 && b.x < width + 20)

      // Spawn & move obstacles
      spawnObstacles(g, level, dt)
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
      if (!p.isAlive) {
        g.phase = STATE.GAME_OVER
        return
      }

      // Level done?
      checkLevelEnd(g)
    }

    // -- RENDER -----------------------------------------------
    function render() {
      const g = G

      // Background
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#0a0e1a')
      grad.addColorStop(1, '#050710')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Stars
      for (const s of g.stars) {
        ctx.globalAlpha = s.alpha
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
      for (let y = 0; y <= height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }

      // -- START SCREEN -------------------------------------
      if (g.phase === STATE.START) {
        drawStartScreen(ctx)
        return
      }

      // -- OBSTACLES ----------------------------------------
      for (const obs of g.activeObstacles) {
        const isPass = obs.def.isPassThrough
        ctx.fillStyle = isPass ? 'rgba(100,100,120,0.5)' : '#8a7250'
        ctx.strokeStyle = isPass ? 'rgba(150,150,170,0.4)' : '#bfa46e'
        ctx.lineWidth = 2
        const r = obs.def.width / 2
        ctx.beginPath()
        ctx.arc(obs.x, obs.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      // -- ITEMS --------------------------------------------
      for (const it of g.activeItems) {
        const s = it.w / 2
        ctx.save()
        ctx.translate(it.x, it.y)

        // Rarity halo (background glow)
        const haloColor = rarityColor(it.def.rarity)
        ctx.shadowColor = haloColor
        ctx.shadowBlur = 18
        ctx.fillStyle = haloColor
        ctx.globalAlpha = 0.35
        ctx.beginPath()
        ctx.arc(0, 0, s + 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0

        // Item PNG (foreground)
        const img = loadImg(it.def.png)
        if (img && img.complete && img.naturalWidth) {
          ctx.drawImage(img, -s, -s, s * 2, s * 2)
        } else {
          // Fallback diamond
          ctx.fillStyle = haloColor
          ctx.rotate(Math.PI / 4)
          ctx.fillRect(-s * 0.6, -s * 0.6, s * 1.2, s * 1.2)
        }

        ctx.restore()
      }

      // -- ENEMIES ------------------------------------------
      for (const e of g.enemies) {
        drawEnemy(ctx, e)
      }

      // -- PLAYER BULLETS ------------------------------------
      for (const b of g.bullets) {
        const gp = b.bulletGif ? getGifPlayer(b.bulletGif) : null
        const frame = gp ? gp.getFrame() : null
        if (frame) {
          const size = b.radius * 4
          ctx.save()
          ctx.translate(b.x, b.y)
          const angle = Math.atan2(b.vy, b.vx) + Math.PI / 2
          ctx.rotate(angle)
          ctx.drawImage(frame, -size / 2, -size / 2, size, size)
          ctx.restore()
        } else {
          ctx.fillStyle = '#ffe995'
          ctx.shadowColor = '#ffe995'
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // -- ENEMY BULLETS ----------------------------------------
      for (const b of g.enemyBullets) {
        const gp = b.bulletGif ? getGifPlayer(b.bulletGif) : null
        const frame = gp ? gp.getFrame() : null
        if (frame) {
          const size = b.radius * 4
          ctx.save()
          ctx.translate(b.x, b.y)
          const angle = Math.atan2(b.vy, b.vx) + Math.PI / 2
          ctx.rotate(angle)
          ctx.drawImage(frame, -size / 2, -size / 2, size, size)
          ctx.restore()
        } else {
          ctx.fillStyle = '#ff6060'
          ctx.shadowColor = '#ff3030'
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // -- PLAYER -------------------------------------------
      drawPlayer(ctx, g.player)

      // -- GUI BARS (bottom-left) ----------------------------
      if (g.phase === STATE.PLAYING || g.phase === STATE.LEVEL_TRANSITION) {
        const hBarW = 120          // horizontal bar width (red / blue / hp)
        const hBarH = 16           // horizontal bar height
        const accelW = 14          // vertical accel bar width
        const margin = 10
        const barGap = 5
        const hBarX = margin + accelW + barGap

        // Stack from bottom: red, blue, HP bar
        const redY   = height - margin - hBarH
        const blueY  = redY - hBarH - barGap
        const hpBarY = blueY - hBarH - barGap

        const accelH = (height - margin) - hpBarY  // spans all 3 bars
        const accelX = margin
        const accelY = hpBarY

        // ── Acceleration bar (vertical, left) ─────────────
        const logPct = g.playerSpeedPct > 0
          ? clamp(Math.log(1 + g.playerSpeedPct * 9) / Math.log(10), 0, 1)
          : 0
        const accelIdx = Math.round(logPct * 5)
        const accelImg = ACCEL_BARS[accelIdx]
        if (accelImg && accelImg.complete && accelImg.naturalWidth > 0) {
          ctx.drawImage(accelImg, accelX, accelY, accelW, accelH)
        }

        // ── HP bar (green, with fill) ──────────────────────
        const hpPct = g.player.healthPercent
        // Background
        ctx.fillStyle = 'rgba(0,0,0,0.45)'
        ctx.beginPath()
        ctx.roundRect(hBarX, hpBarY, hBarW, hBarH, 4)
        ctx.fill()
        // Fill
        const hpColor = hpPct > 0.5 ? '#44bb66' : hpPct > 0.25 ? '#ddaa22' : '#dd3333'
        ctx.fillStyle = hpColor
        ctx.beginPath()
        ctx.roundRect(hBarX, hpBarY, hBarW * hpPct, hBarH, 4)
        ctx.fill()
        // Border
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(hBarX, hpBarY, hBarW, hBarH, 4)
        ctx.stroke()
        // Text
        ctx.fillStyle = '#fff'
        ctx.font = '700 10px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(
          g.player.healthPoints + ' / ' + g.player.maxHealth,
          hBarX + hBarW / 2,
          hpBarY + hBarH / 2 + 3.5
        )

        // ── Red bar (visual) ───────────────────────────────
        const redImg = RED_BARS[4]
        if (redImg && redImg.complete && redImg.naturalWidth > 0) {
          ctx.drawImage(redImg, hBarX, redY, hBarW, hBarH)
        }

        // ── Blue bar (shield — consumable, 0-4) ───────────
        const shieldIdx = clamp(g.player.shieldForce, 0, 4)
        const blueImg = BLUE_BARS[shieldIdx]
        if (blueImg && blueImg.complete && blueImg.naturalWidth > 0) {
          ctx.drawImage(blueImg, hBarX, blueY, hBarW, hBarH)
        }
      }

      // -- BOSS HP BAR --------------------------------------
      if (g.bossRef && g.bossRef.isAlive) {
        drawBossBar(ctx, g.bossRef)
      }

      // -- ITEM PICKUP --------------------------------------
      if (g.itemPickedUp) {
        ctx.globalAlpha = Math.min(1, g.itemPickedUpTimer)
        ctx.fillStyle = '#7fffaa'
        ctx.font = '600 16px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('+ ' + g.itemPickedUp, width / 2, height - 80)
        ctx.globalAlpha = 1
      }

      // -- LEVEL TRANSITION ---------------------------------
      if (g.phase === STATE.LEVEL_TRANSITION) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#ffffff'
        ctx.font = '700 34px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Niveau termine !', width / 2, height / 2 - 30)
        ctx.font = '500 20px system-ui, sans-serif'
        ctx.fillStyle = '#b0c4ff'
        ctx.fillText(g.transitionText, width / 2, height / 2 + 10)
        ctx.font = '400 15px system-ui, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        const secs = Math.ceil(g.transitionTimer)
        ctx.fillText('Suite dans ' + secs + 's...', width / 2, height / 2 + 45)
      }

      // -- GAME OVER ----------------------------------------
      if (g.phase === STATE.GAME_OVER) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#ff4444'
        ctx.font = '700 44px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', width / 2, height / 2 - 20)
        ctx.fillStyle = '#ffffff'
        ctx.font = '500 20px system-ui, sans-serif'
        ctx.fillText('Score : ' + g.score, width / 2, height / 2 + 20)
        ctx.font = '400 16px system-ui, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.fillText('Clique pour recommencer', width / 2, height / 2 + 55)
      }

      // -- VICTORY ------------------------------------------
      if (g.phase === STATE.VICTORY) {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#ffcc00'
        ctx.font = '700 44px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('VICTOIRE !', width / 2, height / 2 - 30)
        ctx.fillStyle = '#ffffff'
        ctx.font = '500 22px system-ui, sans-serif'
        ctx.fillText(g.world.name, width / 2, height / 2 + 10)
        ctx.font = '500 20px system-ui, sans-serif'
        ctx.fillText('Score final : ' + g.score, width / 2, height / 2 + 45)
        ctx.font = '400 15px system-ui, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.fillText('Clique pour recommencer', width / 2, height / 2 + 80)
      }
    }

    // -- Drawing helpers --------------------------------------
    function drawStartScreen(c) {
      c.fillStyle = '#ffffff'
      c.font = '700 42px system-ui, sans-serif'
      c.textAlign = 'center'
      c.fillText(G.world.name, width / 2, height / 2 - 60)

      c.font = '400 18px system-ui, sans-serif'
      c.fillStyle = '#b0c4ff'
      c.fillText(G.world.levelCount + ' niveaux', width / 2, height / 2 - 25)

      c.font = '600 22px system-ui, sans-serif'
      c.fillStyle = '#ffffff'
      c.fillText('Clique pour commencer', width / 2, height / 2 + 30)

      c.font = '400 14px system-ui, sans-serif'
      c.fillStyle = 'rgba(255,255,255,0.5)'
      c.fillText('Deplace la souris pour bouger, maintiens clic pour tirer', width / 2, height / 2 + 65)
    }

    function drawPlayer(c, p) {
      if (p.isImmune && Math.floor(Date.now() / 80) % 2 === 0) return // blink

      c.save()
      c.translate(p.x, p.y)

      // Body
      c.fillStyle = '#7db5ff'
      c.beginPath()
      c.moveTo(0, -24)
      c.lineTo(-16, 10)
      c.lineTo(-8, 14)
      c.lineTo(0, 6)
      c.lineTo(8, 14)
      c.lineTo(16, 10)
      c.closePath()
      c.fill()

      // Cockpit
      c.fillStyle = '#dce9ff'
      c.beginPath()
      c.arc(0, -4, 5, 0, Math.PI * 2)
      c.fill()

      // Glow
      c.shadowColor = '#7db5ff'
      c.shadowBlur = 12
      c.fillStyle = '#4a90d0'
      c.fillRect(-5, 12, 10, 4)
      c.shadowBlur = 0

      // Shield indicator
      if (p.shieldForce > 0) {
        c.strokeStyle = 'rgba(100,200,255,0.35)'
        c.lineWidth = 2
        c.beginPath()
        c.arc(0, 0, 28, 0, Math.PI * 2)
        c.stroke()
      }

      c.restore()
    }

    function drawEnemy(c, e) {
      c.save()
      c.translate(e.x, e.y)
      const r = e.width / 2

      if (e.isBoss) {
        // Boss
        c.fillStyle = '#cc3333'
        c.beginPath()
        c.moveTo(0, -r)
        c.lineTo(-r, r * 0.6)
        c.lineTo(-r * 0.5, r)
        c.lineTo(r * 0.5, r)
        c.lineTo(r, r * 0.6)
        c.closePath()
        c.fill()
        c.fillStyle = '#ff8888'
        c.beginPath()
        c.arc(0, 0, r * 0.3, 0, Math.PI * 2)
        c.fill()
      } else {
        // Regular enemy
        const colors = { 0: '#ff6a6a', 1: '#ffa040', 2: '#8866cc' }
        // color by approximate life
        const color = e.life <= 2 ? colors[0] : e.life <= 5 ? colors[1] : colors[2]
        c.fillStyle = color
        c.beginPath()
        c.arc(0, 0, r, 0, Math.PI * 2)
        c.fill()

        // Eyes
        c.fillStyle = '#fff'
        c.beginPath()
        c.arc(-r * 0.35, -r * 0.15, r * 0.18, 0, Math.PI * 2)
        c.arc(r * 0.35, -r * 0.15, r * 0.18, 0, Math.PI * 2)
        c.fill()
      }

      // HP bar (small)
      if (e.type && !e.isBoss) {
        const barW = e.width
        const pct = e.life / e.type.life
        c.fillStyle = 'rgba(0,0,0,0.5)'
        c.fillRect(-barW / 2, -r - 10, barW, 4)
        c.fillStyle = pct > 0.5 ? '#6f6' : pct > 0.25 ? '#fa0' : '#f33'
        c.fillRect(-barW / 2, -r - 10, barW * pct, 4)
      }

      c.restore()
    }

    function drawBossBar(c, boss) {
      const barW = width * 0.5
      const barH = 12
      const barX = (width - barW) / 2
      const barY = 12
      const pct = boss.life / boss.type.life

      c.fillStyle = 'rgba(0,0,0,0.6)'
      c.fillRect(barX - 2, barY - 2, barW + 4, barH + 4)
      c.fillStyle = '#cc2222'
      c.fillRect(barX, barY, barW * pct, barH)
      c.strokeStyle = '#ff6666'
      c.lineWidth = 1
      c.strokeRect(barX, barY, barW, barH)

      c.fillStyle = '#fff'
      c.font = '600 11px system-ui, sans-serif'
      c.textAlign = 'center'
      c.fillText('BOSS', width / 2, barY + barH + 14)
    }

    function rarityColor(rarity) {
      switch (rarity) {
        case 'legendary': return '#ffaa00'
        case 'epic': return '#cc44ff'
        case 'rare': return '#4488ff'
        default: return '#44cc66'
      }
    }

    // -- Sync UI state ----------------------------------------
    function syncUI() {
      const g = G
      const p = g.player
      setUiState({
        phase: g.phase,
        score: g.score,
        hp: p.healthPoints,
        maxHp: p.maxHealth,
        shield: p.shieldForce,
        levelNo: (g.world.getLevel(g.currentLevelIndex)?.levelNo) ?? '-',
        levelType: (g.world.getLevel(g.currentLevelIndex)?.type) ?? '',
        worldName: g.world.name,
        transitionText: g.transitionText,
        itemPickedUp: g.itemPickedUp,
        bossHp: g.bossRef?.life ?? 0,
        bossMaxHp: g.bossRef?.type?.life ?? 0,
      })
    }

    // -- Game loop --------------------------------------------
    function loop(ts) {
      if (!lastTime) lastTime = ts
      const dtMs = Math.min(ts - lastTime, 50) // cap at 50ms
      lastTime = ts

      update(dtMs)
      render()
      syncUI()

      animId = requestAnimationFrame(loop)
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('click', onClick)
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)

    animId = requestAnimationFrame(loop)

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('click', onClick)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(animId)
    }
  }, [width, height, buildGameState])

  // -- Fullscreen ---------------------------------------------
  const handleContainerClick = () => {
    const c = containerRef.current
    if (!c || document.fullscreenElement === c) return
    c.requestFullscreen?.().catch(() => {})
  }

  // -- JSX ----------------------------------------------------
  const isPlaying = uiState.phase === STATE.PLAYING || uiState.phase === STATE.LEVEL_TRANSITION
  const levelLabel = uiState.levelType === 'boss' ? 'BOSS'
    : uiState.levelType === 'bonus' ? 'BONUS' : 'Niv. ' + uiState.levelNo

  return (
    <div
      className="shooter-container"
      ref={containerRef}
      onClick={handleContainerClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleContainerClick() }}
      aria-label="Cliquer pour passer en plein ecran"
    >
      {/* -- HUD ---------------------------------------- */}
      <div className="hud">
        <div className="hud-left">
          <span className="hud-level">{levelLabel}</span>
          <span className="hud-score">Score: {uiState.score}</span>
        </div>
        <div className="hud-center">
        </div>
        <div className="hud-right">
          {uiState.shield > 0 && (
            <span className="hud-shield">Bouclier: {uiState.shield}</span>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} width={width} height={height} className="shooter-canvas" />

      <div className="fullscreen-hint">Clique dans le jeu pour le plein ecran</div>
    </div>
  )
}

export default ShooterGame
