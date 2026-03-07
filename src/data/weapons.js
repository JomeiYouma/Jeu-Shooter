/**
 * ARMES - Liste des armes du jeu
 */
import Weapon from '../classes/Weapon.js'

const weapons = [
  // [0] Laser basique - arme de depart
  new Weapon({
    name: 'Laser basique',
    description: 'Tir simple en ligne droite.',
    damage: 1,
    bulletShootRotation: [0],
    bulletsSize: 5,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 400,
    salveRotationStep: 0,
    rarity: 'common',
    png: null,
  }),

  // [1] Double canon
  new Weapon({
    name: 'Double canon',
    description: 'Tire deux balles en parallele.',
    damage: 1,
    bulletShootRotation: [-8, 8],
    bulletsSize: 4,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 450,
    salveRotationStep: 0,
    rarity: 'rare',
    png: null,
  }),

  // [2] Cone de feu
  new Weapon({
    name: 'Cone de feu',
    description: 'Tire en eventail (3 directions).',
    damage: 2,
    bulletShootRotation: [-25, 0, 25],
    bulletsSize: 6,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 700,
    salveRotationStep: 0,
    rarity: 'epic',
    png: null,
  }),
]

export default weapons
