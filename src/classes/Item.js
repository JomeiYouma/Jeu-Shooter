/**
 * Classe Item — Objet ramassable qui modifie les stats du joueur.
 *
 * Propriétés :
 *  - name        : Nom de l'item
 *  - description : Description
 *  - type        : "add" | "replace" | "weaponStat"
 *      • add     → ajoute la valeur à la stat du joueur (ex : +5 HP)
 *      • replace → remplace la valeur (ex : change d'arme)
 *      • weaponStat → ajoute la valeur à une stat de l'arme équipée
 *  - usedVar     : Nom de la variable affectée sur le joueur ou l'arme
 *                  (ex: "maxHealth", "maxSpeed", "weapons", "bulletsSize", …)
 *  - amount      : Montant du changement (ex: +5, -4)
 *  - rarity      : Rareté ("common", "rare", "epic", "legendary")
 *  - png         : Chemin vers l'image de l'item
 */
export default class Item {
  /** @type {"add"|"replace"|"weaponStat"} */
  static TYPES = ['add', 'replace', 'weaponStat']

  constructor({
    name = '',
    description = '',
    type = 'add',
    usedVar = '',
    amount = 0,
    rarity = 'common',
    png = null,
  } = {}) {
    this.name = name
    this.description = description
    this.type = type
    this.usedVar = usedVar
    this.amount = amount
    this.rarity = rarity
    this.png = png
  }

  /**
   * Applique l'item sur une cible (Player).
   * @param {import('./Player').default} target
   * @param {Array} [weaponsTable] — tableau global des armes (nécessaire pour type 'weaponStat')
   */
  applyTo(target, weaponsTable) {
    // Special handling for weapon replacement
    if (this.type === 'replace' && this.usedVar === 'weapons') {
      target.weapons = Array.isArray(this.amount) ? [...this.amount] : [this.amount]
      return
    }

    // Special handling for weapon stat modification
    if (this.type === 'weaponStat') {
      if (!weaponsTable || !target.weapons.length) return
      for (const wIdx of target.weapons) {
        const w = weaponsTable[wIdx]
        if (w && this.usedVar in w) {
          w[this.usedVar] += this.amount
        }
      }
      return
    }

    if (!(this.usedVar in target)) {
      console.warn(`Item "${this.name}": propriété "${this.usedVar}" introuvable sur la cible.`)
      return
    }

    if (this.type === 'add') {
      target[this.usedVar] += this.amount
    } else if (this.type === 'replace') {
      target[this.usedVar] = this.amount
    }
  }
}
