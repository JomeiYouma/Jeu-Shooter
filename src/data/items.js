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
]

export default items
