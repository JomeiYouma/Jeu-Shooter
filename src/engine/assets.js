import GifPlayer from '../utils/gifPlayer.js'
import { weapons } from '../data/index.js'

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
export function loadImg(src) {
  if (!src) return null
  if (!_imgCache[src]) {
    const img = new Image()
    img.src = src
    _imgCache[src] = img
  }
  return _imgCache[src]
}

// Pre-load bar images into arrays
export const ACCEL_BARS = accelbarPaths.map(loadImg)
export const RED_BARS   = redbarPaths.map(loadImg)
export const BLUE_BARS  = bluebarPaths.map(loadImg)

// -- Animated GIF players (one per unique bullet GIF) -----------
const _gifPlayers = {}
export function getGifPlayer(src) {
  if (!src) return null
  if (!_gifPlayers[src]) {
    const player = new GifPlayer()
    player.load(src)
    _gifPlayers[src] = player
  }
  return _gifPlayers[src]
}

// Pre-load all weapon bullet GIFs
for (const w of weapons) {
  if (w.bulletGif) getGifPlayer(w.bulletGif)
}
