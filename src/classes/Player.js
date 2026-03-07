/**
 * Classe Player (Ourself) — Le vaisseau du joueur.
 *
 * Propriétés :
 *  - acceleration     : Accélération (Microchip) — contrôle la réactivité
 *  - weapons          : Liste d'armes équipées (tirées simultanément au clic / hold)
 *  - shieldForce      : Force du bouclier (Bodywork) — réduit les dégâts reçus
 *  - healthPoints     : PV actuels
 *  - maxHealth        : PV maximum
 *  - contactDamage    : Dégâts infligés au contact (Spikes)
 *  - maxSpeed         : Vitesse max globale (Engine) — multiplicateur vitesse avant
 *  - maxSideSpeed     : Vitesse latérale max (Sterwheel) — multiplicateur gauche/droite
 *  - maxBrakeSpeed    : Vitesse de freinage max (Sterwheel) — multiplicateur arrière
 *  - immunityTime     : Durée d'invulnérabilité après un coup (ms)
 *  - width            : Largeur du sprite (px)
 *  - height           : Hauteur du sprite (px)
 *  - png              : { full, damaged, destroyed } — chemins vers les sprites
 */
export default class Player {
  constructor({
    acceleration = 1,
    weapons = [],
    shieldForce = 0,
    healthPoints = 10,
    maxHealth = 10,
    contactDamage = 0,
    maxSpeed = 200,
    maxSideSpeed = 150,
    maxBrakeSpeed = 100,
    immunityTime = 1000,
    width = 48,
    height = 48,
    png = { full: null, damaged: null, destroyed: null },
  } = {}) {
    this.acceleration = acceleration
    this.weapons = [...weapons]
    this.shieldForce = shieldForce
    this.healthPoints = healthPoints
    this.maxHealth = maxHealth
    this.contactDamage = contactDamage
    this.maxSpeed = maxSpeed
    this.maxSideSpeed = maxSideSpeed
    this.maxBrakeSpeed = maxBrakeSpeed
    this.immunityTime = immunityTime
    this.width = width
    this.height = height
    this.png = { ...png }

    // État d'exécution (géré par le moteur)
    this.x = 0
    this.y = 0
    this.isImmune = false
  }

  get isAlive() {
    return this.healthPoints > 0
  }

  get healthPercent() {
    return this.maxHealth > 0 ? this.healthPoints / this.maxHealth : 0
  }

  takeDamage(amount) {
    if (this.isImmune) return false
    const effective = Math.max(0, amount - this.shieldForce)
    this.healthPoints = Math.max(0, this.healthPoints - effective)
    return this.healthPoints <= 0
  }

  heal(amount) {
    this.healthPoints = Math.min(this.maxHealth, this.healthPoints + amount)
  }

  equipWeapon(weapon) {
    this.weapons.push(weapon)
  }

  removeWeapon(index) {
    this.weapons.splice(index, 1)
  }
}
