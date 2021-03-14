---
title: Optimiser son site internet
created_at: 2019-01-09
updated_at: 2019-02-13
short_description: >
  Comment optimiser efficacement son site internet ?
draft: true
---

## Introduction

La rapidité d'un site, c'est important.

## Fausses idées

Souvent, lorsqu'une tâche est effectuée pour améliorer le référencement
du site, la rapidité du site va être retravaillée. Cependant, cela est trop
souvent travaillé seulement en surface : activation du cache, compression des
images, etc. alors que le travaille devrait être fait plus en profondeur : si
le site a besoin de cache pour être rapide, il y a fort à parier que le
problème se situe en réalité dans le code source du site (ou dans un serveur
trop peu puissant).

D'autres choses sont malheureusement trop peu travaillées comme par exemple le
nombre de requêtes, qui reste un des grands facteurs qui rend un site lent à
charger (à cause des nombreux allers-retours), ou encore de lourds fichiers
JavaScript.

En somme, le cache est là pour accélérer un site déjà rapide, et non là pour
rendre un site lent plus rapide.

Cette paresse à ne gratter les problèmes à leur surface et non en profondeur
vient en grande partie de deux choses :

1. La peur de mal faire : un changement peu avoir des conséquences innatentues,
   et l'on préfère donc parfois ne pas toucher quelque chose ;

2. Les outils utilisées : par exemple WordPress et PrestaShop, ainsi que les
   extensions qu'on installe dessus, créent beaucoup de requêtes, alors même
   que le site est tout nouveau. Et il est difficile de corriger cela.

Les solutions préférables restent donc de développer un site spécifique quand
cela est possible, ou de minimiser les extensions dans le cas de l'utilisation
d'un outil comme WordPress par exemple.

## Pourquoi faire cela ?

Améliorer la vitesse de son site internet permet aux utilisateurs de celui-ci
d'arriver plus rapidement au contenu, et donc celui-ci a moins de chance de
quitter votre site.

De plus, cela améliore le référencement et la réputation du site.

Et c'est encore mieux si la rapidité du site suit les bonnes pratiques de
référencement et d'accessibilité.

## Côté serveur

### Cache du moteur de rendu

-

### Cache du langage (PHP dans notre cas)

APC OPcache

### Compression

-

## Côté client

### HTML

1. Limiter le nombre de balises ;
2. Éviter la surimbrication des balises ;
3. Limiter le nombre d'attributs et la longueur de leurs contenus ;
4. Éviter les styles *inline*.

### CSS

1. Limiter le nombre de sélecteurs CSS ;
2. Alléger les sélecteurs CSS ;
3. Ne pas répéter les sélecteurs CSS ;
4. Retirer les sélecteurs CSS non utilisés ;
5. Limiter le nombre de propriétés dans les sélecteurs ;
6. Ne pas utiliser de framework CSS ou en utiliser un léger.

<!-- Tout ceci permet de conserver un CSS léger et plus maintenable. -->

### JavaScript

1. Éviter jQuery : il s'agit d'une dépendance assez lourde dont on utilise
   finalement souvent assez peu de fonctionnalités ;
2. Limiter le nombre de dépendances ;
3. Éviter d'écrire un code trop lourd, sous-optimisé ou avec des répétitions ;
4. Charger les scripts JavaScript à la fin du code HTML (typiquement, avant la
   balise `</body>`) ;
5. Éviter que JavaScript soit une nécessité pour pouvoir naviguer sur le site –
   essayer de ne l'utiliser que pour fluidifier la navigation et améliorer
   l'interactivité avec le site.

<!-- Tout ceci permet de conserver un JavaScript léger et plus maintenable. -->

### Requêtes

1. Rassembler au maximum les fichiers CSS dans un fichier CSS unique ;
2. Rassembler au maximum les fichiers JavaScript dans un fichier JavaScript
   unique ;
3. Limiter le nombre de requêtes ;
4. Utiliser HTTP/2 et ses avantages : push ;
5. Limiter le nombre de cookies ;
6. Charger le JavaScript en asynchrone avec `async`.

À noter qu'avec HTTP/2, concaténer les fichiers JavaScript ou CSS n'est pas
forcément la bonne solution. Si possible, préférer le découpage des fichiers et
n'envoyer que les morceaux nécessaires avec push.

### Polices

- Limiter au maximum le chargement de polices et privilégier celles qui se
  trouvent sur la machine de l'utilisateur ;
- Prévilégier le format WOFF2 qui est plus léger que les autres (TTF, EOT...).

### Images

- Compresser les images ;
- Favoriser le format JPEG pour les photographies et les formats PNG et SVG
  pour les logos, illustrations, etc. ;
