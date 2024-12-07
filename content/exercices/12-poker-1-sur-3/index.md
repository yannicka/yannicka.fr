+++
title = "Poker 1/3"
+++

# Poker 1/3

Publié le 30 août 2015 par Benoît sous licence CC BY-SA 4.0.

## Énoncé

Bonjour à tous,

Cette semaine 3 exos, sur le Texas hold'em, le premier facile, le 2e un peu
moins et le 3e difficile.

Pour commencer tranquillement, on va simuler la distribution des cartes.

### Entrée

Le jeu demande le nombre de joueurs entre 2 et 8. À chaque fois le joueur est
dans les joueurs ainsi que d'une à 7 IA.

### Sortie

Le jeu affiche les 2 cartes de chaque joueurs et affiche les 5 cartes communes
à tous. Pour afficher les cartes full texte ou des images peut m'importe.

### Exemple

```text
How many players (2-8) ? 3

Your hand: 2 of Clubs, 5 of Diamonds
CPU 1 Hand: Ace of Spades, Ace of Hearts
CPU 2 Hand: King of Clubs, Queen of Clubs

Flop: 2 of Hearts, 5 of Clubs, Ace of Clubs
Turn: King of Hearts
River: Jack of Hearts
```

Note : flop c'est tu jettes une carte puis t'en pose 3 sur la table, turn tu
brule une carte et tu en poses une sur la table, river tu brules une carte et
tu en pose une sur la table

La distribution des cartes

Les cartes proviennent d'un jeu classique de 52 cartes. Donc quand on tire une
carte ne peut pas être en double. Pour la façon de mélanger le paquet c'est
comme bon vous semble.

Dans le Texas Hold'em, on "brule" une carte avant le flop, le turn et la river.
Il faut donc enlever ces cartes du jeu, si vous voulez vous pouvez les afficher
pour la science.

## Partie 2

Dans la partie 2, on compare les mains et on détermine un gagnant mais ce sera
plus tard.

AMUSEZ-VOUS BIEN !

## Travaux réalisés

- Moi-même : Tcl

### Mon code

*(non finalisé)*

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
proc pick_card { cards i } {
	upvar $cards all_cards
	set card [ lreplace $all_cards $i $i ]
	set all_cards $card
	return [ lindex $card $i ]
}

proc pick_random_card { cards } {
	set rand_card [ random_pick $cards ]
	pick_card cards rand_card
	return rand_card
}

# ---
# Jeu
# ---
# Cartes
set values { 2 3 4 5 6 7 8 9 10 valet dame roi as }

# Types
set suit { coeur pique trefle carreau }

# Création du jeu de cartes
set cards [ list ]

foreach card $values {
	foreach type $suit {
		lappend cards "$card de $type"
	}
}

set players [ list ]
set table [ list ]

puts "Nombre d'ordinateurs (min : 1 ; max : 7) : "
# set nb_players [ gets stdin ]
set nb_players 3

if { $nb_players < 1 } {
	set nb_players 1
} elseif { $nb_players > 7 } {
  set nb_players 7
}

for { set i 0 } { $i < $nb_players } { incr i } {
  lappend players $i
	set player($i) [ list ]

	for { set j 0 } { $j < 2 } { incr j } {
		set card [ random_pick $cards ]
		lappend player($i) $card
		pick_card cards [ lsearch $cards $card ]
	}
}

set flop [ list ]
for { set i 0 } { $i < 3 } { incr i } {
  set card [ random_pick $cards ]
  lappend flop $card
}

# Flop : on jette une carte et on en pose trois sur la table
set flop [ list ]
set card [ random_pick $cards ]
pick_card cards [ lsearch $cards $card ]

for { set i 0 } { $i < 3 } { incr i } {
  set card [ random_pick $cards ]
  lappend table $card
  lappend flop $card
  pick_card cards [ lsearch $cards $card ]
}

# Turn : on jette une carte et on en pose une sur la table
set card [ random_pick $cards ]
pick_card cards [ lsearch $cards $card ]

set card [ random_pick $cards ]
lappend table $card
set turn $card
pick_card cards [ lsearch $cards $card ]

# River : on jette une carte et on en pose une sur la table
set card [ random_pick $cards ]
pick_card cards [ lsearch $cards $card ]

# set card [ random_pick $cards ]
# lappend table $card
# set river $card
# pick_card cards [ lsearch $cards $card ]
set river [ pick_random_card cards ]

foreach i $players {
  if { $i == 0 } {
    puts "Votre main : $player($i)"
  } else {
    puts "AI n°$i : $player($i)"
  }
}

puts "Flop : $flop"
puts "Turn : $turn"
puts "River : $river"
```
