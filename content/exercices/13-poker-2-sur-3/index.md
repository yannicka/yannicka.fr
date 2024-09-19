+++
title = "Poker 2/3"
date = 2015-08-30
+++

## Énoncé

Bonjour, suite de l'épisode précédent !

Aujourd'hui, on ajoute 2 fonctionnalités à notre jeu de poker :

- L'IA peut se « coucher » si elle pense perdre ;
- Déterminer la main gagnante.

### IA logique

C'est lié à la seconde fonctionnalité qui est de deviner la main gagnante,
puisque si l'IA pense gagner elle ne va pas se coucher sinon elle se couche.

La logique exacte de se coucher n'est pas facile, il existe beaucoup de manière
de détrminer si l'on doit se coucher (logique, mathématique, probabiliste...).

Vous avez la liberté de choisir votre méthode, l'IA peut se coucher après
chaque distribution de carte sur la table. La solution peut varier, il n'y a
pas de bonne ou de mauvaise manière de faire.

Après-coup vous pouvez voir toute les cartes donc vous pouvez vous en servir
pour améliorer votre IA.

Main gagnante

On suit les régles du poker donc : http://fr.wikipedia.org/wiki/Main_au_poker

Donc quand toutes les cartes sont sur le terrain et que l'IA a décider ou non
de se coucher alors la meilleur main est désigné.

Pour l'exrcice il y aura 2 étapes pour voir qui a gagné, la première c'est le
gagnant, c'est à dire on compare les mains des IA et du joueur qui ne se sont
pas couchés, et en second la "meilleur main" qui compare tout les joueurs afin
de voir si votre IA tient la route.

### Entrée

Pareil que sur la partie 1

### Sortie

On rajoute le gagnant, la main gagnante et si les IA se sont couchés.

### Exemple

```text
How many players (2-8) ? 3

Your hand: 2 of Hearts, 8 of Spades
CPU 1: 4 of Hearts, 6 of Clubs
CPU 2: Jack of Diamonds, 10 of Hearts

Flop: 8 of Hearts, Jack of Spades, 10 of Clubs
CPU 1 Folds!
Turn: 5 of Hearts
River: 7 of Hearts

Winner: CPU 2. Two pair.
Best Hand: CPU 1. Straight.
```

### Prochainement

On a un jeu qui fonctionne, sans pari ni argent mais le jeu fonctionne ! Dans
la prochaine étape on simulera plein de parties :p

Amusez-vous bien !

## Travaux réalisés

Aucun. :(
