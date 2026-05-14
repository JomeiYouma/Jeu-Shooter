import i18next from '../i18n.js'

/**
 * Résout le nom traduit d'un item, arme, ennemi ou monde.
 * Utilise nameKey si disponible, sinon fallback sur name.
 * @param {object} obj — instance avec { nameKey?, name }
 * @returns {string}
 */
export function getLocalizedName(obj) {
  if (obj && obj.nameKey) return i18next.t(obj.nameKey, { defaultValue: obj.name })
  return obj ? obj.name : ''
}

/**
 * Résout la description traduite d'un item ou arme.
 * Utilise descriptionKey si disponible, sinon fallback sur description.
 * @param {object} obj — instance avec { descriptionKey?, description }
 * @returns {string}
 */
export function getLocalizedDescription(obj) {
  if (obj && obj.descriptionKey) return i18next.t(obj.descriptionKey, { defaultValue: obj.description })
  return obj ? obj.description : ''
}
