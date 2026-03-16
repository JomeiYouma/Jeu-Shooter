// Imports explicites des PNG ennemis pour Vite

import punkmotoIntact from '../assets/enemies/punkmoto_intact.png'
import punkmotoBroken from '../assets/enemies/punkmoto_broken.png'
import punkmotoDestroyed from '../assets/enemies/punkmoto_destroyed.png'

import armedcarIntact from '../assets/enemies/armedcar_intact.png'
import armedcarBroken from '../assets/enemies/armedcar_broken.png'
import armedcarDestroyed from '../assets/enemies/armedcar_destroyed.png'

import tankIntact from '../assets/enemies/tank_intact.png'
import tankBroken from '../assets/enemies/tank_broken.png'
import tankDestroyed from '../assets/enemies/tank_destroyed.png'

import helicopterIntact from '../assets/enemies/helicopter_intact.png'
import helicopterBroken from '../assets/enemies/helicopter_broken.png'
import helicopterDestroyed from '../assets/enemies/helicopter_destroyed.png'

export const enemyPngs = {
  punkmoto: {
    full: punkmotoIntact,
    damaged: punkmotoBroken,
    destroyed: punkmotoDestroyed,
  },
  armedcar: {
    full: armedcarIntact,
    damaged: armedcarBroken,
    destroyed: armedcarDestroyed,
  },
  tank: {
    full: tankIntact,
    damaged: tankBroken,
    destroyed: tankDestroyed,
  },
  helicopter: {
    full: helicopterIntact,
    damaged: helicopterBroken,
    destroyed: helicopterDestroyed,
  },
}
