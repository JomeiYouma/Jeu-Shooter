import { clamp, randBetween, accelCurve } from './constants.js'
import { weapons } from '../data/index.js'
import { resetWeapon } from './weapons.js'
import { getGifPlayer } from './assets.js'
import explosionEnemyGif from '../assets/fx/explosion_enemy.gif'
import explosionPlayerGif from '../assets/fx/explosion_player.gif'
import { KEYBOARD_MOVEMENT } from '../config.js'
import { queueObstacleRespawn } from './spawners.js'

export { explosionEnemyGif, explosionPlayerGif }

// -- Move enemies -----------------------------------------------
export function moveEnemies(g, dt, bounds) {
  const { width, height } = bounds
  const zoneMax = height * 0.6

  for (const e of g.enemies) {
    const elapsed = g.levelTime - (e.spawnTime || 0)

    if (e.targetY == null) {
      e.targetY = randBetween(e.height, zoneMax - e.height)
    }

    if (e.y < e.targetY) {
      e.y += e.movementSpeed * 1.5 * dt
      if (e.y > e.targetY) e.y = e.targetY
      e.x = clamp(e.x, e.width / 2, width - e.width / 2)
      continue
    }

    switch (e.movementPattern) {
      case 'zigzag':
        e.x += Math.sin(elapsed * 3) * 150 * dt
        e.y += Math.cos(elapsed * 2) * 30 * dt
        break
      case 'sine':
        e.x += Math.cos(elapsed * 1.5) * 100 * dt
        e.y += Math.sin(elapsed * 0.8) * 40 * dt
        break
      default:
        e.x += Math.sin(elapsed * 0.5 + e.targetY) * 60 * dt
        break
    }

    e.x = clamp(e.x, e.width / 2, width - e.width / 2)
    e.y = clamp(e.y, e.height / 2, zoneMax)
  }
}

// -- Player movement --------------------------------------------
export function movePlayer(g, dt, bounds) {
  const { width, height } = bounds
  const p = g.player
  let speedMult = 0

  if (KEYBOARD_MOVEMENT) {
    // -- Keyboard mode : ZQSD ou flèches --
    const keys = g.keys || {}
    const left  = keys['ArrowLeft']  || keys['q'] || keys['Q']
    const right = keys['ArrowRight'] || keys['d'] || keys['D']
    const up    = keys['ArrowUp']    || keys['z'] || keys['Z']
    const down  = keys['ArrowDown']  || keys['s'] || keys['S']
    const moving = left || right || up || down

    if (moving) {
      g.playerAccelTime = Math.min(3.0, g.playerAccelTime + dt * p.acceleration)
    } else {
      g.playerAccelTime = Math.max(0, g.playerAccelTime - dt * 3 * p.acceleration)
    }
    speedMult = accelCurve(g.playerAccelTime)

    if (left)  p.x -= p.maxSideSpeed * speedMult * dt
    if (right) p.x += p.maxSideSpeed * speedMult * dt
    if (up)    p.y -= p.maxSpeed     * speedMult * dt
    if (down)  p.y += p.maxBrakeSpeed * speedMult * dt

    p.x = clamp(p.x, p.width / 2, width - p.width / 2)
    p.y = clamp(p.y, height * 0.4, height - p.height / 2)

    // Espace = tirer
    g.mouseDown = !!(keys[' '] || keys['Space'])
    // Direction horizontale pour les sprites
    g.playerDirX = (right ? 1 : left ? -1 : 0) * 80
  } else {
    // -- Mouse mode (original) --
    const distToMouse = Math.hypot(g.mouseX - p.x, g.mouseY - p.y)
    if (distToMouse > 5) {
      g.playerAccelTime = Math.min(3.0, g.playerAccelTime + dt * p.acceleration)
    } else {
      g.playerAccelTime = Math.max(0, g.playerAccelTime - dt * 3 * p.acceleration)
    }
    speedMult = accelCurve(g.playerAccelTime)

    const dx = g.mouseX - p.x
    const targetX = p.x + clamp(dx, -p.maxSideSpeed * speedMult * dt * 3, p.maxSideSpeed * speedMult * dt * 3)
    p.x = clamp(targetX, p.width / 2, width - p.width / 2)

    const dy = g.mouseY - p.y
    const maxUp = p.maxSpeed * speedMult * dt * 3
    const maxDown = p.maxBrakeSpeed * speedMult * dt * 3
    const targetY = p.y + clamp(dy, -maxUp, maxDown)
    p.y = clamp(targetY, height * 0.4, height - p.height / 2)
  }

  g.playerPrevX = p.x
  g.playerPrevY = p.y
  g.playerSpeedPct = speedMult
}

// -- Collisions -------------------------------------------------
export function handleCollisions(g) {
  const p = g.player
  const pR = p.width / 2.5

  // Bullets vs enemies (with bounce support)
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
          g.deathEffects.push({ x: enemy.x, y: enemy.y, gif: explosionEnemyGif, timer: 0.6 })
          if (enemy.isBoss && g.bossRef === enemy) g.bossRef = null
        }
        // Bounce: redirect bullet to nearest OTHER alive enemy
        if (b.bounceRemaining > 0) {
          b.bounceRemaining--
          let closest = null
          for (const other of g.enemies) {
            if (other === enemy || !other.isAlive) continue
            closest = other; break // prend le premier autre ennemi vivant
          }
          if (closest) {
            const speed = Math.hypot(b.vx, b.vy)
            const angle = Math.atan2(closest.y - b.y, closest.x - b.x)
            b.vx = Math.cos(angle) * speed
            b.vy = Math.sin(angle) * speed
            b._headTarget = null // reset homing target for bounced headed bullets
            return true // keep the bullet
          }
        }
        return false
      }
      return true
    })
    if (!destroyed) remainingEnemies.push(enemy)
  }
  g.enemies = remainingEnemies

  // Enemies vs player
  g.enemies = g.enemies.filter((enemy) => {
    const dist = Math.hypot(enemy.x - p.x, enemy.y - p.y)
    if (dist < (enemy.width / 2) + pR) {
      if (!p.isImmune) {
        p.takeDamage(enemy.contactDamage)
        p.isImmune = true
        setTimeout(() => { p.isImmune = false }, p.immunityTime)
        if (p.contactDamage > 0) {
          const dead = enemy.takeDamage(p.contactDamage)
          if (dead) {
            g.deathEffects.push({ x: enemy.x, y: enemy.y, gif: explosionEnemyGif, timer: 0.6 })
            if (enemy.isBoss && g.bossRef === enemy) g.bossRef = null
            return false
          }
        }
      }
    }
    return true
  })

  // Player vs items
  g.activeItems = g.activeItems.filter((it) => {
    const dist = Math.hypot(it.x - p.x, it.y - p.y)
    if (dist < it.w + pR) {
      it.def.applyTo(p, weapons, resetWeapon)
      if (p.healthPoints > p.maxHealth) p.healthPoints = p.maxHealth
      if (p.shieldForce > p.maxShield) p.shieldForce = p.maxShield
      if (p.talismanCount > p.maxTalisman) p.talismanCount = p.maxTalisman
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
    if (obs.hp <= 0 && obs.def.isBreakable) { queueObstacleRespawn(g); return false }
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
    if (obs.hp <= 0) { queueObstacleRespawn(g); return false }
    return true
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
