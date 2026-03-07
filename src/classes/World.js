/**
 * Classe World — Un monde = une suite de niveaux à enchaîner.
 *
 * Propriétés :
 *  - name    : Nom du monde
 *  - levels  : Tableau d'instances Level (dans l'ordre)
 */
export default class World {
  constructor({ name = 'Monde sans nom', levels = [] } = {}) {
    this.name = name
    this.levels = [...levels]
  }

  get levelCount() {
    return this.levels.length
  }

  getLevel(index) {
    return this.levels[index] ?? null
  }
}
