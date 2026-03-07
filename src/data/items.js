/**
 * ITEMS - Objets ramassables
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
    description: 'Ajoute 1 point de bouclier.',
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
]

export default items
