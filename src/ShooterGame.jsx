import { useEffect, useRef, useState } from 'react'
import './ShooterGame.css'
import { STATE, clamp } from './engine/constants.js'
import { buildGameState, resetGame, startLevel, update } from './engine/gameState.js'
import { render } from './engine/renderer.js'
import { world1 } from './data/index.js'

// ---------------------------------------------------------------
//  ShooterGame component
// ---------------------------------------------------------------
function ShooterGame({ width = 900, height = 600 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [uiState, setUiState] = useState({
    phase: STATE.START,
    hp: 10,
    maxHp: 10,
    levelNo: 1,
    levelType: 'attack',
    worldName: world1.name,
  })

  const bounds = { width, height }

  // -- Main game loop in useEffect ------------------------------
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId = 0
    let lastTime = 0

    const G = buildGameState(width, height)
    G.paused = false
    G.keys = {}   // held keys map pour le mode clavier
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
        resetGame(G, width, height)
      }
    }

    // -- Pause + keyboard input handler ----------------------
    const onKeyDown = (e) => {
      if (e.key === 'p' || e.key === 'P') {
        G.paused = !G.paused
      }
      G.keys[e.key] = true
      if (e.key.toLowerCase) G.keys[e.key.toLowerCase()] = true
      if (e.key.toUpperCase) G.keys[e.key.toUpperCase()] = true
      if (e.code) G.keys[e.code] = true
    }
    const onKeyUp = (e) => {
      G.keys[e.key] = false
      if (e.key.toLowerCase) G.keys[e.key.toLowerCase()] = false
      if (e.key.toUpperCase) G.keys[e.key.toUpperCase()] = false
      if (e.code) G.keys[e.code] = false
    }

    // -- Sync UI state ----------------------------------------
    function syncUI() {
      const g = G
      const p = g.player
      setUiState({
        phase: g.phase,
        hp: p.healthPoints,
        maxHp: p.maxHealth,
        levelNo: (g.world.getLevel(g.currentLevelIndex)?.levelNo) ?? '-',
        levelType: (g.world.getLevel(g.currentLevelIndex)?.type) ?? '',
        worldName: g.world.name,
      })
    }

    // -- Game loop --------------------------------------------
    function loop(ts) {
      if (!lastTime) lastTime = ts
      const dtMs = Math.min(ts - lastTime, 50)
      lastTime = ts

      if (!G.paused) {
        update(G, dtMs, bounds)
      }
      render(ctx, G, bounds)
      if (G.paused) {
        ctx.save()
        ctx.globalAlpha = 0.7
        ctx.fillStyle = '#222'
        ctx.fillRect(0, 0, width, height)
        ctx.globalAlpha = 1
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 48px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('PAUSE', width / 2, height / 2)
        ctx.font = '400 20px system-ui, sans-serif'
        ctx.fillText('Appuie sur P pour reprendre', width / 2, height / 2 + 40)
        ctx.restore()
      }
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
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    animId = requestAnimationFrame(loop)

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('click', onClick)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      cancelAnimationFrame(animId)
    }
  }, [width, height])

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
        </div>
        <div className="hud-center">
        </div>
        <div className="hud-right">
        </div>
      </div>

      <canvas ref={canvasRef} width={width} height={height} className="shooter-canvas" />

      <div className="fullscreen-hint">Clique dans le jeu pour le plein ecran</div>
    </div>
  )
}

export default ShooterGame
