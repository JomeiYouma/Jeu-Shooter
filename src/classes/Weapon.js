/**
 * Classe Weapon — Arme du joueur ou d'un ennemi.
 *
 * Propriétés :
 *  - name             : Nom de l'arme
 *  - description      : Description de l'arme
 *  - damage           : Dégâts par balle
 *  - bulletShootRotation : Tableau de rotations des balles (ex: [0] = 1 balle droite,
 *                          [0, 0] = 2 balles droites, [-30, 30] = 2 balles en cône)
 *  - bulletsSize      : Taille des balles (rayon en px)
 *  - bulletsPerSalve  : Nombre de balles par salve
 *  - salveDuration    : Durée d'une salve (ms)
 *  - cooldownTime     : Temps de recharge entre deux salves (ms)
 *  - salveRotationStep: Rotation additionnelle par tir au sein d'une salve
 *                        (0 = toujours la même direction, 5 = +5° par tir)
 *  - rarity           : Rareté (ex: "common", "rare", "epic", "legendary")
 *  - png              : Chemin vers l'image de l'arme
 *  - bulletGif        : Chemin vers le GIF animé de la balle
 */
export default class Weapon {
  constructor({
    name = '',
    description = '',
    damage = 1,
    bulletShootRotation = [0],
    bulletsSize = 5,
    bulletsPerSalve = 1,
    salveDuration = 0,
    cooldownTime = 500,
    salveRotationStep = 0,
    rarity = 'common',
    png = null,
    bulletGif = null,
  } = {}) {
    this.name = name
    this.description = description
    this.damage = damage
    this.bulletShootRotation = bulletShootRotation
    this.bulletsSize = bulletsSize
    this.bulletsPerSalve = bulletsPerSalve
    this.salveDuration = salveDuration
    this.cooldownTime = cooldownTime
    this.salveRotationStep = salveRotationStep
    this.rarity = rarity
    this.png = png
    this.bulletGif = bulletGif
  }

  /** Nombre de balles tirées simultanément (longueur du tableau de rotations). */
  get bulletCount() {
    return this.bulletShootRotation.length
  }

  /** DPS théorique (hors salve rotation). */
  get dps() {
    const cycleTime = (this.salveDuration + this.cooldownTime) / 1000
    if (cycleTime <= 0) return 0
    return (this.damage * this.bulletsPerSalve * this.bulletCount) / cycleTime
  }
}
