import GifPlayer from '../utils/gifPlayer.js'
import { weapons, enemyTypes, items, obstacles } from '../data/index.js'
import roadTileSrc from '../assets/road_tile.jpg'
import explosionPlayerGif from '../assets/fx/explosion_player.gif'
import playerFarLeft from '../assets/player/player_far_left.png'
import playerLeft from '../assets/player/player_left.png'
import playerNormal from '../assets/player/player_normal.png'
import playerRight from '../assets/player/player_right.png'
import playerFarRight from '../assets/player/player_far_right.png'

// -- Factorized GUI bar imports (Vite glob) ----------------------
const accelbarModules = import.meta.glob('../assets/gui/Accelbar/*.png', { eager: true, import: 'default' })
const redbarModules   = import.meta.glob('../assets/gui/Redbar/*.png',   { eager: true, import: 'default' })
const bluebarModules  = import.meta.glob('../assets/gui/Bluebar/*.png',  { eager: true, import: 'default' })

// Sort by filename to guarantee order (0, 1, 2, 3…)
const sortByPath = (a, b) => a[0].localeCompare(b[0], undefined, { numeric: true })
const accelbarPaths = Object.entries(accelbarModules).sort(sortByPath).map(([, v]) => v)
const redbarPaths   = Object.entries(redbarModules).sort(sortByPath).map(([, v]) => v)
const bluebarPaths  = Object.entries(bluebarModules).sort(sortByPath).map(([, v]) => v)

// -- Image preloader / cache (PNGs only) ------------------------
const _imgCache = {}
const _loadingPromises = []

export function loadImg(src) {
  if (!src) return null
  if (!_imgCache[src]) {
    const img = new Image()
    const p = new Promise(resolve => {
      img.onload = () => resolve()
      img.onerror = () => {
        console.warn('[loadImg] failed to load', src)
        resolve()
      }
    })
    _loadingPromises.push(p)
    img.src = src
    _imgCache[src] = img
  }
  return _imgCache[src]
}

export function getAssetsPromise() {
  return Promise.all(_loadingPromises)
}

// Pre-load bar images into arrays
export const ACCEL_BARS = accelbarPaths.map(loadImg)
export const RED_BARS   = redbarPaths.map(loadImg)
export const BLUE_BARS  = bluebarPaths.map(loadImg)
export const ROAD_TILE  = loadImg(roadTileSrc)

// -- Animated GIF players (one per unique bullet GIF) -----------
const _gifPlayers = {}
export function getGifPlayer(src) {
  if (!src) return null
  if (!_gifPlayers[src]) {
    const player = new GifPlayer()
    // Register the decode promise so getAssetsPromise() actually waits on GIFs
    _loadingPromises.push(player.load(src).catch(() => {}))
    _gifPlayers[src] = player
  }
  return _gifPlayers[src]
}

// -- Preload everything used at runtime -------------------------
// Player sprites
loadImg(playerFarLeft)
loadImg(playerLeft)
loadImg(playerNormal)
loadImg(playerRight)
loadImg(playerFarRight)

// All weapon bullet GIFs
for (const w of weapons) {
  if (w.bulletGif) getGifPlayer(w.bulletGif)
}

// Player explosion GIF
getGifPlayer(explosionPlayerGif)

// All enemy PNGs (full / damaged / destroyed for each type)
for (const e of enemyTypes) {
  if (!e?.png) continue
  if (e.png.full) loadImg(e.png.full)
  if (e.png.damaged) loadImg(e.png.damaged)
  if (e.png.destroyed) loadImg(e.png.destroyed)
}

// All item PNGs
for (const it of items) {
  if (it?.png) loadImg(it.png)
}

// All obstacle PNG variants
for (const o of obstacles) {
  if (!o?.pngVariants) continue
  for (const v of o.pngVariants) {
    if (v?.full) loadImg(v.full)
    if (v?.damaged) loadImg(v.damaged)
    if (v?.destroyed) loadImg(v.destroyed)
  }
}
