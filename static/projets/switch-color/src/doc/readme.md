Les niveaux sont stockés dans un fichier .csv sous le format suivant :
 * Un niveau par ligne
 * Un niveau comporte trois informations séparées par une virgule
   * Sa taille (Nombre de cellules en largeur "x" Nombre de lignes)
   * Le nombre de clics minimum nécessaire pour le réussir
   * La grille (0 = case vide, 1 = case remplie)

Les niveaux sont ensuite lus avec la fonction parse_csv() qui retourne un tableau qui contient chaque niveau. Et dans chaque cellule du tableau, [0] pour la taille du niveau, [1] pour le nombre de clics minimum nécessaire pour réussir le niveau et [2] pour la grille du niveau.

el.classList n'est pas disponible sur mobile
requestAnimationFrame n'est pas disponible sur mobile
click est lent et doit être remplacé par touchstart

Il sera terminé après que j'ai fait ça : 
 * Implanter la librairie de Guillaume
 * Créer une centaine de niveaux (actuellement 17)
 * Fini la page Instructions
 * Acceptation de Google (je compte sur toi Google !)
 * Minifier tout le code

TODO
 * Enregistrer l'avancement d'une partie
 * Afficher de la publicité
 * Régler le problème du "freeze" qui arrive parfois sur mobile (timer et/ou WelGL ?)
 * Centrer la liste du choix des niveaux
 * Raptisser les icônes
 * (!!!) Une fin, pour pas finir avec une erreur (genre un feu d'artifice)
 * (!!!) Truc spécial PC : créer un niveau et le partager
 * Pouvoir fermer le menu en cliquant sur la touche arrière

Taille maximale du terrain
==========================
 * Largeur = 7
 * Hauteur = 7

Médailles
=========
 * vide ou 0 = pas de médaille
 * 1 = bronze (bronze)
 * 2 = argent (silver)
 * 3 = or     (gold)

Fichiers à terminer
===================
 * game.coffee
 * options.coffee
