# Signification des signes :
#   + = ajout
#   - = suppression
#   o = modification

Futur
=====
  + Clignotement du joueur lorsqu'il est touché par un zombie durant 2 secondes afin de montrer son "invincibilité"
  + Différents types d'armes :
      pistolet de base : balles infinies
      mitraillette : X balles 
      fusil à pompe : X balles
  + Différents type de zombies :
      zombie de base : fonce dans les murs
      zombie kamikaze : explose lors d'un impact
      zombie intelligent : évite les murs
  + Un but au jeu, exemples :
      sortir du batîment
      tuer tout les zombies
      survivre le plus longtemps possible :
        jauge de vie
        jauge de faim et/ou soif
  o Collision joueur <-> murs
  o Collision zombies <-> murs
  o Optimiser le code
  o Le tir sort du pistolet du joueur (permettra de réparer le bug empêchant de tirer lorsque nous somme coller à un mur haut)

008
===
  + Animation du joueur (effet de pas)
  o Point de focus zombies -> joueur (joueur(x; y) -> joueur(middleX; middleY))
  o Baisse du temps d'invincibilité (5 secondes -> 2 secondes)
  o Amélioration de l'apparence du joueur
  o Amélioration de l'apparence des zombies
  o Les zombies acquièrent une vitesse aléatoire à leur création (2 -> Math.random() * 2 + 1)
  o Optimisation du code

007
===
  + Collision zombies <-> zombies
  + Création du changelog pour permettre un suivi précis de l'avancement du jeu
  o Amélioration de l'apparence du joueur
  o Amélioration de l'apparence des zombies
  o Amélioration de l'apparence du décor

006
===
  o Amélioration de l'apparence du décor
  o Spawn des zombies en des lieux définis par rgb(0, 0, 255) (coins du jeu -> rgb(0, 0, 255))
  o Ralentissement de la vitesse de la balle

005
===
  + Collision balles <-> murs (= disparition de la balle)
  o Collision joueur <-> murs (joueur bloqué)
  o Collision zombies <-> murs (zombies bloqués)
  o Fusion du canvas d'affichage de décor avec celui de l'affichage du jeu
  o Optimisation du code

004
===
  + Apparence du décor
  o Optimisation du code pour plus de fluidité

003
===
  + Collision joueur <-> murs (joueur bloqué)
  + Collision zombies <-> murs (zombies bloqués)

002
===
  + Caméra

001
===
  + Création du jeu
