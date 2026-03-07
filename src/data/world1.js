/**
 * ═══════════════════════════════════════════════════════════════
 *  MONDE 1  —  Suite de niveaux du premier monde
 * ═══════════════════════════════════════════════════════════════
 *
 *  Pour les enemies : `type` = index dans enemyTypes.js
 */
import Level from '../classes/Level.js'
import World from '../classes/World.js'

const world1 = new World({
  name: 'Monde 1 — Ceinture d\'astéroïdes',
  levels: [
    // ── Niveau 1 : Échauffement ──────────────────────────────
    new Level({
      levelNo: 1,
      type: 'attack',
      enemies: [
        { timeOfEntry: 1, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 2.5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 4, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 6.5, positionOfEntry: 'random', type: 0 },
      ],
      amountOfItems: 1,
      amountOfObstacles: 2,
      rarity: 'common',
    }),

    // ── Niveau 2 : Montée en difficulté ─────────────────────
    new Level({
      levelNo: 2,
      type: 'attack',
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 1.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 3, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 4, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 6, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 7.5, positionOfEntry: 'random', type: 0 },
      ],
      amountOfItems: 1,
      amountOfObstacles: 3,
      rarity: 'common',
    }),

    // ── Niveau 3 : Bonus ─────────────────────────────────────
    new Level({
      levelNo: 3,
      type: 'bonus',
      enemies: [],
      amountOfItems: 5,
      amountOfObstacles: 4,
      rarity: 'rare',
    }),

    // ── Niveau 4 : Assaut ────────────────────────────────────
    new Level({
      levelNo: 4,
      type: 'attack',
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 1.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 2.5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 4.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 6, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 7, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 2,
      amountOfObstacles: 4,
      rarity: 'rare',
    }),

    // ── Niveau 5 : Boss ──────────────────────────────────────
    new Level({
      levelNo: 5,
      type: 'boss',
      enemies: [
        { timeOfEntry: 1, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 2, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 3, positionOfEntry: 450, type: 3 },
        { timeOfEntry: 6, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 8, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 2,
      amountOfObstacles: 3,
      rarity: 'epic',
    }),
  ],
})

export default world1
