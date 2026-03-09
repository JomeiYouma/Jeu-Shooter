/**
 * ARMES - Liste des armes du jeu
 */
import Weapon from '../classes/Weapon.js'
import bulletA from '../assets/bullets/bullet_a.gif'
import bulletB from '../assets/bullets/bullet_b.gif'
import bulletC from '../assets/bullets/bullet_c.gif'
import bulletE from '../assets/bullets/bullet_e.gif'
import bulletF from '../assets/bullets/bullet_f.gif'
import bulletG from '../assets/bullets/bullet_g.gif'
import bulletH from '../assets/bullets/bullet_h.gif'
import bulletI from '../assets/bullets/bullet_i.gif'
import bulletJ from '../assets/bullets/bullet_j.gif'
import bulletK from '../assets/bullets/bullet_k.gif'
import bulletL from '../assets/bullets/bullet_l.gif'
import bulletN from '../assets/bullets/bullet_n.gif'
import bulletO from '../assets/bullets/bullet_o.gif'  

const weapons = [ 
  // [0] Laser basique - arme de depart
  new Weapon({
    name: 'Laser basique',
    description: 'Tir simple en ligne droite.',
    damage: 1,
    bulletShootRotation: [0],
    bulletsSize: 5,
    bulletsPerSalve: 1,
    salveDuration: 100,
    cooldownTime: 1,
    salveRotationStep: 10,
    rarity: 'common',
    png: null,
    bulletGif: bulletH,
  }),

  // [1] Double canon
  new Weapon({
    name: 'Double canon',
    description: 'Tire deux balles en parallele.',
    damage: 1,
    bulletShootRotation: [-8, 8],
    bulletsSize: 4,
    bulletsPerSalve: 1,
    salveDuration: 100,
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
    salveDuration: 100,
    cooldownTime: 700,
    salveRotationStep: 0,
    rarity: 'epic',
    png: null,
    bulletGif: bulletO,
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
    bulletGif: bulletI,
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
    bulletGif: bulletK,
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
    bulletGif: bulletG,
  }),

  // [6] Rafale rapide - cadence élevée, faible dégât
  new Weapon({
    name: 'Rafale rapide',
    description: 'Tir très rapide mais faible.',
    damage: 1,
    bulletShootRotation: [0],
    bulletsSize: 3,
    bulletsPerSalve: 3,
    salveDuration: 120,
    cooldownTime: 280,
    salveRotationStep: 4,
    rarity: 'rare',
    png: null,
    bulletGif: bulletF,
  }),

  // [7] Canon lourd - lent mais puissant
  new Weapon({
    name: 'Canon lourd',
    description: 'Tir lent mais devastateur.',
    damage: 4,
    bulletShootRotation: [0],
    bulletsSize: 8,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 1100,
    salveRotationStep: 0,
    rarity: 'epic',
    png: null,
    bulletGif: bulletE,
  }),

  // [8] Éventail large - 5 directions
  new Weapon({
    name: 'Eventail large',
    description: 'Arrose en eventail large (5 dir).',
    damage: 1,
    bulletShootRotation: [-40, -20, 0, 20, 40],
    bulletsSize: 4,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 800,
    salveRotationStep: 0,
    rarity: 'legendary',
    png: null,
    bulletGif: bulletH,
  }),

  // ── Armes ennemies supplémentaires ─────────────────────────

  // [9] Éclaireur rapide ennemi
  new Weapon({
    name: 'Tir eclaireur',
    description: 'Tir rapide vers le bas.',
    damage: 1,
    bulletShootRotation: [0],
    bulletsSize: 3,
    bulletsPerSalve: 2,
    salveDuration: 100,
    cooldownTime: 800,
    salveRotationStep: 0,
    rarity: 'common',
    png: null,
    bulletGif: bulletL,
  }),

  // [10] Bombardier ennemi - tir en cône vers le bas
  new Weapon({
    name: 'Tir bombardier',
    description: 'Trois tirs étalés.',
    damage: 1,
    bulletShootRotation: [-15, 0, 15],
    bulletsSize: 4,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 1400,
    salveRotationStep: 0,
    rarity: 'rare',
    png: null,
    bulletGif: bulletJ,
  }),

  // [11] Tireur d'élite ennemi - un gros tir précis
  new Weapon({
    name: 'Tir de precision',
    description: 'Un seul tir puissant et précis.',
    damage: 3,
    bulletShootRotation: [0],
    bulletsSize: 6,
    bulletsPerSalve: 1,
    salveDuration: 0,
    cooldownTime: 2000,
    salveRotationStep: 0,
    rarity: 'epic',
    png: null,
    bulletGif: bulletE,
  }),

  // [12] Tourelle rotative ennemi - salve tournante
  new Weapon({
    name: 'Tourelle rotative',
    description: 'Salve tournante en spirale.',
    damage: 1,
    bulletShootRotation: [-10, 10],
    bulletsSize: 4,
    bulletsPerSalve: 4,
    salveDuration: 400,
    cooldownTime: 1200,
    salveRotationStep: 15,
    rarity: 'epic',
    png: null,
    bulletGif: bulletF,
  }),
]

export default weapons
