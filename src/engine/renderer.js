import { clamp } from './constants.js'
import { loadImg, getGifPlayer, ACCEL_BARS, RED_BARS, BLUE_BARS, ROAD_TILE } from './assets.js'
import { weapons } from '../data/index.js'
import { STATE } from './constants.js'
import playerFarLeft from '../assets/player/player_far_left.png'
import playerLeft from '../assets/player/player_left.png'
import playerNormal from '../assets/player/player_normal.png'
import playerRight from '../assets/player/player_right.png'
import playerFarRight from '../assets/player/player_far_right.png'

// Preload player sprites
const PLAYER_SPRITES = [
  loadImg(playerFarLeft),
  loadImg(playerLeft),
  loadImg(playerNormal),
  loadImg(playerRight),
  loadImg(playerFarRight),
]

/** Returns the sprite image based on horizontal direction offset */
function getPlayerSprite(dirX) {
  if (dirX < -60) return PLAYER_SPRITES[0]  // far left
  if (dirX < -15) return PLAYER_SPRITES[1]  // left
  if (dirX >  60) return PLAYER_SPRITES[4]  // far right
  if (dirX >  15) return PLAYER_SPRITES[3]  // right
  return PLAYER_SPRITES[2]                  // center
}

// -- Rarity color -----------------------------------------------
function rarityColor(rarity) {
  switch (rarity) {
    case 'divine': return '#ffffff'
    case 'legendary': return '#ffaa00'
    case 'epic': return '#cc44ff'
    case 'rare': return '#4488ff'
    default: return '#44cc66'
  }
}

// -- Draw helpers ------------------------------------------------
function drawPlayer(c, p, dirX, turboActive = false) {
  if (p.isImmune && Math.floor(Date.now() / 80) % 2 === 0) return

  const sprite = getPlayerSprite(dirX)

  c.save()
  c.translate(p.x, p.y)

  if (turboActive) {
    c.shadowColor = '#ff3333'
    c.shadowBlur = 12  // Plus discret
  }

  if (sprite && sprite.complete && sprite.naturalWidth > 0) {
    // Redimensionne le sprite pour tenir dans la hitbox (ratio préservé), centré
    const maxW = p.width
    const maxH = p.height
    const ratio = Math.min(maxW / sprite.naturalWidth, maxH / sprite.naturalHeight)
    const dw = sprite.naturalWidth * ratio
    const dh = sprite.naturalHeight * ratio
    c.drawImage(sprite, -dw / 2, -dh / 2, dw, dh)
  } else {
    // Fallback géométrique si le sprite n'est pas encore chargé
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

    c.fillStyle = '#dce9ff'
    c.beginPath()
    c.arc(0, -4, 5, 0, Math.PI * 2)
    c.fill()

    c.shadowColor = '#7db5ff'
    c.shadowBlur = 12
    c.fillStyle = '#4a90d0'
    c.fillRect(-5, 12, 10, 4)
    c.shadowBlur = 0
  }

  if (p.shieldForce > 0) {
    c.strokeStyle = 'rgba(100,200,255,0.35)'
    c.lineWidth = 2
    c.beginPath()
    c.arc(0, 0, 28, 0, Math.PI * 2)
    c.stroke()
  }

  // Spikes visual effect
  if (p.contactDamage > 0) {
    const spikeCount = 10
    const innerR = 24
    const outerR = 34
    const rotation = Date.now() / 600
    c.fillStyle = 'rgba(255, 79, 40, 0)'
    c.strokeStyle = 'rgba(255, 120, 60, 0.55)'
    c.lineWidth = 1.5
    c.beginPath()
    for (let i = 0; i < spikeCount; i++) {
      const aOuter = (i / spikeCount) * Math.PI * 2 + rotation
      const aInner = ((i + 0.5) / spikeCount) * Math.PI * 2 + rotation
      if (i === 0) c.moveTo(Math.cos(aOuter) * outerR, Math.sin(aOuter) * outerR)
      else c.lineTo(Math.cos(aOuter) * outerR, Math.sin(aOuter) * outerR)
      c.lineTo(Math.cos(aInner) * innerR, Math.sin(aInner) * innerR)
    }
    c.closePath()
    c.fill()
    c.stroke()
  }

  c.restore()
}

