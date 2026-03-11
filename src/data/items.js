/**
 * ITEMS - Objets ramassables (add = ajoute, replace = remplace)
 */
import Item from '../classes/Item.js'
import itemA from '../assets/Items/item_a.png'
import itemC from '../assets/Items/item_c.png'
import itemD from '../assets/Items/item_d.png'
import itemE from '../assets/Items/item_e.png'
import itemF from '../assets/Items/item_f.png'
import itemG from '../assets/Items/item_g.png'
import itemH from '../assets/Items/item_h.png'
import itemJ from '../assets/Items/item_j.png'
import itemL from '../assets/Items/item_l.png'
import itemN from '../assets/Items/item_n.png'
import itemAmmo from '../assets/Items/item_ammo.png'
import itemHealth from '../assets/Items/item_health.png'
import itemSalve from '../assets/Items/item_salve.png'
import itemGrosCanon from '../assets/Items/item_gros_cannon.png'
import itemMachine from '../assets/Items/item_machine.png'
import itemStronger from '../assets/Items/item_stronger.png'
import itemStrafe from '../assets/Items/item_strafe.png'
import itemBrake from '../assets/Items/item_brake.png'
import item3 from '../assets/Items/item_3.png'
import itemDoubleCanon from '../assets/Items/item_double.png'
import itemWaller from '../assets/Items/item_waller.png'
import itemShamrock from '../assets/Items/item_shamrock.png'
import itemPill from '../assets/Items/item_pill.png'
import itemDual from '../assets/Items/item_dual.png'
import itemSpikes from '../assets/Items/item_spikes.png'
import itemDesintegrator from '../assets/Items/item_desintegrator.png'
import itemAura from '../assets/Items/item_aura.png'
import itemBazooka from '../assets/Items/item_bazooka.png'
import itemRebounce from '../assets/Items/item_rebounce.png'
import itemSnipe from '../assets/Items/item_snipe.png'
import itemHook from '../assets/Items/item_hook.png'
import itemBowl from '../assets/Items/item_bowl.png'

