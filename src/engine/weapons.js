import { DEG2RAD } from './constants.js'
import { weapons } from '../data/index.js'

// -- Save initial weapon stats so we can reset after victory ----
const _weaponDefaults = weapons.map(w => ({
  damage: w.damage,
  bulletsSize: w.bulletsSize,
  bulletsPerSalve: w.bulletsPerSalve,
  salveDuration: w.salveDuration,
  cooldownTime: w.cooldownTime,
  salveRotationStep: w.salveRotationStep,
  bulletShootRotation: [...w.bulletShootRotation],
  headed: w.headed,
  bounce: w.bounce,
}))

/** Reset ALL weapons to their default stats. */
export function resetWeapons() {
  weapons.forEach((w, i) => Object.assign(w, _weaponDefaults[i]))
}

/** Reset a single weapon (by index) to its default stats. */
export function resetWeapon(index) {
  if (_weaponDefaults[index]) {
    Object.assign(weapons[index], _weaponDefaults[index])
  }
}

// -- Per-weapon firing state ------------------------------------
function getWeaponState(g, wIdx) {
  if (!g.weaponStates.has(wIdx)) {
    g.weaponStates.set(wIdx, {
      cooldownTimer: 0,
      salveRemaining: 0,
      salveTimer: 0,
      salveFiredCount: 0,
    })
  }
  return g.weaponStates.get(wIdx)
}

// -- Emit player bullets for one burst --------------------------
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
      headed: w.headed || false,
      bounceRemaining: w.bounce || 0,
      _headTarget: null,
    })
  }
}

// -- Fire player weapons (independent cadence per weapon) -------
export function fireWeapon(g, dt) {
  const dtMs = dt * 1000

  for (const wIdx of g.player.weapons) {
    const w = weapons[wIdx] || weapons[0]
    const ws = getWeaponState(g, wIdx)

    // --- Salve in progress: emit remaining bursts ---------------
    if (ws.salveRemaining > 0) {
      ws.salveTimer -= dtMs
      if (ws.salveTimer <= 0) {
        emitPlayerBullets(g, w, ws.salveFiredCount)
        ws.salveFiredCount++
        ws.salveRemaining--
        if (ws.salveRemaining > 0) {
          ws.salveTimer = w.salveDuration / w.bulletsPerSalve
        }
      }
      continue
    }

    // --- Cooldown between salves --------------------------------
    ws.cooldownTimer -= dtMs
    if (ws.cooldownTimer > 0) continue
    if (!g.mouseDown) continue

    // --- Start a new salve --------------------------------------
    ws.cooldownTimer = w.cooldownTime + w.salveDuration

    // Fire the first burst immediately
    emitPlayerBullets(g, w, 0)

    // Schedule remaining bursts if salve > 1
    if (w.bulletsPerSalve > 1) {
      ws.salveRemaining = w.bulletsPerSalve - 1
      ws.salveFiredCount = 1
      ws.salveTimer = w.salveDuration / w.bulletsPerSalve
    }
  }
}

// -- Fire enemy weapons -----------------------------------------
export function fireEnemyWeapons(g, dt, bounds) {
  const { height } = bounds
  for (const e of g.enemies) {
    if (e.weapon == null) continue
    const w = weapons[e.weapon]
    if (!w) continue
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

    // Start firing
    e.weaponCooldown = w.cooldownTime + w.salveDuration
    const firstExtraRot = 0
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
