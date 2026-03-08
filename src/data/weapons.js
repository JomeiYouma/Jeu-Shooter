/**
 * ARMES - Liste des armes du jeu
 */
import Weapon from '../classes/Weapon.js'
import bulletA from '../assets/bullets/bullet_a.gif'
import bulletB from '../assets/bullets/bullet_b.gif'
import bulletC from '../assets/bullets/bullet_c.gif'

const weapons = [
  // [0] Laser basique - arme de depart
  new Weapon({
    name: 'Laser basique',
    description: 'Tir simple en ligne droite.',
    damage: 1,
    bulletShootRotation: [0,10,-10],
    bulletsSize: 5,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 333,
    salveRotationStep: 0,
    rarity: 'common',
    png: null,
    bulletGif: bulletB,
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
    bulletGif: bulletB,
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
    bulletGif: bulletC,
  }),

  // ── Armes ennemies ─────────────────────────────────────────

  // [3] Tir ennemi basique (Soldat)
  new Weapon({
    name: 'Tir ennemi basique',
    description: 'Tir simple vers le bas.',
    damage: 1,
    bulletShootRotation: [0],
    bulletsSize: 4,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 1200,
    salveRotationStep: 0,
    rarity: 'common',
    png: null,
    bulletGif: bulletC,
  }),

  // [4] Double tir ennemi (Tank)
  new Weapon({
    name: 'Double tir ennemi',
    description: 'Deux balles paralleles vers le bas.',
    damage: 2,
    bulletShootRotation: [-6, 6],
    bulletsSize: 5,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 1600,
    salveRotationStep: 0,
    rarity: 'rare',
    png: null,
    bulletGif: bulletA,
  }),

  // [5] Cone ennemi (Boss)
  new Weapon({
    name: 'Cone du boss',
    description: 'Tir en eventail triple, rapide.',
    damage: 2,
    bulletShootRotation: [-20, 0, 20],
    bulletsSize: 6,
    bulletsPerSalve: 2,
    salveDuration: 150,
    cooldownTime: 900,
    salveRotationStep: 8,
    rarity: 'epic',
    png: null,
    bulletGif: bulletB,
  }),
]

export default weapons
