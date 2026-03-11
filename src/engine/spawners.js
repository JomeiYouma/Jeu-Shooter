import Enemy from '../classes/Enemy.js'
import { enemyTypes, items, obstacles } from '../data/index.js'
import { randBetween, pick } from './constants.js'
import { pickItemByRarity } from './itemPicker.js'

// -- Spawn enemies from level data ------------------------------
export function spawnEnemies(g, level, bounds) {
  const { width } = bounds
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

// -- Spawn items falling ----------------------------------------
export function spawnItems(g, level, dt, bounds) {
  const { width } = bounds
  if (g.itemsSpawnedThisLevel >= level.amountOfItems) return
  g.itemSpawnTimer += dt
  const interval = 8 / Math.max(1, level.amountOfItems)
  if (g.itemSpawnTimer >= interval) {
    g.itemSpawnTimer = 0
    g.itemsSpawnedThisLevel++
    const itemDef = pickItemByRarity(items, g.player.talismanCount)
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

// -- Spawn one obstacle -----------------------------------------
function spawnOneObstacle(g, width) {
  const obsDef = pick(obstacles)
  
  // Choose random png variant
  const variant = obsDef.pngVariants[Math.floor(Math.random() * obsDef.pngVariants.length)]

  // Fixed base speed that scales by +15% per level
  const baseSpeed = 100
  const speedMult = Math.pow(1.15, g.currentLevelIndex || 0)

  g.activeObstacles.push({
    def: obsDef,
    png: variant, // The instance keeps this variant
    x: randBetween(30, width - 30),
    y: -obsDef.height,
    speed: baseSpeed * speedMult,
    hp: obsDef.isBreakable ? 3 : -1,
  })
}

// -- Spawn obstacles falling (initial quota) + respawn ----------
export function spawnObstacles(g, level, dt, bounds) {
  const { width, height } = bounds

  // Initial quota spawn
  if (g.obstaclesSpawnedThisLevel < level.amountOfObstacles) {
    g.obstacleSpawnTimer += dt
    const interval = 6 / Math.max(1, level.amountOfObstacles)
    if (g.obstacleSpawnTimer >= interval) {
      g.obstacleSpawnTimer = 0
      g.obstaclesSpawnedThisLevel++
      spawnOneObstacle(g, width)
    }
  }

  // Respawn queue : obstacles détruits ou sortis de l'écran
  if (!g.obstacleRespawnQueue) g.obstacleRespawnQueue = []

  g.obstacleRespawnQueue = g.obstacleRespawnQueue
    .map(entry => ({ ...entry, timer: entry.timer - dt }))
    .filter(entry => {
      if (entry.timer <= 0) {
        spawnOneObstacle(g, width)
        return false  // retirer de la queue
      }
      return true
    })
}

/**
 * Appelée depuis gameState.js quand un obstacle est détruit ou sort de l'écran.
 * Enfile un respawn dans 2 secondes.
 */
export function queueObstacleRespawn(g) {
  if (!g.obstacleRespawnQueue) g.obstacleRespawnQueue = []
  g.obstacleRespawnQueue.push({ timer: 2 })
}
