# 🔫 Custom 2D Shooter Component

Un moteur de jeu de tir 2D hautement personnalisable et configurable, conçu comme un composant **React** robuste utilisant **JavaScript**. Traversez des niveaux, collectez des items et éliminez vos ennemis pour atteindre la victoire.

---

## 🇫🇷 Français

### 📝 Description
Ce projet est un composant React polyvalent qui permet d'intégrer un shooter 2D dans n'importe quelle application web. Entièrement piloté par la configuration, vous pouvez modifier les types d'ennemis, les loots et les propriétés des niveaux via des simples objets JSON ou des props.

### 🎮 Gameplay
* **Mouvement** : Navigation fluide dans l'environnement 2D.
* **Combat** : Système de tir pour éliminer les vagues d'ennemis.
* **Objectifs** : Récupérer des items spécifiques pour débloquer la progression et atteindre la fin du niveau.

### ⚙️ Personnalisation
Le composant accepte une prop `config` permettant de définir :
* Les statistiques du joueur (vitesse, points de vie, cadence de tir).
* Le comportement des ennemis (IA de base, points de vie, dégâts).
* La table de loot (fréquence d'apparition des items).
* Les assets visuels (sprites, arrière-plans).

### 🚀 Utilisation
1. Installez les dépendances : `npm install`
2. Importez le composant :
   ```javascript
   import { ShooterGame } from './components/ShooterGame';
