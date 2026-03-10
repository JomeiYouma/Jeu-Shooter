import { pick } from './constants.js'

// -- Rarity-weighted item picker --------------------------------
const BASE_RATES = { common: 54.25, rare: 25, epic: 12.5, legendary: 6.25, divine: 2 }

export function pickItemByRarity(itemList, talismanCount) {
  const t = Math.min(talismanCount, 10)
  const rates = {
    common:    Math.max(0, BASE_RATES.common - t * 4),
    rare:      BASE_RATES.rare + t * 1,
    epic:      BASE_RATES.epic + t * 1,
    legendary: BASE_RATES.legendary + t * 1,
    divine:    BASE_RATES.divine + t * 1,
  }
  const total = rates.common + rates.rare + rates.epic + rates.legendary + rates.divine
  let roll = Math.random() * total
  let chosenRarity = 'common'
  for (const r of ['common', 'rare', 'epic', 'legendary', 'divine']) {
    roll -= rates[r]
    if (roll <= 0) { chosenRarity = r; break }
  }
  const pool = itemList.filter(i => i.rarity === chosenRarity)
  if (pool.length === 0) return pick(itemList)
  return pick(pool)
}
