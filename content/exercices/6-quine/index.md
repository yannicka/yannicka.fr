+++
title = "Quine"
date = 2015-01-05
+++

## Enoncé

Aujourd'hui nous faisons des Quines !

Le Quine c'est un programme qui fait une seule chose : il affiche son propre
code. C'est très drôle à faire même si ça ne sert à rien. :p

Quelques contraintes tout d'abord :

- Le programme ne peut pas utiliser d'entrées-sorties excepté pour faire
  apparaitre le message. Donc pas de lecture de fichier, ni de réseau, ni
  d'écriture dans la console. Il faut que le programme affiche simplement son
  code source ;

- La sortie du programme doit être EXACTEMENT la même que le programme, c'est à
  dire commentaires et sauts de ligne compris. Les gens sous Linux peuvent
  comparer avec l'utilitaire `diff` ;

- Le code doit faire plus d'un caractère !

### Entrée

Nada

### Sortie

Le code source exact !

### Bonus

Écrire un Quine dans 2 langages, je m'explique le langage A doit afficher le
code source du langage B et le langage B afficher le code source du A.
C'est-à-dire être capable de faire :

```bash
$ python A.py > B.rb
$ ruby B.rb > C.py
$ diff A.py C.py
$
```

Par exemple, si votre programme est en Python et Ruby.

Voilà, c'est tout pour aujourd'hui. Amusez-vous !

## Travaux réalisés

* booti386 : [pastebin](https://pastebin.com/LD1yVPGJ) - C
* Spiky : [pastebin](https://pastebin.com/qAcWhSNN) - C#
* Moi-même : [pastebin](https://pastebin.com/JLuM24yW) - Haskell

### Mon code

```haskell
s="main=putStr (['s', '='] ++ show s ++ [';'] ++ s)";main=putStr (['s', '='] ++ show s ++ [';'] ++ s)
```
