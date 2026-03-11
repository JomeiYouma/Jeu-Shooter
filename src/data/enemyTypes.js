/**
 * TYPES D'ENNEMIS - Blueprints d'ennemis
 */
import EnemyType from '../classes/EnemyType.js'

const enemyTypes = [
  // [0] Scout - petit et rapide
  new EnemyType({
    movementSpeed: 100,
    shieldForce: 0,
    life: 2,
    baseLife: 2,
    weapon: null,
    movementPattern: 'straight',
    isIgnoringPlayer: true,
    contactDamage: 1,
    immunityTime: 0,
    isBoss: false,
    width: 28,
    height: 28,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [1] Soldat - moyen, zigzag
  new EnemyType({
    movementSpeed: 65,
    shieldForce: 0,
    life: 4,
    baseLife: 4,
    weapon: 3,
    movementPattern: 'zigzag',
    isIgnoringPlayer: false,
    contactDamage: 2,
    immunityTime: 0,
    isBoss: false,
    width: 36,
    height: 36,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [2] Tank - lent, blinde
  new EnemyType({
    movementSpeed: 40,
    shieldForce: 0 ,
    life: 10,
    baseLife: 10,
    weapon: 4,
    movementPattern: 'straight',
    isIgnoringPlayer: false,
    contactDamage: 3,
    immunityTime: 200,
    isBoss: false,
    width: 44,
    height: 44,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [3] Boss - gros, barre de vie
  new EnemyType({
    movementSpeed: 25,
    shieldForce: 0,
    life: 400,
    baseLife: 800,
    weapon: 5,
    movementPattern: 'sine',
    isIgnoringPlayer: false,
    contactDamage: 5,
    immunityTime: 300,
    isBoss: true,
    width: 72,
    height: 72,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [4] Éclaireur - rapide, rafale courte, zigzag serré
  new EnemyType({
    movementSpeed: 120,
    shieldForce: 0,
    life: 3,
    baseLife: 3,
    weapon: 9,
    movementPattern: 'zigzag',
    isIgnoringPlayer: true,
    contactDamage: 1,
    immunityTime: 0,
    isBoss: false,
    width: 26,
    height: 26,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [5] Bombardier - lent, tir en cône, résistant
  new EnemyType({
    movementSpeed: 35,
    shieldForce: 0,
    life: 12,
    baseLife: 12,
    weapon: 10,
    movementPattern: 'straight',
    isIgnoringPlayer: false,
    contactDamage: 3,
    immunityTime: 100,
    isBoss: false,
    width: 42,
    height: 42,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [6] Sniper - immobile en haut, tir puissant
  new EnemyType({
    movementSpeed: 20,
    shieldForce: 0,
    life: 5,
    baseLife: 5,
    weapon: 11,
    movementPattern: 'sine',
    isIgnoringPlayer: false,
    contactDamage: 2,
    immunityTime: 0,
    isBoss: false,
    width: 32,
    height: 32,
    png: { full: null, damaged: null, destroyed: null },
  }),

  // [7] Tourelle - résistant, salve rotative
  new EnemyType({
    movementSpeed: 30,
    shieldForce: 0,
    life: 20,
    baseLife: 20,
    weapon: 12,
    movementPattern: 'straight',
    isIgnoringPlayer: false,
    contactDamage: 2,
    immunityTime: 150,
    isBoss: false,
    width: 40,
    height: 40,
    png: { full: null, damaged: null, destroyed: null },
  }),
]

export default enemyTypes