function drawEnemy(c, e) {
  c.save()
  c.translate(e.x, e.y)
  const r = e.width / 2

  if (e.isBoss) {
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
    const colors = { 0: '#ff6a6a', 1: '#ffa040', 2: '#8866cc' }
    const color = e.life <= 2 ? colors[0] : e.life <= 5 ? colors[1] : colors[2]
    c.fillStyle = color
    c.beginPath()
    c.arc(0, 0, r, 0, Math.PI * 2)
    c.fill()

    c.fillStyle = '#fff'
    c.beginPath()
    c.arc(-r * 0.35, -r * 0.15, r * 0.18, 0, Math.PI * 2)
    c.arc(r * 0.35, -r * 0.15, r * 0.18, 0, Math.PI * 2)
    c.fill()
  }

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

function drawBossBar(c, boss, width) {
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

function drawStartScreen(c, g, bounds) {
  const { width, height } = bounds
  c.fillStyle = '#ffffff'
  c.font = '700 42px system-ui, sans-serif'
  c.textAlign = 'center'
  c.fillText(g.world.name, width / 2, height / 2 - 60)

  c.font = '400 18px system-ui, sans-serif'
  c.fillStyle = '#b0c4ff'
  c.fillText(g.world.levelCount + ' niveaux', width / 2, height / 2 - 25)

  c.font = '600 22px system-ui, sans-serif'
  c.fillStyle = '#ffffff'
  c.fillText('Clique pour commencer', width / 2, height / 2 + 30)
}

// -- Main render function ----------------------------------------
export function render(ctx, g, bounds) {
  const { width, height } = bounds

  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, height)
  grad.addColorStop(0, '#0a0e1a')
  grad.addColorStop(1, '#050710')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // Draw scrolling road
  if (g.phase !== STATE.START && ROAD_TILE && ROAD_TILE.complete && ROAD_TILE.naturalWidth > 0) {
    // Fill width and scale height
    const scale = width / ROAD_TILE.naturalWidth
    const scaledH = ROAD_TILE.naturalHeight * scale
    const offset = (g.roadOffsetY || 0) % scaledH

    ctx.drawImage(ROAD_TILE, 0, offset - scaledH, width, scaledH)
    ctx.drawImage(ROAD_TILE, 0, offset, width, scaledH)
    if (offset < height - scaledH) {
      ctx.drawImage(ROAD_TILE, 0, offset + scaledH, width, scaledH)
    }
  }

  // -- START SCREEN --
  if (g.phase === STATE.START) {
    drawStartScreen(ctx, g, bounds)
    return
  }

  // -- OBSTACLES --
  for (const obs of g.activeObstacles) {
    const isPass = obs.def.isPassThrough
    let imgPath = null

    // Determine which sprite state to show
    if (obs.png) {
      if (obs.def.isBreakable) {
        if (obs.hp >= 3) imgPath = obs.png.full
        else if (obs.hp === 2) imgPath = obs.png.damaged || obs.png.full
        else imgPath = obs.png.destroyed || obs.png.full
      } else {
        imgPath = obs.png.full
      }
    }

    const img = imgPath ? loadImg(imgPath) : null
    const r = obs.def.width / 2

    if (img && img.complete && img.naturalWidth) {
      // Affichage du sprite centré
      ctx.save()
      ctx.translate(obs.x, obs.y)
      
      const maxW = obs.def.width
      const maxH = obs.def.height
      const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight)
      const dw = img.naturalWidth * ratio * 2
      const dh = img.naturalHeight * ratio * 2
      
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
      ctx.restore()
    } else {
      // Fallback: ancien affichage géométrique (ronds)
      ctx.fillStyle = isPass ? 'rgba(100,100,120,0.5)' : '#8a7250'
      ctx.strokeStyle = isPass ? 'rgba(150,150,170,0.4)' : '#bfa46e'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(obs.x, obs.y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  // -- ITEMS --
  for (const it of g.activeItems) {
    const s = it.w / 2
    ctx.save()
    ctx.translate(it.x, it.y)

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

    const img = loadImg(it.def.png)
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(img, -s, -s, s * 2, s * 2)
    } else {
      ctx.fillStyle = haloColor
      ctx.rotate(Math.PI / 4)
      ctx.fillRect(-s * 0.6, -s * 0.6, s * 1.2, s * 1.2)
    }

    ctx.restore()
  }

  // -- ENEMIES --
  for (const e of g.enemies) {
    drawEnemy(ctx, e)
  }

  // -- PLAYER BULLETS --
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

  // -- ENEMY BULLETS --
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

  // -- GHOST TRAIL (afterimages de la moto) ----------------------
  if (g.trail && g.trail.length > 0) {
    let ptIndex = 0
    for (const pt of g.trail) {
      const alpha = (pt.timer / pt.maxTimer) * 0.45  // fade de 45% → 0%
      const sprite = getPlayerSprite(g.playerDirX || 0)
      ctx.save()
      ctx.globalAlpha = alpha
      // Une frame sur deux: vert clair vs rouge
      if (g.turboActive && ptIndex % 2 !== 0) {
        // Vert clair (shift depuis le bleu) au lieu de rouge
        ctx.filter = 'hue-rotate(-230deg) brightness(1.5)'
      } else {
        // Rouge par défaut (180deg)
        ctx.filter = 'hue-rotate(-190deg) brightness(1.5)'
      }
      if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        const p = g.player
        const maxW = p.width
        const maxH = p.height
        const ratio = Math.min(maxW / sprite.naturalWidth, maxH / sprite.naturalHeight)
        const dw = sprite.naturalWidth * ratio
        const dh = sprite.naturalHeight * ratio
        ctx.drawImage(sprite, pt.x - dw / 2, pt.y - dh / 2, dw, dh)
      } else {
        // Fallback : ellipse rouge
        ctx.fillStyle = '#ff2020'
        ctx.beginPath()
        ctx.ellipse(pt.x, pt.y, 10, 16, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
      ptIndex++
    }
  }

  // -- PLAYER --
  drawPlayer(ctx, g.player, g.playerDirX || 0, g.turboActive)

  // -- DEATH EFFECTS --
  for (const fx of g.deathEffects) {
    const gp = fx.gif ? getGifPlayer(fx.gif) : null
    const frame = gp ? gp.getFrame() : null
    if (frame) {
      const size = 80 // taille fixe de l'effet en px
      ctx.save()
      ctx.globalAlpha = Math.min(1, fx.timer)
      ctx.drawImage(frame, fx.x - size / 2, fx.y - size / 2, size, size)
      ctx.globalAlpha = 1
      ctx.restore()
    }
  }

  // -- GUI BARS --
  if (g.phase === STATE.PLAYING || g.phase === STATE.LEVEL_TRANSITION) {
    const hBarW = 120
    const hBarH = 16
    const accelW = 14
    const margin = 10
    const barGap = 5
    const hBarX = margin + accelW + barGap

    const redY   = height - margin - hBarH
    const blueY  = redY - hBarH - barGap
    const hpBarY = blueY - hBarH - barGap

    const accelH = (height - margin) - hpBarY
    const accelX = margin
    const accelY = hpBarY

    // Acceleration bar
    const accelIdx = Math.round(clamp(g.playerSpeedPct, 0, 1) * 5)
    const accelImg = ACCEL_BARS[accelIdx]
    if (accelImg && accelImg.complete && accelImg.naturalWidth > 0) {
      ctx.drawImage(accelImg, accelX, accelY, accelW, accelH)
    }

    // HP bar
    const hpPct = g.player.healthPercent
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.beginPath()
    ctx.roundRect(hBarX, hpBarY, hBarW, hBarH, 4)
    ctx.fill()
    const hpColor = hpPct > 0.5 ? '#44bb66' : hpPct > 0.25 ? '#ddaa22' : '#dd3333'
    ctx.fillStyle = hpColor
    ctx.beginPath()
    ctx.roundRect(hBarX, hpBarY, hBarW * hpPct, hBarH, 4)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(hBarX, hpBarY, hBarW, hBarH, 4)
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.font = '700 10px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(
      g.player.healthPoints + ' / ' + g.player.maxHealth,
      hBarX + hBarW / 2,
      hpBarY + hBarH / 2 + 3.5
    )

    // Red bar (Turbo) - Discrete Bars
    let redIdx = 0
    if (g.player.turboBars > 0 && g.player.turboBarDuration > 0) {
      // Nombre de barres entières disponibles
      const fullBars = Math.floor(g.turboTime / g.player.turboBarDuration)
      // On convertit le nombre de barres en index (0 à 4 pour nos images RED_BARS)
      // Si max bars = 3, on map 0->0, 1->1, 2->2, 3->3, 4->4 (au cas où max >= 4)
      redIdx = clamp(fullBars, 0, 4)
    }

    const redImg = RED_BARS[redIdx]
    if (redImg && redImg.complete && redImg.naturalWidth > 0) {
      if (g.turboActive) {
        ctx.shadowColor = '#ff2020'
        ctx.shadowBlur = 15
      }
      ctx.drawImage(redImg, hBarX, redY, hBarW, hBarH)
      ctx.shadowBlur = 0
    }

    // Blue bar (shield)
    const shieldIdx = clamp(g.player.shieldForce, 0, 4)
    const blueImg = BLUE_BARS[shieldIdx]
    if (blueImg && blueImg.complete && blueImg.naturalWidth > 0) {
      ctx.drawImage(blueImg, hBarX, blueY, hBarW, hBarH)
    }
  }

  // -- BOSS HP BAR --
  if (g.bossRef && g.bossRef.isAlive) {
    drawBossBar(ctx, g.bossRef, width)
  }

  // -- ITEM PICKUP --
  if (g.itemPickedUp) {
    ctx.globalAlpha = Math.min(1, g.itemPickedUpTimer)
    ctx.fillStyle = '#7fffaa'
    ctx.font = '600 16px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('+ ' + g.itemPickedUp, width / 2, height - 80)
    ctx.globalAlpha = 1
  }

  // -- LEVEL TRANSITION --
  if (g.phase === STATE.LEVEL_TRANSITION) {
    ctx.save()
    ctx.textAlign = 'center'

    // Semi-transparent banner at center
    const bannerH = 90
    const bannerY = height / 2 - bannerH / 2
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.fillRect(0, bannerY, width, bannerH)

    ctx.fillStyle = '#ffffff'
    ctx.font = '700 28px system-ui, sans-serif'
    ctx.fillText(g.transitionText, width / 2, bannerY + 35)

    ctx.font = '400 16px system-ui, sans-serif'
    ctx.fillStyle = 'rgba(180,200,255,0.8)'
    const secs = Math.ceil(g.transitionTimer)
    ctx.fillText('Suite dans ' + secs + 's...', width / 2, bannerY + 65)

    ctx.restore()
  }

  // -- GAME OVER --
  if (g.phase === STATE.GAME_OVER) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#ff4444'
    ctx.font = '700 44px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('GAME OVER', width / 2, height / 2 - 10)
    ctx.font = '400 16px system-ui, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.fillText('Clique pour recommencer', width / 2, height / 2 + 35)
  }

  // -- VICTORY --
  if (g.phase === STATE.VICTORY) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#ffcc00'
    ctx.font = '700 44px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('VICTOIRE !', width / 2, height / 2 - 20)
    ctx.fillStyle = '#ffffff'
    ctx.font = '500 22px system-ui, sans-serif'
    ctx.fillText(g.world.name, width / 2, height / 2 + 20)
    ctx.font = '400 15px system-ui, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.fillText('Clique pour recommencer', width / 2, height / 2 + 60)
  }
}
