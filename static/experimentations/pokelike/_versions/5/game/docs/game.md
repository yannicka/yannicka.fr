tile-based game

*****************************************************************

|----------|
| POKELIKE |
|----------|------------------------------|
| Créateur :                Aylab         |
| Date de début du projet : 25 avril 2013 |
| Drnière mise à jour :     26 avril 2013 |
|-----------------------------------------|



DES "POKEMON"
mais au lieu qu'ils évoluent
=> ils mutent ensemble pour former des "POKEMON" uniques
=> => Avec une limite du nombre de mutations, sinon ça fait une infinité => impossible à gérer



Pour le sol, ne pas tout définir, chaque case du tiles grounds correspond à une couleur, exemple :
 0 : rgb(0, 0, 0)
 1 : rgb(0, 0, 1)

Une seconde image pour les cases solides

 * Sol
 * Objet
 * Solide ou non
 * Evènements
 * Ennemis/PNJs



Todo (dans l'ordre) : (optimiser après chaque étape)
 * Affichage de la carte
 * Optimisation
 * Déplacement du joueur
 * Optimisation
 * Caméra qui suit le joueur
 * Optimisation
 * Evènements onenter et onaction
 * Optimisation
 * Panneau -Explication -Oui/Non -Autre?
 * Optimisation
 * PNJs -Explication -Oui/Non -Autre
 * Optimisation
 * Une idée de jeu
 * Optimisation
 * Réfléchir
 * Optimisation

Histoire :
  -

Graphismes
  -

Deux types de tiles :
  1. Les solides (collision) :
       * Murs
       * Meubles
       * Batîments
       * Barrières
       * Arbres
       * Rochers

  2. Les non solides (pas de collision) :
       * Sols
       * NE PAS OUBLIER LES PAVES AU SOL ET SURTOUT LES "HAUTES HERBES"

2 couches d'affichage + 3 couches spéciales :
  * grounds   (sols)       (g)
  * items     (objets)     (i)
  * no solid  (pas solide) (n)
  * on enter  (à l'entrée) (onenter)
  * on action (à l'action) (onaction)

Gameplay :
  Le joueur se trouve dans un univers 2D style Pokémon. Il a la possibilité de se déplacer vers la gauche, le haut, la droite et le bas.
  Cet univers est peuplé de PNJs qui, par difficulté croissante, propose de joueur à un jeu 2D de plateforme, comme Mario.

Nettoyage de map :
Supprimer tout les espaces et :
,i:-1
,s:0
