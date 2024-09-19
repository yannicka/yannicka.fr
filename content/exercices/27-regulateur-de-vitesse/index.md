+++
title = "Régulateur de vitesse"
date = 2021-09-13
author = "Aur36"
+++

## Énoncé

Vous entrez sur une portion de route et vous comptez vous reposer entièrement
sur votre régulateur de vitesse pour traverser la zone sans devoir vous arrêter
ni ralentir.

L'objectif est de trouver la vitesse maximale (hors excès de vitesse) qui vous
permettra de franchir tous les feux au vert.

Attention : vous ne pouvez pas franchir un feu à la seconde où il passe au
rouge !

Votre véhicule entre directement dans la zone à la vitesse programmée sur le
régulateur et ce dernier veille à ce qu'elle ne change plus par la suite.

Votre programme recevra en entrée :

Un entier pour la vitesse maximale autorisée sur la portion de route (en km/h).
Un entier `n` pour le nombre de feu de circulation sur la route.

Puis, les `n` prochaines lignes :

- Un entier représentant la distance du feu par rapport au point de départ (en
  mètre).
- Un entier `d` représentant la durée du feu sur chaque couleur.

Un feu alterne une période de `d` secondes au vert puis `d` secondes au rouge.
Tous les feux passent au vert en même temps dès votre entrée dans la zone.

En sortie, la vitesse entière (km/h) la plus élevée possible qui permet de
franchir tous les feux au vert sans commettre d'excès de vitesse.
