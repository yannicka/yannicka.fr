+++
title = "Des flèches"
date = 2015-01-12
+++

## Enoncé

Bonjour à tous,

Comme le précédent défi était apparemment beaucoup trop simple, on va faire un
truc un peu plus costaud !

Voici la grille de jeu :

```text
v<^><>>v><>^<>vvv^^>
>^<>^<<v<>>^v^v><^<<
v^^>>>>>><v^^<^vvv>v
^^><v<^^<^<^^>>>v>v>
^<>vv^><>^<^^<<^^><v
^vv<<<><>>>>^<>^^^v^
^<^^<^>v<v^<>vv<^v<>
v<>^vv<^>vv>v><v^>^^
>v<v><^><<v>^^>>^<>^
^v<>^<>^>^^^vv^v>>^<
v>v^^<>><<<^^><^vvv^
```

Imaginez que tous ces signes représentent des flèches qui pointent sur la
cellule suivante. Par exemple `v` pointe vers le bas, `<` vers la gauche, `>`
vers la droite et `^` vers le haut.

Imaginez aussi que la grille est infinie, donc si un `<` est tout à droite
alors il pointe sur le signe tout à gauche.

Maintenant imaginez (oui, encore !) que les flèches vous font suivre un chemin,
donc par exemple si on part de tout en haut à gauche, il y a `v` donc on
descend sur `>` qui nous fait aller sur `^` qui fait aller sur `<` et d'où on
repart sur le `v` du début. Cela forme une boucle. Et vu que la grille est
infinie un truc comme :

```text
>>>>>>>>>>>>
```

est aussi une boucle, ou bien :

```text
^^>
>^^
^>^
```

C'est bon vous avez compris le principe ?

Donc si vous avez un peu suivi, votre défi aujourd'hui est de trouver la plus
grande boucle possible.

Un point important : la longueur du cycle est juste la partie qui se répète
donc :

```text
>>v
^<<
 ^
 ^
 ^
 ^
```

La longueur de la boucle n'est que de 6 puisqu'on ne garde que la partie qui se
répète.

### Entrée

Le tableau à étudier.

### Sortie

La longueur de la chaîne et si possible la représentation de cette chaîne.

### Exemple

Entrée :

```text
>>>>v
^v<<v
^vv^v
^>>v<
^<<<^
```

Sortie :

Cycle le plus long de : 16

```text
>>>>v
^   v
^   v
^  v<
^<<<
```

+++-------

Entrée :

```text
^^v>>v^>>v<<<v>v<>>>>>>>>^vvv^^vvvv<v^^><^^v>
>><<>vv<><<<^><^<^v^^<vv>>^v<v^vv^^v<><^>><v<
vv<^v<v<v<vvv>v<v<vv<^<v<<<<<<<<^<><>^><^v>>>
<v<v^^<v<>v<>v<v<^v^>^<^<<v>^v><^v^>>^^^<><^v
^>>>^v^v^<>>vvv>v^^<^<<<><>v>>^v<^^<>v>>v<v>^
^^^<<^<^>>^v>>>>><>>^v<^^^<^^v^v<^<v^><<^<<<>
v<>v^vv^v<><^>v^vv>^^v^<>v^^^>^>vv<^<<v^<<>^v
<<<<<^<vv<^><>^^>>>^^^^<^<^v^><^v^v>^vvv>^v^^
<<v^<v<<^^v<>v>v^<<<<<>^^v<v^>>>v^><v^v<v^^^<
^^>>^<vv<vv<>v^<^<^^><><^vvvv<<v<^<<^>^>vv^<v
^^v^>>^>^<vv^^<>>^^v>v>>v>>v^vv<vv^>><>>v<<>>
^v<^v<v>^^<>>^>^>^^v>v<<<<<>><><^v<^^v><v>^<<
v>v<><^v<<^^<^>v>^><^><v^><v^^^>><^^<^vv^^^>^
v><>^><vv^v^^>><>^<^v<^><v>^v^<^<>>^<^vv<v>^v
><^<v>>v>^<<^>^<^^>v^^v<>>v><<>v<<^><<>^>^v<v
>vv>^>^v><^^<v^>^>v<^v><>vv>v<^><<<<v^<^vv<>v
<><<^^>>^<>vv><^^<vv<<^v^v^<^^^^vv<<>^<vvv^vv
>v<<v^><v<^^><^v^<<<>^<<vvvv^^^v<<v>vv>^>>^<>
^^^^<^<>^^vvv>v^<<>><^<<v>^<<v>>><>>><<^^>vv>
<^<^<>vvv^v><<<vvv<>>>>^<<<^vvv>^<<<^vv>v^><^
```

Sortie :

```text
La plus grande : 44

>>>>>^
^<
^
>^
^
>^
^
>>>^
^
^<
^
^
^
>^
^
^
^ v<<
^<<< ^
^<<
^<<
```

(affichage incorrect, mais imaginez)

Voilà ! Amusez-vous les petits amis !

## Travaux réalisés

- Booti386 : [pastebin](https://pastebin.com/mj9tqf9y) - C
