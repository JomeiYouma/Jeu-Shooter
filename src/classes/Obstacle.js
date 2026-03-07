/**
 * Classe Obstacle — Objet statique ou dérivant sur le terrain.
 *
 * Propriétés :
 *  - destructionType : "blocking" | "breakThrough" | "passThrough"
 *      • blocking     → bloque le joueur et les balles
 *      • breakThrough → peut être détruit
 *      • passThrough  → traversable (pas de casse)
 *  - damage          : Dégâts infligés au contact
 *  - rarity          : Rareté ("common", "rare", "epic", "legendary")
 *  - png             : { full, damaged, destroyed } — chemins vers les sprites
 *  - width           : Largeur (px)
 *  - height          : Hauteur (px)
 */
export default class Obstacle {
  /** @type {"blocking"|"breakThrough"|"passThrough"} */
  static DESTRUCTION_TYPES = ['blocking', 'breakThrough', 'passThrough']

  constructor({
    destructionType = 'blocking',
    damage = 0,
    rarity = 'common',
    png = { full: null, damaged: null, destroyed: null },
    width = 32,
    height = 32,
  } = {}) {
    this.destructionType = destructionType
    this.damage = damage
    this.rarity = rarity
    this.png = { ...png }
    this.width = width
    this.height = height
  }

  get isBlocking() {
    return this.destructionType === 'blocking'
  }

  get isBreakable() {
    return this.destructionType === 'breakThrough'
  }

  get isPassThrough() {
    return this.destructionType === 'passThrough'
  }
}