const PLAYER_WEAPONS = [0, 1, 2, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const EXTRA_WEAPONS = [23, 24]

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
    rarity: 'common',
    png: itemF,
  }),

  // [2] Blindage renforce - bouclier
  new Item({
    name: 'Blindage renforce',
    description: 'Restaure 1 point de bouclier (max 4).',
    type: 'add',
    usedVar: 'shieldForce',
    amount: 1,
    rarity: 'common',
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
    png: itemHealth,
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
    // [13] Laser - remplace l arme
  new Item({
    name: 'Laser',
    description: 'Remplace votre arme par un laser.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 13,
    rarity: 'epic',
    png: itemA,
  }),
      // [14] Gros canon - remplace l arme
  new Item({
    name: 'Gros canon',
    description: 'Remplace votre arme par un gros canon.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 14,
    rarity: 'rare',
    png: itemGrosCanon,
  }),
      // [15] Machine - remplace l arme
  new Item({
    name: 'Machine',
    description: 'Remplace votre arme par une machine.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 15,
    rarity: 'rare',
    png: itemMachine,
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
    png: itemAmmo,
  }),

  // [8] Munitions lourdes - degats
  new Item({
    name: 'Munitions lourdes',
    description: 'Augmente les degats de 1.',
    type: 'weaponStat',
    usedVar: 'damage',
    amount: 1,
    rarity: 'legendary',
    png: itemStronger,
  }),

  // [9] Balles larges
  new Item({
    name: 'Balles larges',
    description: 'Augmente la taille des balles de 2.',
    type: 'weaponStat',
    usedVar: 'bulletsSize',
    amount: 2,
    rarity: 'rare',
    png: itemSalve,
  }),

  // [10] Microchip avance - acceleration
  new Item({
    name: 'Microchip avance',
    description: 'Augmente l\'acceleration de 0.5.',
    type: 'add',
    usedVar: 'acceleration',
    amount: 0.5,
    rarity: 'epic',
    png: itemE,
  }),

  // [11] Retro-propulseur - vitesse arriere
  new Item({
    name: 'Retro-propulseur',
    description: 'Augmente la vitesse arriere de 30.',
    type: 'add',
    usedVar: 'maxBrakeSpeed',
    amount: 30,
    rarity: 'common',
    png: itemBrake,
  }),

  // [12] Ailerons lateraux - vitesse laterale
  new Item({
    name: 'Ailerons lateraux',
    description: 'Augmente la vitesse laterale de 30.',
    type: 'add',
    usedVar: 'maxSideSpeed',
    amount: 30,
    rarity: 'rare',
    png: itemStrafe,
  }),

  // [13] Eventail large (arme 16)
  new Item({
    name: 'Star-canon',
    description: 'Remplace votre arme par un eventail large (4 dir).',
    type: 'replace',
    usedVar: 'weapons',
    amount: 16,
    rarity: 'legendary',
    png: itemD,
  }),

  // [14] Eventail triple (arme 17)
  new Item({
    name: 'Tri-canon',
    description: 'Remplace votre arme par un eventail triple.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 17,
    rarity: 'legendary',
    png: item3,
  }),

  // [15] Double canon bis (arme 18)
  new Item({
    name: 'Super double canon',
    description: 'Remplace votre arme par un double canon amélioré.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 18,
    rarity: 'epic',
    png: itemDoubleCanon,
  }),

  // [16] Phase waller (arme 19)
  new Item({
    name: 'Phase waller',
    description: 'Remplace votre arme par un phase waller.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 19,
    rarity: 'epic',
    png: itemWaller,
  }),

  // [17] Pointes de coque - degats contact
  new Item({
    name: 'Pointes métalliques',
    description: 'Augmente les degats de contact de 2.',
    type: 'add',
    usedVar: 'contactDamage',
    amount: 2,
    rarity: 'rare',
    png: itemSpikes,
  }),

  // [18] Arme aleatoire - remplace
  new Item({
    name: 'Arme aleatoire',
    description: 'Remplace votre arme par une arme au hasard.',
    type: 'replaceRandomWeapon',
    usedVar: 'weapons',
    amount: PLAYER_WEAPONS,
    rarity: 'rare',
    png: itemPill,
  }),

  // [19] Arme supplementaire - ajoute
  new Item({
    name: 'Arme supplementaire',
    description: 'Ajoute une arme au hasard a votre arsenal.',
    type: 'addRandomWeapon',
    usedVar: 'weapons',
    amount: PLAYER_WEAPONS,
    rarity: 'legendary',
    png: itemDual,
  }),

  // [19] Arme supplementaire - ajoute
  new Item({
    name: 'Arme supplementaire',
    description: 'Ajoute une arme au hasard a votre arsenal.',
    type: 'addRandomWeapon',
    usedVar: 'weapons',
    amount: PLAYER_WEAPONS,
    rarity: 'divine',
    png: itemDual,
  }),

  // [20] Talisman - ameliore la chance
  new Item({
    name: 'Talisman',
    description: 'Ameliore vos chances de trouver des items rares (max 10).',
    type: 'add',
    usedVar: 'talismanCount',
    amount: 1,
    rarity: 'common',
    png: itemShamrock,
  }),

  // [21] Gros calibre (arme 20)
  new Item({
    name: 'Gros calibre',
    description: 'Remplace votre arme par un gros calibre.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 20,
    rarity: 'rare',
    png: itemL,
  }),

  // [22] Désintégrateur (arme 21)
  new Item({
    name: 'Champ de répulsion',
    description: 'Inflige des dégats modérés aux ennemis autour de vous.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 21,
    rarity: 'legendary',
    png: itemAura,
    
  }),
  // [22] Désintégrateur (arme 21)
  new Item({
    name: 'Désintégrateur',
    description: 'Remplace votre arme par le désintégrateur.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 22,
    rarity: 'divine',
    png: itemDesintegrator,
  }),
    // [23] Rebond simple - remplace l'arme
    new Item({
      name: 'Lance-grenade rebondissantes',
      description: 'Remplace votre arme par un tir rebondissant.',
      type: 'replace',
      usedVar: 'weapons',
      amount: 23,
      rarity: 'rare',
      png: itemBowl,
    }),
    // [24] Guidage simple - remplace l'arme
    new Item({
      name: 'Fusil à têtes chercheuses',
      description: 'Remplace votre arme par un tir téléguidé.',
      type: 'replace',
      usedVar: 'weapons',
      amount: 24,
      rarity: 'epic',
      png: itemSnipe,
    }),

  // [23] Rebond - ajoute 1 rebond à une arme au hasard
  new Item({
    name: 'Module de ricochet',
    description: 'Les balles d\'une arme au hasard rebondissent +1 fois.',
    type: 'weaponStat',
    usedVar: 'bounce',
    amount: 1,
    rarity: 'rare',
    png: itemRebounce,
  }),

  // [24] Heading - ajoute le guidage à une arme au hasard
  new Item({
    name: 'Module de guidage',
    description: 'Une arme au hasard tire des balles téléguidées.',
    type: 'weaponStat',
    usedVar: 'headed',
    amount: 1,
    rarity: 'epic',
    png: itemHook,
  }),

    // [25] Heading - ajoute le guidage à une arme au hasard
  new Item({
    name: 'Bazooka mitrailleur',
    description: 'Lourd canon militaire sous zaza.',
    type: 'replace',
    usedVar: 'weapons',
    amount: 25,
    rarity: 'divine',
    png: itemBazooka,
  }),
]

export default items
