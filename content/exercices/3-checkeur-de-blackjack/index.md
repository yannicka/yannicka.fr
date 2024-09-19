+++
title = "Checkeur de Blackjack"
date = 2014-07-07
+++

## Enoncé

Vous connaissez tous le [Blackjack](https://en.wikipedia.org/wiki/Blackjack).
Le principe est simple : tout les monde prend des cartes et celui qui a la plus
grande valeur de cartes inférieure à 21 gagne.

Les valeurs des cartes sont les suivantes :

- Une carte avec un chiffre vaut sa valeur : par exemple un 7 de trèfle vaut 7
- Une carte de tête (valet, dame et roi) vaut 10
- L'as vaut 1 ou 11

La personne avec la plus haute valeur gagne, à une exception, si une personne a
5 cartes dans la main et moins de 21, il gagne automatiquement. Si la valeur de
la main dépasse 21 c'est automatiquement perdu. Le défi est donc à partir d'un
jeu donné de déterminer le gagnant.

### Entrée

Dans un première version, on entrera `N` le nombre de joueurs puis pour chaque
joueur les cartes qu'il a :

```text
Nicolas : As de cœurs, 5 de cœurs, 6 de carreaux
```

Il a donc une valeur de 21 (ou 11 avec l'as).

### Sortie

On affiche le gagnant, mais si deux joueurs gagnent on affiche « Égalité ».

### Exemple d'entrée

```text
3
Aurélie : As de trèfles, 10 de carreaux
Gérard : 3 de cœurs, 6 de carreaux, 7 de trèfles
Guillaume : 2 de cœurs, 3 de trèfles, valet de carreaux
```

### Exemple de sortie

```text
Aurélie gagne.
```

### Bonus

Générer automatiquement les noms et les cartes de chaque joueurs.

## Travaux réalisés

- SuperMonkey : [pastebin](https://pastebin.com/4m7qGKBD) - Haxe
- Moi-même : [pastebin](https://pastebin.com/kRS64VJ9) (jamais finalisé) - Tcl

### Mon code

```tcl
# ---------
# Fonctions
# ---------
# Récupérer une valeur au hasard dans une liste
proc random_pick { a_list } {
    lindex $a_list [ expr { int(rand() * [ llength $a_list ]) } ]
}

# Donner la valeur d'une carte
proc card_value { card } {
    set value [ lindex [ regexp -all -inline "(.+) de (.+)" $card ] 1 ]

    switch $value {
        valet - dame - roi { return 10 }
        as                 { return 11 }
        default            { return $value }
    }
}

# Récupérer une carte dans le jeu
proc pick_card { game i } {
    upvar $game a_game
    set card [ lreplace $a_game $i $i ]
    set a_game $card
    return [ lindex $card $i ]
}

# Récupérer une carte dans le jeu
proc pick_name { names i } {
    upvar $names a_names
    set name [ lreplace $a_names $i $i ]
    set a_names $name
    return [ lindex $name $i ]
}

# ---
# Jeu
# ---
# Noms
set names {
    Yannick Aurelie Guillaume Benoit Hugo Aymeric
    George Jeremy Matthieu Romain Elisa Corentin
}

# Cartes
set cards { 2 3 4 5 6 7 8 9 10 valet dame roi as }

# Types
set types { coeur pique trefle carreau }

# Création du jeu de cartes
set game [ list ]

foreach card $cards {
    foreach type $types {
        lappend game "$card de $type"
    }
}

set players [ list ]

for { set i 0 } { $i < 3 } { incr i } {
    random_pick $names
}

puts "Nombre de joueurs (min : 1 ; max : [ llength $names ]) : "
set nb_players [ gets stdin ]

if { $nb_players < 1 } {
    set nb_players 1
}

if { $nb_players >= [ llength $names ] } {
    set nb_players [ expr { [ llength $names ] - 1 } ]
}

for { set i 0 } { $i < $nb_players } { incr i } {
    set name [ random_pick $names ]
    pick_name names [ lsearch $names $name ]
    lappend players $name

    set player($name) [ list ]
    set score($name) 0

    for { set j 0 } { $j < 3 } { incr j } {
        set card [ random_pick $game ]
        lappend player($name) $card
        set score($name) [ expr { $score($name) + [ card_value $card ] } ]
        pick_card game [ lsearch $game $card ]
    }
}

parray player

puts {}

set nb_victories 0

foreach name $players {
    if { $score($name) == 21 } {
        incr nb_victories
    }
}

foreach name $players {
    if { $score($name) == 21 } {
        if { $nb_victories == 1 } {
            set victory victoire
        } else {
            set victory egalite
        }
    } else {
        set victory defaite
    }

    puts "Score de $name : $score($name) - $victory"
}
```
