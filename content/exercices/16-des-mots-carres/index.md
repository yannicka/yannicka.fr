+++
title = "Des mots carrés"
+++

# Des mots carrés

Publié le 28 novembre 2016 par Benoît sous licence CC BY-SA 4.0.

## Énoncé

L'objectif de cet exercice est de faire un peu de dessin. Enfin... des dessins.
On va se limiter à faire des carrés et des rectangles.

Pour cela, nous allons partir d'un mot puis le répéter le nombre de fois que
l'on veut, en ligne et colonne.

Pour faire simple, il vaut mieux un bon exemple.

## Exemple

### Entrée

```text
Exos,1,1
```

### Sortie

```text
E X O S
X     O
O     X
S O X E
```

Ou, pour un exemple avec des données différentes :

### Entrée

```text
Exos,2,2
```

### Sortie

```text
E X O S O X E
X     O     X
O     X     O
S O X E X O S
O     X     O
X     O     X
E X O S O X E
```

Le principe est donc assez simple en théorie, en pratique un peu moins.

## Bonus

Vu que l'on est sur un exercice d'affichage, pour les gens motivés, vous pouvez
gérer la couleur ! Une couleur par mot et, pour les croisements, une moyenne
des couleurs.

## Travaux réalisés

- Moi-même : Nim

### Mon code

*(non finalisé)*

```nim
import strutils
import sequtils

let word = "EXOS"
let len = word.len
let width = 4
let height = 4

var w1 = newSeqWith(len, newSeq[char](len))
var w2 = newSeqWith(len, newSeq[char](len))

for a in countup(0, len - 1):
  for b in countup(0, len - 1):
    w1[a][b] = ' '
    w2[a][b] = ' '

echo word

for i, letter in word:
  w1[0][i] = letter
  w1[i][0] = letter

  w1[len - 1][len - 1 - i] = letter
  w1[len - 1 - i][len - 1] = letter

  # w2 est comme w1, mais à l'envers
  # [ A, B, C, D ] -> [ D, C, B, A ]
  w2[0][len - 1 - i] = letter
  w2[i][len - 1] = letter

  w2[len - 1 - i][0] = letter
  w2[len - 1][i] = letter

  echo letter

echo w1
echo w2

for w in countup(0, width - 1):
  for h in countup(0, height - 1):
    echo $w & " ; " & $h
```
