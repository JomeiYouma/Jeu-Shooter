/**
 * Classe Enemy — Instance concrète d'un ennemi en jeu (spawn).
 *
 * Propriétés :
 *  - timeOfEntry      : Moment d'apparition en secondes (t + x depuis le début du niveau)
 *  - positionOfEntry  : Position X d'apparition (px) ou "random"
 *  - life             : PV actuels (copiés depuis le type à la création)
 *  - rotationOfEntry  : Rotation initiale (degrés)
 *  - type             : Référence vers un EnemyType (template)
 *
 * Les propriétés du type (movementSpeed, shieldForce, weapon, etc.)
 * sont accessibles directement via des getters de commodité.
 */
import EnemyType from './EnemyType.js'

export default class Enemy {
  constructor({
    timeOfEntry = 0,
    positionOfEntry = 'random',
    life = null,
    rotationOfEntry = 0,
    type = null,
  } = {}) {
    /** @type {EnemyType} */
    this.type = type instanceof EnemyType ? type : new EnemyType(type ?? {})

    this.timeOfEntry = timeOfEntry
    this.positionOfEntry = positionOfEntry
    this.life = life ?? this.type.life
    this.rotationOfEntry = rotationOfEntry

    // Position courante en jeu (mise à jour par le moteur)
    this.x = 0
    this.y = 0
  }

  // ── Raccourcis vers le type ───────────────────────────────
  get movementSpeed() { return this.type.movementSpeed }
  get shieldForce() { return this.type.shieldForce }
  get weapon() { return this.type.weapon }
  get movementPattern() { return this.type.movementPattern }
  get isIgnoringPlayer() { return this.type.isIgnoringPlayer }
  get contactDamage() { return this.type.contactDamage }
  get immunityTime() { return this.type.immunityTime }
  get isBoss() { return this.type.isBoss }
  get width() { return this.type.width }
  get height() { return this.type.height }
  get png() { return this.type.png }

  get isAlive() {
    return this.life > 0
  }

  takeDamage(amount) {
    const effective = Math.max(1, amount - this.shieldForce)
    this.life = Math.max(0, this.life - effective)
    return this.life <= 0
  }
}
