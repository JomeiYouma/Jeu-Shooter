/**
 * ═══════════════════════════════════════════════════════════════
 *  NIVEAUX  —  Remplis ce tableau avec tes niveaux
 * ═══════════════════════════════════════════════════════════════
 *
 *  Chaque entrée crée une instance de la classe Level.
 *  Le champ `enemies` contient la liste des vagues (objets Enemy).
 *
 *  Propriétés disponibles :
 *
 *  | Propriété          | Type     | Description                                                   |
 *  |--------------------|----------|---------------------------------------------------------------|
 *  | levelNo            | number   | Numéro du niveau                                              |
 *  | type               | string   | "bonus" / "attack" / "boss"                                   |
 *  | enemies            | array    | Liste d'ennemis : [{ timeOfEntry, positionOfEntry, type, …}]  |
 *  | amountOfItems      | number   | Nombre d'items qui spawnent                                   |
 *  | amountOfObstacles  | number   | Nombre d'obstacles                                            |
 *  | rarity             | string   | Rareté minimale des drops                                     |
 *
 *  Pour le champ `enemies`, chaque élément peut contenir :
 *    - timeOfEntry      : secondes depuis le début du niveau
 *    - positionOfEntry  : position X (px) ou "random"
 *    - rotationOfEntry  : rotation initiale (degrés)
 *    - type             : index dans le tableau enemyTypes, ou objet EnemyType inline
 */
import Level from '../classes/Level.js'

const levels = [
  // ── Exemple (à modifier / dupliquer) ──────────────────────
  new Level({
    levelNo: 1,
    type: 'attack',
    enemies: [
      { timeOfEntry: 0, positionOfEntry: 'random', rotationOfEntry: 0, type: 0 },
      { timeOfEntry: 1, positionOfEntry: 'random', rotationOfEntry: 0, type: 0 },
      { timeOfEntry: 2, positionOfEntry: 200, rotationOfEntry: 0, type: 0 },
      { timeOfEntry: 3, positionOfEntry: 'random', rotationOfEntry: 0, type: 0 },
    ],
    amountOfItems: 1000,
    amountOfObstacles: 2,
    rarity: 'common',
  }),

  // new Level({
  //   levelNo: 2,
  //   type: 'boss',
  //   enemies: [
  //     { timeOfEntry: 0, positionOfEntry: 'random', rotationOfEntry: 0, type: 0 },
  //     { timeOfEntry: 5, positionOfEntry: 450, rotationOfEntry: 0, type: 2 },  // boss
  //   ],
  //   amountOfItems: 3,
  //   amountOfObstacles: 5,
  //   rarity: 'rare',
  // }),
]

export default levels
