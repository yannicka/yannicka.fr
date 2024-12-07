+++
title = "Bougies"
+++

# Bougies

Publié le 6 septembre 2021 par Aur36 sous licence CC BY-SA 4.0.

## Énoncé

ILS vous ont mis dans une pièce carrée, de `N` mètres de côté.

ILS veulent savoir tout de vous.

ILS vous observent.

ILS ont placé des bougies dans la pièce.

Chaque bougie octroie `L` de luminosité là où elles sont, et à chaque case
d'éloignement, la luminosité octroyée diminue de un.

Si un endroit est à la portée de deux bougies, il aura le maximum de luminosité
entre les deux. Chaque endroit a une luminosité de base de 0.

Vous pouvez vous cacher, seulement si vous trouver un endroit dont la luminosité
est nulle.

Combien de tels endroits se cachent ?

En entrée, vous aurez une carte de la pièce, avec `X` pour les cases vides et
`B` pour les bougies, chaque colonne étant séparée par un espace.

Exemple pour `N = 5` et `L = 3` :

```
X X X X X
X B X X X
X X X X X
X X X X X
X X X X X
```

```
2 2 2 1 0
2 3 2 1 0
2 2 2 1 0
1 1 1 1 0
0 0 0 0 0
```
