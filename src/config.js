/**
 * OPTIONS DE JEU — modifie ces valeurs (0 ou 1) pour changer le comportement.
 */

/**
 * REPLACE_ALL_WEAPONS
 *  1 = quand on ramasse une arme de remplacement, ça remplace TOUTES les armes équipées.
 *  0 = ça ne remplace que la première arme (les autres restent).
 */
export const REPLACE_ALL_WEAPONS = 0

/**
 * WEAPON_MODIFIERS_SHARED
 *  1 = les modificateurs d'arme (dégâts, cadence, taille…) sont partagés :
 *      quand on change d'arme, les modifs restent sur la table globale (persistent d'une arme à l'autre).
 *  0 = les modificateurs sont indépendants par arme :
 *      quand on change d'arme, les anciennes modifs sont perdues (l'arme reprend ses stats par défaut).
 */
export const WEAPON_MODIFIERS_SHARED = 1

/**
 * KEYBOARD_MOVEMENT
 *  1 = déplacement au clavier (Z/Q/S/D ou flèches directionnelles) + espace pour tirer.
 *  0 = déplacement à la souris (curseur) + clic pour tirer.
 */
export const KEYBOARD_MOVEMENT = 1

/**
 * BOUNCE_HEADED_APPLY_ALL_WEAPONS
 *  1 = les modules "rebond" et "guidage" s'appliquent à TOUTES les armes équipées simultanément.
 *  0 = ils s'appliquent à une seule arme au hasard (comportement original).
 */
export const BOUNCE_HEADED_APPLY_ALL_WEAPONS = 0
