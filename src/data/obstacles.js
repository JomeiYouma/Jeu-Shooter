/**
 * OBSTACLES - 2 types distincts
 *
 * breakThrough = cassable par les balles, inflige des degats au contact
 * passThrough  = incassable, inflige des degats au contact, les balles passent a travers
 */
import Obstacle from '../classes/Obstacle.js'

const obstacles = [
  // [0] Asteroide - breakThrough (cassable, degats au contact)
  new Obstacle({
    destructionType: 'breakThrough',
    damage: 2,
    rarity: 'common',
    png: { full: null, damaged: null, destroyed: null },
    width: 40,
    height: 40,
  }),

  // [1] Mine spatiale - passThrough (incassable, degats au contact)
  new Obstacle({
    destructionType: 'passThrough',
    damage: 3,
    rarity: 'rare',
    png: { full: null, damaged: null, destroyed: null },
    width: 28,
    height: 28,
  }),
]

export default obstacles
