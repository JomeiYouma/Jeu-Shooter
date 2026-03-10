// -- Helpers & constants ----------------------------------------
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
export const randBetween = (a, b) => a + Math.random() * (b - a)
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const DEG2RAD = Math.PI / 180

// -- Game states ------------------------------------------------
export const STATE = {
  START: 'start',
  PLAYING: 'playing',
  LEVEL_TRANSITION: 'level_transition',
  GAME_OVER: 'game_over',
  VICTORY: 'victory',
}

// -- Progressive acceleration curve -----------------------------
// 0.3s => 40%, 0.6s => 70%, 1.2s => 85%, 3s => 100%
export function accelCurve(t) {
  if (t <= 0) return 0
  if (t <= 0.3) return (t / 0.3) * 0.5
  if (t <= 0.6) return 0.4 + ((t - 0.3) / 0.3) * 0.3
  if (t <= 1.2) return 0.7 + ((t - 0.6) / 0.6) * 0.15
  if (t <= 3.0) return 0.85 + ((t - 1.2) / 1.8) * 0.15
  return 1
}

// -- Stars for parallax background ------------------------------
export function createStars(count, w, h) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.5 + Math.random() * 1.5,
    speed: 15 + Math.random() * 40,
    alpha: 0.3 + Math.random() * 0.7,
  }))
}
