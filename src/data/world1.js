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
  name: 'Monde 1 — Fuite vers la base',
  nameKey: 'world.world1_name',
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
      amountOfItems: 6,
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

    // ════════════════════════════════════════════════════════
    //  ACTE II — Après-boss : la difficulté monte d'un cran
    //  (chaque niveau utilise enemyScale → vie/dégâts/vitesse ×)
    // ════════════════════════════════════════════════════════

    // ── Niveau 11 : Reprise musclée ─────────────────────────
    new Level({
      levelNo: 11,
      type: 'attack',
      enemyScale: 1.3,
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 1.2, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 2.2, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 3.2, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 4.2, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 5.2, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 6.2, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 7.2, positionOfEntry: 'random', type: 0 },
      ],
      amountOfItems: 7,
      amountOfObstacles: 4,
      rarity: 'rare',
    }),

    // ── Niveau 12 : Meute d'éclaireurs ──────────────────────
    new Level({
      levelNo: 12,
      type: 'attack',
      enemyScale: 1.5,
      enemies: [
        { timeOfEntry: 0.3, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 0.8, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 1.3, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 2.3, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 3.0, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 3.8, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 4.8, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 5.8, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 6.8, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 8,
      amountOfObstacles: 4,
      rarity: 'rare',
    }),

    // ── Niveau 13 : Bonus (récompenses épiques) ─────────────
    new Level({
      levelNo: 13,
      type: 'bonus',
      enemies: [],
      amountOfItems: 8,
      amountOfObstacles: 5,
      rarity: 'epic',
    }),

    // ── Niveau 14 : Embuscade lourde ────────────────────────
    new Level({
      levelNo: 14,
      type: 'attack',
      enemyScale: 1.7,
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 200, type: 2 },
        { timeOfEntry: 1.5, positionOfEntry: 700, type: 2 },
        { timeOfEntry: 2.5, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 4.5, positionOfEntry: 450, type: 5 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 6.5, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 7.5, positionOfEntry: 'random', type: 5 },
      ],
      amountOfItems: 7,
      amountOfObstacles: 5,
      rarity: 'rare',
    }),

    // ── Niveau 15 : Tir croisé des snipers ──────────────────
    new Level({
      levelNo: 15,
      type: 'attack',
      enemyScale: 1.9,
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 150, type: 6 },
        { timeOfEntry: 0.8, positionOfEntry: 750, type: 6 },
        { timeOfEntry: 2.0, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 3.0, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 4.0, positionOfEntry: 300, type: 6 },
        { timeOfEntry: 4.5, positionOfEntry: 600, type: 6 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 6.5, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 7.5, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 8,
      amountOfObstacles: 5,
      rarity: 'epic',
    }),

    // ── Niveau 16 : Forteresse de tourelles ─────────────────
    new Level({
      levelNo: 16,
      type: 'attack',
      enemyScale: 2.1,
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 200, type: 7 },
        { timeOfEntry: 1.0, positionOfEntry: 700, type: 7 },
        { timeOfEntry: 2.5, positionOfEntry: 450, type: 7 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 4.0, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 5.0, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 6.0, positionOfEntry: 300, type: 7 },
        { timeOfEntry: 6.5, positionOfEntry: 600, type: 7 },
        { timeOfEntry: 7.5, positionOfEntry: 'random', type: 2 },
      ],
      amountOfItems: 8,
      amountOfObstacles: 6,
      rarity: 'epic',
    }),

    // ── Niveau 17 : Bonus (récompenses légendaires) ─────────
    new Level({
      levelNo: 17,
      type: 'bonus',
      enemies: [],
      amountOfItems: 10,
      amountOfObstacles: 6,
      rarity: 'legendary',
    }),

    // ── Niveau 18 : Tempête de feu ──────────────────────────
    new Level({
      levelNo: 18,
      type: 'attack',
      enemyScale: 2.4,
      enemies: [
        { timeOfEntry: 0.3, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 0.8, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 1.3, positionOfEntry: 'random', type: 6 },
        { timeOfEntry: 1.8, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 2.3, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 2.8, positionOfEntry: 'random', type: 7 },
        { timeOfEntry: 3.5, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 4.2, positionOfEntry: 'random', type: 0 },
        { timeOfEntry: 4.8, positionOfEntry: 'random', type: 6 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 6.2, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 7.0, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 7.8, positionOfEntry: 'random', type: 7 },
      ],
      amountOfItems: 9,
      amountOfObstacles: 6,
      rarity: 'epic',
    }),

    // ── Niveau 19 : Avant-garde du boss final ───────────────
    new Level({
      levelNo: 19,
      type: 'attack',
      enemyScale: 2.7,
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 200, type: 7 },
        { timeOfEntry: 1.0, positionOfEntry: 700, type: 7 },
        { timeOfEntry: 2.0, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 3.0, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 4.0, positionOfEntry: 150, type: 6 },
        { timeOfEntry: 4.5, positionOfEntry: 750, type: 6 },
        { timeOfEntry: 5.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 6.0, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 7.0, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 8.0, positionOfEntry: 'random', type: 1 },
      ],
      amountOfItems: 8,
      amountOfObstacles: 6,
      rarity: 'legendary',
    }),

    // ── Niveau 20 : Boss final ──────────────────────────────
    new Level({
      levelNo: 20,
      type: 'boss',
      enemyScale: 3.0,
      enemies: [
        { timeOfEntry: 0.5, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 1.2, positionOfEntry: 'random', type: 4 },
        { timeOfEntry: 2.0, positionOfEntry: 'random', type: 1 },
        { timeOfEntry: 3.0, positionOfEntry: 450, type: 3 },
        { timeOfEntry: 6.0, positionOfEntry: 'random', type: 7 },
        { timeOfEntry: 8.0, positionOfEntry: 'random', type: 6 },
        { timeOfEntry: 10.0, positionOfEntry: 'random', type: 5 },
        { timeOfEntry: 12.0, positionOfEntry: 'random', type: 2 },
        { timeOfEntry: 14.0, positionOfEntry: 'random', type: 7 },
        { timeOfEntry: 16.0, positionOfEntry: 'random', type: 4 },
      ],
      amountOfItems: 10,
      amountOfObstacles: 4,
      rarity: 'legendary',
    }),
  ],
})

export default world1
