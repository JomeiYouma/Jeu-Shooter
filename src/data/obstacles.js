/**
 * OBSTACLES - 3 types distincts
 *
 * blocking    = bloque physiquement le joueur, pas de degats, incassable
 * breakThrough = cassable par les balles, inflige des degats au contact
 * passThrough  = incassable, inflige des degats au contact, les balles passent a travers
 */
import Obstacle from '../classes/Obstacle.js'

const obstacles = [
  // [0] Mur spatial - blocking (bloque le joueur, pas de degats)
  new Obstacle({
    destructionType: 'blocking',
    damage: 0,
    rarity: 'common',
    png: { full: null, damaged: null, destroyed: null },
    width: 50,
    height: 50,
  }),

  // [1] Asteroide - breakThrough (cassable, degats au contact)
  new Obstacle({
    destructionType: 'breakThrough',
    damage: 2,
    rarity: 'common',
    png: { full: null, damaged: null, destroyed: null },
    width: 40,
    height: 40,
  }),

  // [2] Mine spatiale - passThrough (incassable, degats au contact)
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
