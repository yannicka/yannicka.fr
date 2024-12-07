+++
title = "Équilibre d'équation chimique"

[taxonomies]
tags = ["hard"]
+++

# Équilibre d'équation chimique

Publié le 15 novembre 2016 par Benoît sous licence CC BY-SA 4.0.

## Description de l'équilibrage chimique

Faire un équilibrage chimique est une notion essentielle en physique-chimie.
Cela permet de modéliser la transformation de molécules et d'atomes lors d'une
réaction chimique.

C'est un des exercices courant demandé aux élèves en cours, mais nous, malin,
ou fainéant comme nous sommes, nous allons la programmer !

## Entrée

Nous allons prendre en entrée une réaction chimique avec les valeurs. Pour que
ce soit facilement lisible dans chaque langage, nous allons normer l'entrée. Un
élément chimique commence toujours pas une majuscule et les lettres suivantes
sont en minuscules (par exemple Co pour le Cobalt et ne pas le confondre avec
CO le monoxyde de carbone, C pour le carbone et O pour l'oxygène). Les
molécules sont séparées par un `+`, une flèche en ASCII `->` permet de
délimiter les deux parties de l'équation. Par exemple :

```text
Al + Fe2O4 -> Fe + Al2O3
```

## Sortie

La sortie du programme est l'équation d'entrée avec les valeurs ajoutées. Le
nombre d'éléments doit être le même de chaque coté de la flèche, par exemple :

```text
8Al + 3Fe2O4 -> 6Fe + 4Al2O3
```

Si le nombre de molécule est de un, alors inutile de l'afficher. Le nombre
d'éléments doit toujours être positif et la somme doit être la plus petite
possible. Par exemple le cas suivant est faux :

```text
800Al + 300Fe2O3 -> 600Fe + 400Al2O3
```

Si aucune solution n'est possible, alors afficher un message :

```text
Impossible !
```

Par exemple pour une réaction telle que :

```text
Pb -> Au
```

(ou alors c'est que vous maitrisez l'alchimie et il faut m'apprendre !)

Essayez aussi de rendre la sortie lisible en ajoutant des espaces si vous le
pouvez, entre les différentes molécules.

## Entrée de test

```text
C5H12 + O2 -> CO2 + H2O
Zn + HCl -> ZnCl2 + H2
K4[Fe(SCN)6] + K2Cr2O7 + H2SO4 -> Fe2(SO4)3 + Cr2(SO4)3 + CO2 + H2O + K2SO4 + KNO3
```

## Sortie attendue

```text
C5H12 + 8O2 -> 5CO2 + 6H2O
Zn + 2HCl -> ZnCl2 + H2
6K4[Fe(SCN)6] + 97K2Cr2O7 + 355H2SO4 -> 3Fe2(SO4)3 + 97Cr2(SO4)3 + 36CO2 + 355H2O + 91K2SO4 + 36KNO3
```

[Je laisse un exemple de Wikipédia sur une des méthodes
utilisable](https://fr.wikipedia.org/wiki/%C3%89quilibrage_d%27une_%C3%A9quation_chimique_par_la_m%C3%A9thode_alg%C3%A9brique).
