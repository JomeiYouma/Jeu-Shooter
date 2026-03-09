/**
 * ITEMS - Objets ramassables (add = ajoute, replace = remplace)
 */
import Item from '../classes/Item.js'
import itemA from '../assets/Items/item_a.png'
import itemB from '../assets/Items/item_b.png'
import itemC from '../assets/Items/item_c.png'
import itemD from '../assets/Items/item_d.png'
import itemE from '../assets/Items/item_e.png'
import itemF from '../assets/Items/item_f.png'
import itemG from '../assets/Items/item_g.png'
import itemH from '../assets/Items/item_h.png'
import itemI from '../assets/Items/item_i.png'
import itemJ from '../assets/Items/item_j.png'
import itemJ from '../assets/Items/item_k.png'
import itemL from '../assets/Items/item_l.png'
import itemM from '../assets/Items/item_m.png'
import itemN from '../assets/Items/item_n.png'
import itemO from '../assets/Items/item_o.png'
import itemP from '../assets/Items/item_p.png'
const items = [
  // [0] Kit de reparation - heal
  new Item({
    name: 'Kit de reparation',
    description: 'Restaure 3 PV.',
    type: 'add',
    usedVar: 'healthPoints',
    amount: 3,
    rarity: 'common',
    png: itemH,
  }),

  // [1] Turbo Engine - vitesse
  new Item({
    name: 'Turbo Engine',
    description: 'Augmente la vitesse max de 30.',
    type: 'add',
    usedVar: 'maxSpeed',
    amount: 30,
    rarity: 'rare',
    png: itemF,
  }),

  // [2] Blindage renforce - bouclier
  new Item({
    name: 'Blindage renforce',
    description: 'Restaure 1 point de bouclier (max 4).',
    type: 'add',
    usedVar: 'shieldForce',
    amount: 1,
    rarity: 'epic',
    png: itemC,
  }),

  // [3] Coeur de cristal - maxHealth
  new Item({
    name: 'Coeur de cristal',
    description: 'Augmente la sante max de 3.',
    type: 'add',
    usedVar: 'maxHealth',
    amount: 3,
    rarity: 'rare',
    png: itemI,
  }),

  // [4] Double Canon - remplace l arme
  new Item({
    name: 'Double Canon',
    description: 'Remplace votre arme par un double canon.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 1,
    rarity: 'rare',
    png: itemN,
  }),

  // [5] Cone de feu - remplace l arme
  new Item({
    name: 'Cone de feu',
    description: 'Remplace votre arme par un cone de feu.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 2,
    rarity: 'epic',
    png: itemJ,
  }),

  // [6] Cadence amelioree - reduit le cooldown
  new Item({
    name: 'Cadence amelioree',
    description: 'Reduit le temps de recharge de 50ms.',
    type: 'weaponStat',
    usedVar: 'cooldownTime',
    amount: -50,
    rarity: 'rare',
    png: itemG,
  }),

  // [7] Salve supplementaire
  new Item({
    name: 'Salve supplementaire',
    description: 'Ajoute 1 tir par salve.',
    type: 'weaponStat',
    usedVar: 'bulletsPerSalve',
    amount: 1,
    rarity: 'epic',
    png: itemP,
  }),

  // [8] Munitions lourdes - degats
  new Item({
    name: 'Munitions lourdes',
    description: 'Augmente les degats de 1.',
    type: 'weaponStat',
    usedVar: 'damage',
    amount: 1,
    rarity: 'epic',
    png: itemO,
  }),

  // [9] Balles larges
  new Item({
    name: 'Balles larges',
    description: 'Augmente la taille des balles de 2.',
    type: 'weaponStat',
    usedVar: 'bulletsSize',
    amount: 2,
    rarity: 'common',
    png: itemE,
  }),
]

export default items
