/**
 * Classe EnemyType — Définition d'un type d'ennemi (template / blueprint).
 *
 * Propriétés :
 *  - movementSpeed    : Vitesse de déplacement (px/s)
 *  - shieldForce      : Force du bouclier (réduit les dégâts reçus)
 *  - life             : Points de vie max
 *  - baseLife         : Vie de base (avant scaling par niveau)
 *  - weapon           : ID ou instance de Weapon utilisée
 *  - movementPattern  : Pattern de déplacement ("straight", "zigzag", "sine", "circle", etc.)
 *  - isIgnoringPlayer : true si l'ennemi ignore la position du joueur
 *  - contactDamage    : Dégâts infligés au contact avec le joueur
 *  - immunityTime     : Temps d'invulnérabilité après avoir pris un coup (ms)
 *  - isBoss           : true → affiche une barre de boss
 *  - width            : Largeur du sprite (px)
 *  - height           : Hauteur du sprite (px)
 *  - png              : { full, damaged, destroyed } — chemins vers les sprites
 */
export default class EnemyType {
  constructor({
    movementSpeed = 80,
    shieldForce = 0,
    life = 3,
    baseLife = 3,
    weapon = null,
    movementPattern = 'straight',
    isIgnoringPlayer = false,
    contactDamage = 1,
    immunityTime = 0,
    isBoss = false,
    width = 32,
    height = 32,
    png = { full: null, damaged: null, destroyed: null },
  } = {}) {
    this.movementSpeed = movementSpeed
    this.shieldForce = shieldForce
    this.life = life
    this.baseLife = baseLife
    this.weapon = weapon
    this.movementPattern = movementPattern
    this.isIgnoringPlayer = isIgnoringPlayer
    this.contactDamage = contactDamage
    this.immunityTime = immunityTime
    this.isBoss = isBoss
    this.width = width
    this.height = height
    this.png = { ...png }
  }

  /** Vie effective = baseLife (le champ `life` peut être overridé par scaling). */
  get effectiveLife() {
    return this.life ?? this.baseLife
  }
}
