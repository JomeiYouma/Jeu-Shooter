/**
 * OBSTACLES - 2 types distincts
 *
 * breakThrough = cassable par les balles, inflige des degats au contact
 * passThrough  = incassable, inflige des degats au contact, les balles passent a travers
 */
import Obstacle from '../classes/Obstacle.js'

import aFull from '../assets/obstacles/breakable/a_full.png'
import aDamaged from '../assets/obstacles/breakable/a_damaged.png'
import aDestroyed from '../assets/obstacles/breakable/a_destroyed.png'

import bFull from '../assets/obstacles/breakable/b_full.png'
import bDamaged from '../assets/obstacles/breakable/b_damaged.png'
import bDestroyed from '../assets/obstacles/breakable/b_destroyed.png'

import wallFull from '../assets/obstacles/unbreakable/wall_full.png'

const obstacles = [
  // [0] Asteroide - breakThrough (cassable, degats au contact)
  new Obstacle({
    destructionType: 'breakThrough',
    damage: 2,
    rarity: 'common',
    pngVariants: [
      { full: aFull, damaged: aDamaged, destroyed: aDestroyed },
      { full: bFull, damaged: bDamaged, destroyed: bDestroyed },
    ],
    width: 40,
    height: 40,
  }),

  // [1] Mine spatiale - passThrough (incassable, degats au contact)
  new Obstacle({
    destructionType: 'passThrough',
    damage: 3,
    rarity: 'rare',
    pngVariants: [
      { full: wallFull, damaged: null, destroyed: null },
    ],
    width: 28,
    height: 28,
  }),
]

export default obstacles
