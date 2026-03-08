/**
 * ITEMS - Objets ramassables (add = ajoute, replace = remplace)
 */
import Item from '../classes/Item.js'

const items = [
  // [0] Kit de reparation - heal
  new Item({
    name: 'Kit de reparation',
    description: 'Restaure 3 PV.',
    type: 'add',
    usedVar: 'healthPoints',
    amount: 3,
    rarity: 'common',
    png: null,
  }),

  // [1] Turbo Engine - vitesse
  new Item({
    name: 'Turbo Engine',
    description: 'Augmente la vitesse max de 30.',
    type: 'add',
    usedVar: 'maxSpeed',
    amount: 30,
    rarity: 'rare',
    png: null,
  }),

  // [2] Blindage renforce - bouclier
  new Item({
    name: 'Blindage renforce',
    description: 'Restaure 1 point de bouclier (max 4).',
    type: 'add',
    usedVar: 'shieldForce',
    amount: 1,
    rarity: 'epic',
    png: null,
  }),

  // [3] Coeur de cristal - maxHealth
  new Item({
    name: 'Coeur de cristal',
    description: 'Augmente la sante max de 3.',
    type: 'add',
    usedVar: 'maxHealth',
    amount: 3,
    rarity: 'rare',
    png: null,
  }),

  // [4] Double Canon - remplace l arme
  new Item({
    name: 'Double Canon',
    description: 'Remplace votre arme par un double canon.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 1,
    rarity: 'rare',
    png: null,
  }),

  // [5] Cone de feu - remplace l arme
  new Item({
    name: 'Cone de feu',
    description: 'Remplace votre arme par un cone de feu.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 2,
    rarity: 'epic',
    png: null,
  }),

  // [6] Cadence amelioree - reduit le cooldown
  new Item({
    name: 'Cadence amelioree',
    description: 'Reduit le temps de recharge de 50ms.',
    type: 'weaponStat',
    usedVar: 'cooldownTime',
    amount: -50,
    rarity: 'rare',
    png: null,
  }),

  // [7] Salve supplementaire
  new Item({
    name: 'Salve supplementaire',
    description: 'Ajoute 1 tir par salve.',
    type: 'weaponStat',
    usedVar: 'bulletsPerSalve',
    amount: 1,
    rarity: 'epic',
    png: null,
  }),

  // [8] Munitions lourdes - degats
  new Item({
    name: 'Munitions lourdes',
    description: 'Augmente les degats de 1.',
    type: 'weaponStat',
    usedVar: 'damage',
    amount: 1,
    rarity: 'epic',
    png: null,
  }),

  // [9] Balles larges
  new Item({
    name: 'Balles larges',
    description: 'Augmente la taille des balles de 2.',
    type: 'weaponStat',
    usedVar: 'bulletsSize',
    amount: 2,
    rarity: 'common',
    png: null,
  }),
]

export default items
