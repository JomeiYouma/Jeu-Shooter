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
  name: 'Monde 1 - Fuite vers la base',
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
      amountOfItems: 5,
      amountOfObstacles: 2,
      rarity: 'common',
    }),

    // ── Niveau 2 : Premiers soldats ─────────────────────────
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
      amountOfItems: 7,
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

    // ── Niveau 4 : Éclaireurs & soldats ─────────────────────
    new Level({
      levelNo: 4,
      type: 'attack',
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 1, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 2, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 3, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 4.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 6.5, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 8,
      amountOfObstacles: 3,
      rarity: 'common',
    }),

    // ── Niveau 5 : Assaut mixte ─────────────────────────────
    new Level({
      levelNo: 5,
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
      amountOfItems: 6,
      amountOfObstacles: 4,
      rarity: 'rare',
    }),

    // ── Niveau 6 : Snipers & bombardiers ────────────────────
    new Level({
      levelNo: 6,
      type: 'attack',
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 200, type: 6 },
        { timeOfEntry: 1, positionOfEntry: 700, type: 6 },
        { timeOfEntry: 2, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 3, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 4.5, positionOfEntry: 450, type: 6 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 6.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 7, positionOfEntry: 'random', type: 0 },
      ],
      amountOfItems: 6,
      amountOfObstacles: 4,
      rarity: 'rare',
    }),

    // ── Niveau 7 : Bonus ─────────────────────────────────────
    new Level({
      levelNo: 7,
      type: 'bonus',
      enemies: [],
      amountOfItems: 10,
      amountOfObstacles: 5,
      rarity: 'epic',
    }),

    // ── Niveau 8 : Tourelles & tanks ────────────────────────
    new Level({
      levelNo: 8,
      type: 'attack',
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 300, type: 7 },
        { timeOfEntry: 1.5, positionOfEntry: 600, type: 7 },
        { timeOfEntry: 2.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 4, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 6, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 7, positionOfEntry: 450, type: 7 },
        { timeOfEntry: 8, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 6,
      amountOfObstacles: 5,
      rarity: 'rare',
    }),

    // ── Niveau 9 : Chaos total ──────────────────────────────
    new Level({
      levelNo: 9,
      type: 'attack',
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 1, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 1.5, positionOfEntry: 'random', type: 6 },
        { timeOfEntry: 2, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 2.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 3, positionOfEntry: 'random', type: 7 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 4, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 4.5, positionOfEntry: 'random', type: 6 },
        { timeOfEntry: 5, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 6.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 7.5, positionOfEntry: 'random', type: 7 },
      ],
      amountOfItems: 8,
      amountOfObstacles: 6,
      rarity: 'epic',
    }),

    // ── Niveau 10 : Boss ─────────────────────────────────────
    new Level({
      levelNo: 10,
      type: 'boss',
      enemies: [
        { timeOfEntry: 1, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 2, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 3, positionOfEntry: 450, type: 3 },
        { timeOfEntry: 6, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 8, positionOfEntry: 'random', type: 6 },
        { timeOfEntry: 10, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 12, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 9,
      amountOfObstacles: 3,
      rarity: 'epic',
    }),
  ],
})

export default world1
