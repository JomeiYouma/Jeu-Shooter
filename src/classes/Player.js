/**
 * Classe Player (Ourself) — Le vaisseau du joueur.
 *
 * Propriétés :
 *  - acceleration     : Accélération (Microchip) — contrôle la réactivité
 *  - weapons          : Liste d'armes équipées (tirées simultanément au clic / hold)
 *  - shieldForce      : Points de bouclier consommables (max 4) — absorbe les dégâts avant les PV
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
    talismanCount = 0,
    width = 48,
    height = 48,
    png = { full: null, damaged: null, destroyed: null },
    turboBars = 4,
    turboBarDuration = 0.5,
    turboRechargeTime = 5.0,
  } = {}) {
    this.acceleration = acceleration
    this.weapons = [...weapons]
    this.shieldForce = shieldForce
    this.maxShield = 4
    this.healthPoints = healthPoints
    this.maxHealth = maxHealth
    this.contactDamage = contactDamage
    this.maxSpeed = maxSpeed
    this.maxSideSpeed = maxSideSpeed
    this.maxBrakeSpeed = maxBrakeSpeed
    this.immunityTime = immunityTime
    this.talismanCount = talismanCount
    this.maxTalisman = 10
    this.width = width
    this.height = height
    this.png = { ...png }
    this.turboBars = turboBars
    this.turboBarDuration = turboBarDuration
    this.turboRechargeTime = turboRechargeTime

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

  get shieldPercent() {
    return this.maxShield > 0 ? this.shieldForce / this.maxShield : 0
  }

  takeDamage(amount) {
    if (this.isImmune) return false
    let remaining = amount
    // Shield absorbs damage first
    if (this.shieldForce > 0) {
      const absorbed = Math.min(this.shieldForce, remaining)
      this.shieldForce -= absorbed
      remaining -= absorbed
    }
    // Remaining damage hits HP
    if (remaining > 0) {
      this.healthPoints = Math.max(0, this.healthPoints - remaining)
    }
    return this.healthPoints <= 0
  }

  heal(amount) {
    this.healthPoints = Math.min(this.maxHealth, this.healthPoints + amount)
  }

  addShield(amount) {
    this.shieldForce = Math.min(this.maxShield, this.shieldForce + amount)
  }

  equipWeapon(weapon) {
    this.weapons.push(weapon)
  }

  removeWeapon(index) {
    this.weapons.splice(index, 1)
  }
}
