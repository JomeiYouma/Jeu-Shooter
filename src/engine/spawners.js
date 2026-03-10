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

// -- Spawn obstacles falling ------------------------------------
export function spawnObstacles(g, level, dt, bounds) {
  const { width } = bounds
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
