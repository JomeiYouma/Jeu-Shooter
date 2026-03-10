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
import bulletV from '../assets/bullets/bullet_v.gif'
import bulletCannon from '../assets/bullets/bullet_cannon.gif'
import bulletLaser from '../assets/bullets/bullet_laser.gif'
import bulletMachine from '../assets/bullets/bullet_red_laser.gif'

const weapons = [ 
  // [0] Laser basique - arme de depart
  new Weapon({
    name: 'Laser basique',
    description: 'Tir simple en ligne droite.',
    damage: 1,
    bulletShootRotation: [0,10],
    bulletsSize: 5,
    bulletsPerSalve: 10,
    salveDuration: 100,
    cooldownTime: 1,
    salveRotationStep: 0,
    rarity: 'common',
    png: null,
    bulletGif: bulletC,
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
    bulletGif: bulletV,
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
  }), // OTHER PLAYER WEAPONS
  // [13] Laser
  new Weapon({
    name: 'Laser',
    description: 'Laser faible mais continu.',
    damage: 0.01,
    bulletShootRotation: [0],
    bulletsSize: 6,
    bulletsPerSalve: 5,
    salveDuration: 5,
    cooldownTime: 0,
    salveRotationStep: 0,
    rarity: 'rare',
    png: null,
    bulletGif: bulletLaser,
  }),// [14] Gros canon
  new Weapon({
    name: 'Gros canon',
    description: 'Cadence faible et gros dégats',
    damage: 5,
    bulletShootRotation: [0],
    bulletsSize: 20,
    bulletsPerSalve: 1,
    salveDuration: 300,
    cooldownTime: 1200,
    salveRotationStep: 0,
    rarity: 'rare',
    png: null,
    bulletGif: bulletCannon,
  }),// [15] Machine
  new Weapon({
    name: 'Machine',
    description: 'Cadence élevée et dégâts modérés',
    damage: 0.45,
    bulletShootRotation: [0],
    bulletsSize: 3,
    bulletsPerSalve: 3,
    salveDuration: 300,
    cooldownTime: 200,
    salveRotationStep: 0,
    rarity: 'epic',
    png: null,
    bulletGif: bulletN,
  }),
  // [16] Éventail large - 5 directions
  new Weapon({
    name: 'Eventail large',
    description: 'Arrose en eventail large (4 dir).',
    damage: 1,
    bulletShootRotation: [-90, -45, 45, 90],
    bulletsSize: 3,
    bulletsPerSalve: 1,
    salveDuration: 100,
    cooldownTime: 800,
    salveRotationStep: 0,
    rarity: 'legendary',
    png: null,
    bulletGif: bulletO,
  }),
    // [17] Éventail large - 5 directions
  new Weapon({
    name: 'Eventail large',
    description: 'Arrose en eventail large (3 dir).',
    damage: 2,
    bulletShootRotation: [-92, 0, 92],
    bulletsSize: 3,
    bulletsPerSalve: 1,
    salveDuration: 200,
    cooldownTime: 400,
    salveRotationStep: 0,
    rarity: 'legendary',
    png: null,
    bulletGif: bulletMachine,
  }),
  // [18] Double canon
  new Weapon({
    name: 'Double canon bis',
    description: 'Tire deux balles en parallele.',
    damage: 0.7,
    bulletShootRotation: [-10, 10],
    bulletsSize: 4,
    bulletsPerSalve: 2,
    salveDuration: 640,
    cooldownTime: 60,
    salveRotationStep: 0,
    rarity: 'rare',
    png: null,
    bulletGif: bulletB,
  }),
  // [19] Phase Waller
  new Weapon({
    name: 'Phase waller',
    description: 'Tire des murs.',
    damage: 1.5,
    bulletShootRotation: [0],
    bulletsSize: 8,
    bulletsPerSalve: 5,
    salveDuration: 2000,
    cooldownTime: 700,
    salveRotationStep: 2,
    rarity: 'rare',
    png: null,
    bulletGif: bulletB,
  }),
]

export default weapons
