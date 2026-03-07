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
    weapon: null,
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
    shieldForce: 1,
    life: 10,
    baseLife: 10,
    weapon: null,
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
    shieldForce: 2,
    life: 40,
    baseLife: 40,
    weapon: null,
    movementPattern: 'sine',
    isIgnoringPlayer: false,
    contactDamage: 5,
    immunityTime: 300,
    isBoss: true,
    width: 72,
    height: 72,
    png: { full: null, damaged: null, destroyed: null },
  }),
]

export default enemyTypes
