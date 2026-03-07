/**
 * ═══════════════════════════════════════════════════════════════
 *  JOUEUR  —  Stats par défaut du vaisseau
 * ═══════════════════════════════════════════════════════════════
 *
 *  Configuration initiale du joueur au début d'une partie.
 *
 *  | Propriété      | Type     | Description                                           |
 *  |----------------|----------|-------------------------------------------------------|
 *  | acceleration   | number   | Réactivité (Microchip)                                |
 *  | weapons        | array    | Liste d'index des armes équipées (réf. weapons.js)    |
 *  | shieldForce    | number   | Réduction de dégâts (Bodywork)                        |
 *  | healthPoints   | number   | PV de départ                                          |
 *  | maxHealth      | number   | PV maximum                                            |
 *  | contactDamage  | number   | Dégâts au contact (Spikes)                            |
 *  | maxSpeed       | number   | Vitesse avant max (Engine)                            |
 *  | maxSideSpeed   | number   | Vitesse latérale max (Sterwheel)                      |
 *  | maxBrakeSpeed  | number   | Vitesse de freinage max (Sterwheel)                   |
 *  | immunityTime   | number   | Durée d'invulnérabilité (ms)                          |
 *  | width          | number   | Largeur du sprite (px)                                |
 *  | height         | number   | Hauteur du sprite (px)                                |
 *  | png            | object   | { full, damaged, destroyed }                          |
 */
import Player from '../classes/Player.js'

const defaultPlayer = new Player({
  acceleration: 1,
  weapons: [0],             // index de l'arme dans weapons.js
  shieldForce: 0,
  healthPoints: 10,
  maxHealth: 10,
  contactDamage: 0,
  maxSpeed: 200,
  maxSideSpeed: 150,
  maxBrakeSpeed: 100,
  immunityTime: 1000,
  width: 48,
  height: 48,
  png: { full: null, damaged: null, destroyed: null },
})

export default defaultPlayer
