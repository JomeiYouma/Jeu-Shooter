/**
 * OBSTACLES - Liste d'obstacles pouvant apparaitre
 */
import Obstacle from '../classes/Obstacle.js'

const obstacles = [
  // [0] Asteroide - cassable
  new Obstacle({
    destructionType: 'breakThrough',
    damage: 1,
    rarity: 'common',
    png: { full: null, damaged: null, destroyed: null },
    width: 40,
    height: 40,
  }),

  // [1] Debris - traversable, inoffensif
  new Obstacle({
    destructionType: 'passThrough',
    damage: 0,
    rarity: 'common',
    png: { full: null, damaged: null, destroyed: null },
    width: 24,
    height: 24,
  }),
]

export default obstacles