- Essayer le chargement paresseux, à savoir charger une image seulement
  lorsqu'elle apparait sur l'écran de l'utilisateur ([cela devrait bientôt
  arriver](https://caniuse.com/#feat=loading-lazy-attr)).

À noter que le format WebP devrait pouvoir remplacer le format PNG d'ici
quelques temps, le temps qu'il soit implémenté dans tous les navigateurs et que
les outils nous permettent de les manier facilement.

### Compression et cache HTTP

1. Mettre en cache les fichiers statiques (avec `Cache-Control`) ;
2. Compresser les réponses HTML, CSS, JavaScript et autres (avec gzip ou
   Brotli).

Avec le cache, ne pas oublier de versionner les fichiers CSS et JavaScript afin
d'être sûr de distribuer toujours la dernière version.

### Éviter les CDN tiers

Il est tentant d'utiliser un CDN *(Content Delivery Network)* tiers pour
distribuer du JavaScript, du CSS, des polices, des images ou autre. Cela est
rapide à intégrer à un site internet, les architectures réseaux sont prévues
pour être robustes et rapides, les utilisateurs géographiquement loins du
serveur du site auront un chargement plus rapide de celui-ci, etc.

Cependant, cela présente plusieurs soucis : 1) si le service ferme, votre site
peut ne plus fonctionner ou être dégradé, 2) si le service subit des
ralentissements, votre site les subits aussi, 3) si le service est piraté,
votre site et vos utilisateurs sont vulnérables, 4) cela nuit au respect de la
vie privée de vos utilisateurs, 5) cela contribue à centraliser le web et
l'internet en général au sein d'un trop petit nombre d'acteurs.

Bien sûr, pour les points 1, 2, 3, cela est peut probable, mais cela est déjà
arrivé, et il ne faut jamais être sûr de rien. De plus, les points 4 et 5 sont
aussi importants à prendre en compte.

<!-- @todo Sources -->

Donc, préférez rappratrier les polices, image, CSS et JavaScript sur votre
site.

Pour les vidéos, cela peut être plus délicat, du fait de la forte consommation
de bande passante que cela peut engendrer. Donc, selon le trafic du site
internet et le poids des vidéos, il est soit possible de les héberger
sur le serveur du site (ou un CDN propre), ou de les héberger sur un
système alternatif à YouTube, comme par exemple [Vimeo](https://vimeo.com/) ou
[PeerTube](https://joinpeertube.org/fr/). À noter qu'en utilisant PeerTube, il
est préférable de monter sa propre instance ou d'aider le financement
l'instance utilisée.

Aussi, il reste possible de se faire son propre serveur CDN et ne pas passer
par un tiers.

Articles associés :

- [Self-Host Your Static
  Assets](https://csswizardry.com/2019/05/self-host-your-static-assets/).

## Site web statique

Aujourd'hui, il y existe un grand nombre d'outils qui permet de faire des sites
dits statiques.

Lorsqu'on parle de « statique », cela est en opposition avec « dynamique ».
Typiquement, les images, les vidéos, les CSS et les JavaScript sont des
fichiers dits statiques, contrairement aux pages web (HTML) que vous chargez,
car le contenu qui vous est distribué est modifié selon divers critères (la
date et l'heure, selon si vous êtes connecté ou non, etc.) ; le contenu est
recalculé à chaque fois.

Un site statique est donc un site où tout est statique, même le code HTML : il
n'est non plus généré au moment où l'utilisateur charge la page, mais en amont.

Pour cela, rien de bien complexe : soit on écrit directement le code HTML, et
on le distribue ainsi. Soit on utilise un outil qui va venir compiler
(assembler) les morceaux du site avant de le publier.

Les avantages à cela, est que le site est bien plus rapide à distribuer : il
n'y a (presque) rien qui soit calculé par le serveur, tout est simplement
envoyé au client tel quel. De plus, cela permet d'avoir un site plus sécurisé,
car il y a une surface d'attaque moins importante dû à l'absence de langage
comme PHP, Ruby, Python, Node.js ou autre, et à l'absence de base de données.

Bien sûr, cela ne vaut pas pour tous les types de site. Par exemple, cela n'est
pas possible pour une boutique en ligne, ou tout autre site avec une
interaction avec l'utilisateur comme par exemple un système de connexion, un
espace commentaire ou autre. Par contre, cela est très bien pour les blogs, les
sites vitrines, etc.

## Sources diverses en vrac

- [Optimiser et accélérer les pages
  web](https://lehollandaisvolant.net/tuto/pagespd/) ;

- [Optimisation Web PHP : des caches à tous les
  niveaux](https://blog.nicolashachet.com/architecture-2/optimisation-web-php-des-caches-a-tous-les-niveaux/) ;

- [The headers we don't
  want](https://www.fastly.com/blog/headers-we-dont-want) ;

- [Mise en cache HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Cache).

## Outils qui vous permettront d'analyser votre site

- [web.dev](https://web.dev/)
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [Dareboost](https://www.dareboost.com/)
- [GTmetrix](https://gtmetrix.com/)

<!--

## Retirer ce qui n'est pas utilisé

Avec l'essort des frameworks, des bibliothèques JavaScript et CSS, on se
retrouve souvent avec des codes JavaScript et CSS lourd dont on utilise au
final qu'une petite fraction des fonctionnalités qu'offrent ces outils.

Il faut donc, dans la mesure du possible, retirer du code source final (ce qui
est envoyé au navigateur), tout ce qui n'est pas utile.

Évitez donc d'utiliser trop de frameworks ou bibliothèques. Prévilégiez-en des
légères si nécessaire.

Dans le cas de JavaScript, le mieux étant que le site puisse fonctionner sans
et que JavaScript soit un supplément qui apporte du confort à l'utilisation de
la page avec plus de fluidités dans les chargements.

Quand un site est là, il est souvent choisi d'améliorer le serveur qui le
supporte. Cependant, cela est parfois une solution de facilité, pour s'éviter
un travail en profondeur qui consiterait à rendre le plus plus rapide.

-->
