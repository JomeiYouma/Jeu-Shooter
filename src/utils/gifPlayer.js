/**
 * GIF frame decoder — parses animated GIFs into individual frames
 * that can be drawn on a canvas at each animation tick.
 *
 * Usage:
 *   const player = new GifPlayer()
 *   await player.load(url)          // decode once
 *   const canvas = player.getFrame() // call every render tick
 */
import { parseGIF, decompressFrames } from 'gifuct-js'

export default class GifPlayer {
  constructor() {
    this.frames = []      // { canvas, delay } per frame
    this.totalDuration = 0
    this.ready = false
    this._startTime = performance.now()
  }

  /**
   * Fetch and decode a GIF from a URL (or Vite-imported asset path).
   */
  async load(url) {
    try {
      const resp = await fetch(url)
      const buffer = await resp.arrayBuffer()
      const gif = parseGIF(buffer)
      const decoded = decompressFrames(gif, true) // true = build patches

      if (!decoded.length) return

      // Create a compositing canvas at the GIF's real size
      const gifW = decoded[0].dims.width
      const gifH = decoded[0].dims.height
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = gifW
      tempCanvas.height = gifH
      const tempCtx = tempCanvas.getContext('2d')

      for (const frame of decoded) {
        // Build ImageData for this frame's patch
        const { dims, patch, delay, disposalType } = frame
        const imgData = new ImageData(
          new Uint8ClampedArray(patch),
          dims.width,
          dims.height
        )

        // Draw patch onto compositing canvas at frame's offset
        const patchCanvas = document.createElement('canvas')
        patchCanvas.width = dims.width
        patchCanvas.height = dims.height
        patchCanvas.getContext('2d').putImageData(imgData, 0, 0)

        tempCtx.drawImage(patchCanvas, dims.left, dims.top)

        // Snapshot current composite as a frame
        const frameCanvas = document.createElement('canvas')
        frameCanvas.width = gifW
        frameCanvas.height = gifH
        frameCanvas.getContext('2d').drawImage(tempCanvas, 0, 0)

        const frameDelay = delay >= 20 ? delay : 100 // enforce min delay
        this.frames.push({ canvas: frameCanvas, delay: frameDelay })
        this.totalDuration += frameDelay

        // Handle disposal
        if (disposalType === 2) {
          // Restore to background
          tempCtx.clearRect(dims.left, dims.top, dims.width, dims.height)
        }
        // disposalType 3 (restore to previous) is rare, skip for simplicity
      }

      this.ready = true
    } catch (err) {
      console.warn('[GifPlayer] Failed to load GIF:', url, err)
    }
  }

  /**
   * Get the canvas for the current frame based on elapsed time.
   * Returns null if not ready.
   */
  getFrame() {
    if (!this.ready || this.frames.length === 0) return null
    if (this.frames.length === 1) return this.frames[0].canvas

    const elapsed = (performance.now() - this._startTime) % this.totalDuration
    let acc = 0
    for (const f of this.frames) {
      acc += f.delay
      if (elapsed < acc) return f.canvas
    }
    return this.frames[this.frames.length - 1].canvas
  }
}
