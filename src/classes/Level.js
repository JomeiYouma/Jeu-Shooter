/**
 * Classe Level — Définition d'un niveau.
 *
 * Propriétés :
 *  - levelNo         : Numéro du niveau
 *  - type            : "bonus" | "attack" | "boss"
 *  - enemies         : Liste d'ennemis du niveau (tableau d'objets Enemy ou de configs)
 *  - amountOfItems   : Nombre d'items qui apparaîtront
 *  - amountOfObstacles : Nombre d'obstacles qui apparaîtront
 *  - rarity          : Rareté min des drops / spawns ("common", "rare", "epic", "legendary")
 */
export default class Level {
  /** @type {"bonus"|"attack"|"boss"} */
  static TYPES = ['bonus', 'attack', 'boss']

  constructor({
    levelNo = 1,
    type = 'attack',
    enemies = [],
    amountOfItems = 0,
    amountOfObstacles = 0,
    rarity = 'common',
  } = {}) {
    this.levelNo = levelNo
    this.type = type
    this.enemies = [...enemies]
    this.amountOfItems = amountOfItems
    this.amountOfObstacles = amountOfObstacles
    this.rarity = rarity
  }

  get isBonus() { return this.type === 'bonus' }
  get isAttack() { return this.type === 'attack' }
  get isBoss() { return this.type === 'boss' }
  get enemyCount() { return this.enemies.length }
}
