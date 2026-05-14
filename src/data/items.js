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
import itemEngineImg from '../assets/Items/item_engine.png'
import itemFuelImg from '../assets/Items/item_fuel.png'

const PLAYER_WEAPONS = [0, 1, 2, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const EXTRA_WEAPONS = [23, 24]

const items = [
  // [0] Kit de reparation - heal
  new Item({
    name: 'Kit de reparation',
    nameKey: 'game.items.repair_kit.name',
    description: 'Restaure 3 PV',
    descriptionKey: 'game.items.repair_kit.desc',
    type: 'add',
    usedVar: 'healthPoints',
    amount: 3,
    rarity: 'common',
    png: itemH,
  }),

  // [1] Turbo Engine - vitesse
  new Item({
    name: 'Moteur forge',
    nameKey: 'game.items.engine.name',
    description: 'Vitesse max +30',
    descriptionKey: 'game.items.engine.desc',
    type: 'add',
    usedVar: 'maxSpeed',
    amount: 30,
    rarity: 'common',
    png: itemF,
  }),

  // [2] Booster turbo
  new Item({
    name: 'Booster turbo',
    nameKey: 'game.items.turbo_booster.name',
    description: 'Temps de turbo + 0.2s',
    descriptionKey: 'game.items.turbo_booster.desc',
    type: 'add',
    usedVar: 'turboBarDuration',
    amount: 0.2,
    rarity: 'rare',
    png: itemEngineImg,
  }),

  // [3] Nitro - Refill Turbo (detecte dans physics.js via usedVar === '_dummy_fuel')
  new Item({
    name: 'Nitro',
    nameKey: 'game.items.nitro.name',
    description: 'Restaure tout le turbo',
    descriptionKey: 'game.items.nitro.desc',
    type: 'add',
    usedVar: '_dummy_fuel',
    amount: 0,
    rarity: 'common',
    png: itemFuelImg,
  }),

  // [4] Plaque de blindage - bouclier
  new Item({
    name: 'Plaque de blindage',
    nameKey: 'game.items.armor_plate.name',
    description: '+1 bouclier - max 4',
    descriptionKey: 'game.items.armor_plate.desc',
    type: 'add',
    usedVar: 'shieldForce',
    amount: 1,
    rarity: 'common',
    png: itemC,
  }),

  // [5] Blindage renforce - maxHealth
  new Item({
    name: 'Blindage renforce',
    nameKey: 'game.items.reinforced_armor.name',
    description: '+3 PV max',
    descriptionKey: 'game.items.reinforced_armor.desc',
    type: 'add',
    usedVar: 'maxHealth',
    amount: 3,
    rarity: 'rare',
    png: itemHealth,
  }),

  // [6] Double Canon
  new Item({
    name: 'Double Canon',
    nameKey: 'game.items.double_cannon.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 1,
    rarity: 'rare',
    png: itemN,
  }),

  // [7] Cone de feu
  new Item({
    name: 'Cone de feu',
    nameKey: 'game.items.fire_cone.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 2,
    rarity: 'epic',
    png: itemJ,
  }),

  // [8] Laser
  new Item({
    name: 'Laser',
    nameKey: 'game.items.laser.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 13,
    rarity: 'epic',
    png: itemA,
  }),

  // [9] Gros canon
  new Item({
    name: 'Gros canon',
    nameKey: 'game.items.heavy_cannon.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 14,
    rarity: 'rare',
    png: itemGrosCanon,
  }),

  // [10] Mitrailleuse
  new Item({
    name: 'Mitrailleuse',
    nameKey: 'game.items.machine_gun.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 15,
    rarity: 'rare',
    png: itemMachine,
  }),

  // [11] Cadence amelioree
  new Item({
    name: 'Cadence amelioree',
    nameKey: 'game.items.fire_rate.name',
    description: 'Temps de recharge -50ms',
    descriptionKey: 'game.items.fire_rate.desc',
    type: 'weaponStat',
    usedVar: 'cooldownTime',
    amount: -50,
    rarity: 'rare',
    png: itemG,
  }),

  // [12] Salve supplementaire
  new Item({
    name: 'Salve supplementaire',
    nameKey: 'game.items.extra_burst.name',
    description: '+1 tir par salve',
    descriptionKey: 'game.items.extra_burst.desc',
    type: 'weaponStat',
    usedVar: 'bulletsPerSalve',
    amount: 1,
    rarity: 'epic',
    png: itemAmmo,
  }),

  // [13] Munitions lourdes
  new Item({
    name: 'Munitions lourdes',
    nameKey: 'game.items.heavy_ammo.name',
    description: '+1 degat par balle',
    descriptionKey: 'game.items.heavy_ammo.desc',
    type: 'weaponStat',
    usedVar: 'damage',
    amount: 1,
    rarity: 'legendary',
    png: itemStronger,
  }),

  // [14] Balles larges
  new Item({
    name: 'Balles larges',
    nameKey: 'game.items.wide_bullets.name',
    description: '+2 taille des balles',
    descriptionKey: 'game.items.wide_bullets.desc',
    type: 'weaponStat',
    usedVar: 'bulletsSize',
    amount: 2,
    rarity: 'rare',
    png: itemSalve,
  }),

  // [15] Microchip avance
  new Item({
    name: 'Microchip avance',
    nameKey: 'game.items.microchip.name',
    description: '+0.5 acceleration',
    descriptionKey: 'game.items.microchip.desc',
    type: 'add',
    usedVar: 'acceleration',
    amount: 0.5,
    rarity: 'epic',
    png: itemE,
  }),

  // [16] Retro-propulseur
  new Item({
    name: 'Retro-propulseur',
    nameKey: 'game.items.retro_thruster.name',
    description: 'Vitesse de recul +30',
    descriptionKey: 'game.items.retro_thruster.desc',
    type: 'add',
    usedVar: 'maxBrakeSpeed',
    amount: 30,
    rarity: 'common',
    png: itemBrake,
  }),

  // [17] Ailerons lateraux
  new Item({
    name: 'Ailerons lateraux',
    nameKey: 'game.items.side_fins.name',
    description: 'Vitesse laterale +30',
    descriptionKey: 'game.items.side_fins.desc',
    type: 'add',
    usedVar: 'maxSideSpeed',
    amount: 30,
    rarity: 'rare',
    png: itemStrafe,
  }),

  // [18] Star-canon
  new Item({
    name: 'Star-canon',
    nameKey: 'game.items.star_cannon.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 16,
    rarity: 'legendary',
    png: itemD,
  }),

  // [19] Tri-canon
  new Item({
    name: 'Tri-canon',
    nameKey: 'game.items.tri_cannon.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 17,
    rarity: 'legendary',
    png: item3,
  }),

  // [20] Super double canon
  new Item({
    name: 'Super double canon',
    nameKey: 'game.items.super_double_cannon.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 18,
    rarity: 'epic',
    png: itemDoubleCanon,
  }),

  // [21] Phase waller
  new Item({
    name: 'Phase waller',
    nameKey: 'game.items.phase_waller.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 19,
    rarity: 'epic',
    png: itemWaller,
  }),

  // [22] Pointes metalliques
  new Item({
    name: 'Pointes metalliques',
    nameKey: 'game.items.metal_spikes.name',
    description: 'Degats de contact +2',
    descriptionKey: 'game.items.metal_spikes.desc',
    type: 'add',
    usedVar: 'contactDamage',
    amount: 2,
    rarity: 'rare',
    png: itemSpikes,
  }),

  // [23] Arme aleatoire - remplace
  new Item({
    name: 'Arme aleatoire',
    nameKey: 'game.items.random_weapon.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replaceRandomWeapon',
    usedVar: 'weapons',
    amount: PLAYER_WEAPONS,
    rarity: 'rare',
    png: itemPill,
  }),

  // [24] Arme supplementaire - legendary
  // NOTE : volontairement dupliquee avec [25] mais avec une rarete differente
  //        (legendary vs divine) — donc taux de drop different selon la table de loot.
  new Item({
    name: 'Arme supplementaire',
    nameKey: 'game.items.extra_weapon.name',
    description: 'Ajoute une arme au hasard',
    descriptionKey: 'game.items.extra_weapon.desc',
    type: 'addRandomWeapon',
    usedVar: 'weapons',
    amount: PLAYER_WEAPONS,
    rarity: 'legendary',
    png: itemDual,
  }),

  // [25] Arme supplementaire - divine
  // NOTE : doublon volontaire de [24] avec rarete superieure — voir commentaire ci-dessus.
  new Item({
    name: 'Arme supplementaire',
    nameKey: 'game.items.extra_weapon.name',
    description: 'Ajoute une arme au hasard',
    descriptionKey: 'game.items.extra_weapon.desc',
    type: 'addRandomWeapon',
    usedVar: 'weapons',
    amount: PLAYER_WEAPONS,
    rarity: 'divine',
    png: itemDual,
  }),

  // [26] Talisman
  new Item({
    name: 'Talisman',
    nameKey: 'game.items.talisman.name',
    description: '+10% chance de trouver des items rares',
    descriptionKey: 'game.items.talisman.desc',
    type: 'add',
    usedVar: 'talismanCount',
    amount: 1,
    rarity: 'common',
    png: itemShamrock,
  }),

  // [27] Gros calibre
  new Item({
    name: 'Gros calibre',
    nameKey: 'game.items.large_caliber.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 20,
    rarity: 'rare',
    png: itemL,
  }),

  // [28] Champ de repulsion
  new Item({
    name: 'Champ de repulsion',
    nameKey: 'game.items.repulsion_field.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 21,
    rarity: 'legendary',
    png: itemAura,
  }),

  // [29] Desintegrator
  new Item({
    name: 'Desintegrateur',
    nameKey: 'game.items.disintegrator.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 22,
    rarity: 'divine',
    png: itemDesintegrator,
  }),

  // [30] Lance-grenades rebondissantes
  new Item({
    name: 'Lance-grenades rebondissantes',
    nameKey: 'game.items.bounce_launcher.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 23,
    rarity: 'rare',
    png: itemBowl,
  }),

  // [31] Fusil a tetes chercheuses
  new Item({
    name: 'Fusil a tetes chercheuses',
    nameKey: 'game.items.homing_rifle.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 24,
    rarity: 'epic',
    png: itemSnipe,
  }),

  // [32] Module de ricochet
  new Item({
    name: 'Module de ricochet',
    nameKey: 'game.items.ricochet_module.name',
    description: '+1 ricochet',
    descriptionKey: 'game.items.ricochet_module.desc',
    type: 'weaponStat',
    usedVar: 'bounce',
    amount: 1,
    rarity: 'rare',
    png: itemRebounce,
  }),

  // [33] Module de guidage
  new Item({
    name: 'Module de guidage',
    nameKey: 'game.items.guidance_module.name',
    description: 'Tirs teleguides',
    descriptionKey: 'game.items.guidance_module.desc',
    type: 'weaponStat',
    usedVar: 'headed',
    amount: 1,
    rarity: 'epic',
    png: itemHook,
  }),

  // [34] Bazooka mitrailleur
  new Item({
    name: 'Bazooka mitrailleur',
    nameKey: 'game.items.bazooka.name',
    description: 'Remplace votre arme',
    descriptionKey: 'game.items.replaces_weapon.desc',
    type: 'replace',
    usedVar: 'weapons',
    amount: 25,
    rarity: 'divine',
    png: itemBazooka,
  }),
]

export default items
