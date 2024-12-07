+++
title = "Factorielle inversée"
+++

# Factorielle inversée

Publié le 21 novembre 2016 par Benoît sous licence CC BY-SA 4.0.

## Énoncé

L'important pour pouvoir faire cet exercice est de savoir ce qu'est une
factorielle.

Une factorielle se note avec un point d'exclamation, par exemple `5!`. C'est
une valeur numérique qui est égale à la multiplication de tous les termes
jusqu'au chiffre 1.

Pour notre exemple, `5! = 120` car c'est égal à `5x4x3x2x1 = 120`.

Simple, n'est-ce pas ? Peut-être un peu trop pour nous alors on va faire
l'inverse !

Pour cela on va écrire une fonction qui va prendre en entrée un nombre, `120`
pour garder le même exemple, et qui indiquera si un factoriel existe pour ce
nombre, ou pas ; ici ce sera `5!`, la sortie pour notre exemple.

Mais comment allez faire ? C'est assez simple il suffit de prendre le nombre et
de le diviser jusqu'à obtenir 1.

```text
120 -> 120/2 -> 60/3 -> 20/4 -> 5/5 -> 1 => 5!
```

## Entrée

En entrée vous allez recevoir des entiers. Exemple :

```text
120
150
```

## Sortie

En sortie, on veut obtenir la factorielle d'origine si elle existe sinon
« Aucune factorielle possible ». Exemple :

```text
120 = 5!
150 Aucune factorielle possible
```

## Données à tester

```text
3628800
479001600
6
18
```

## Résultat attendu

```text
3628800 = 10!
479001600 = 12!
6 = 3!
18 Aucune factorielle possible
```

## Travaux réalisés

- Exagone313 : [dpaste](http://dpaste.com/0R4KS3J) - OCaml
- Booti386 : [git bmc](https://git.bitmycode.com/Booti386/Lundi3/tree/master) -
  Assembleur x86
- Moi-même : [pastebin](https://pastebin.com/qrpa9ViK) - Racket

### Mon code

```text
#lang racket

(define (invfact x i)
  (define y (/ x i))
  (cond
    [(= y 1) x]
    [(> y 1) (invfact y (+ i 1))]
    [(< y 1) (error "Aucune factorielle possible")]))

(define (display_invfact n)
  (printf "~a = ~a!\n" n (invfact n 2)))

(display_invfact 120)
(display_invfact 3628800)
(display_invfact 479001600)
(display_invfact 6)
(display_invfact 18)
```
