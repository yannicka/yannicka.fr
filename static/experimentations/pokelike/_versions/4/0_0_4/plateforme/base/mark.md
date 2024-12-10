# Codes
  Code jeu | Code .lvl | Français | Description
  -----------------------------------------------------------------------------------------------------------------------
           | (P)layer  | Joueur   | Humain
  1        | (#)       | Mur      | Bloque le joueur
  2345     | (<^>v)    | Flèches  | Change la gravité du joueur
  6        | (D)oor    | Porte    | Permet au joueur de débloquer le niveau suivant en appuyant sur entrée si il a la clé
  7        | (K)ey     | Clé      | Permet d'ouvrir la porte
  8        | (L)ove    | Coeur    | Permet d'avoir une vie supplémentaire

# Transition de scène
    scène actuelle   changement de scène   nouvelle scène
  ░░░░░░▒▒▒▒▒▒▓▓▓▓▓▓█████████████████████▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░
                                         ^
                                         |- on

  ^
  |- Plus d'effacement de la scène ni de redessinnement, seul une couche de noir s'ajoute

# Etats de jeu
  Menu : menu
  Jeu  : game

load() // charge les images
  |
  v
init() // initialise le jeu
  |
  v
create() // créer le jeu
  |
  v
update() <-> draw()
