Au début, toutes les variables et fonctions se créent. Aucune fonction n'est lancée.

La première fonction qui se lance est G.init() qui lance G.create() qui lance G.update() qui boucle.

G.update() boucle en exécutant la fonction de mise à jour de la scène de jeu en cours.


------------------------------


Un sol peut être solide ou non, c'est l'attribut "solid" qui définit cela.
Un objet au sol est forcément solide, il est impossible de marcher dessus. De plus celui-ci pourra forcément être ramassé et posé, sans exception.
