---
title: Protéger les internautes du pistage
created_at: 2017-04-05
updated_at: 2018-09-01
short_description: >
  Comment protéger les visiteurs de son site de la surveillance de masse.
obsolete: true
---

Lorsque nous créons un site internet, nous utilisons divers outils :
frameworks, CDN, polices, analyse des visites, boutons sociaux, etc. Mais ces
outils font souvent des appels à des sites externes, et plus particulièrement
ceux des grandes entreprises (voir [Surveillance](/dossier/surveillance/)),
ce qu'il faut éviter.

Pour cela, il est possible d'appliquer quelques règles assez simples.

## Matomo pour récupérer des données sur les visites

Google Analytics est un outil bien connu des développeurs web. Il permet
de récolter des données sur les visiteurs pour ensuite les analyser.
Ainsi, il est possible de voir le nombre de visites, les heures
d’affluence, l’évolution du nombre de visiteurs, la provenance des
visiteurs, etc.

Cependant, aussi bien que cet outil soit, un problème persiste : toutes
les données récoltées finissent dans les serveurs de Google. Cela
signifie donc que vous disposez bien des statistiques, mais Google
aussi. Cela explique la gratuité de l’outil : toutes ces données sont
une mine d’or pour Google, qu'il peut ensuite utiliser pour son réseau
publicitaire.

Cependant, une alternative existe, il s’agit de
[Matomo](https://matomo.org/) (ancienne Piwik). Il s’agit d’un logiciel libre
sous licence GPLv3.

Matomo, comme application, est gratuit ; cependant, il peut avoir un coût : il
faut l’héberger. En effet, à la différence de Google qui profite aussi bien
des statistiques que vous, Matomo doit être hébergé. Ainsi, les données ne sont
qu’à vous et à vous seul. De plus, des options permettent de limiter la
collecte de certaines informations sur les visiteurs, afin de mieux respecter
leur vie privée.

Décrire l’ensemble des capacités de l’outil serait bien trop long.
Cependant, le site officiel explique tout cela et une instance de
démonstration est disponible.

Il est tout de même important de noter que Matomo propose moins de
fonctionnalités que Google Analytics, cependant, pour la plupart des usages,
Matomo convient parfaitement, les fonctionnalités avancées n’étant que rarement
utilisées.

À noter que Matomo, selon la configuration mise en place, n’impose pas l’ajout
d’un « bandeau cookies » sur son site, contrairement à Google Analytics.

- [Voir le site officiel de Matomo](https://matomo.org/).

À noter, qu'il est aussi possible d'éviter d'héberger vous-même Matomo grâce à
l'offre (payante) [Cloud-Hosted Matomo](https://matomo.org/hosting/) proposée par
l'entreprise qui gère Matomo, à savoir InnoCraft.

D’autres outils libres existent pour récupérer des données sur les
visites sur son site :

- [AWStats](https://awstats.sourceforge.io/) ;
- [GoAccess](https://goaccess.io/) ;
- [Countly](https://count.ly/) ;
- [Open Web Analytics](http://www.openwebanalytics.com/) ;
- [Clicky](https://clicky.com/) *(privatif)* ;
- [Fathom](https://github.com/usefathom/fathom) ;
- [GoatCounter](https://www.goatcounter.com/).

## OpenStreetMap pour afficher ses cartes

OpenStreetMap, comme vous vous en doutez, est une alternative à Google Maps.
Elle possède quelques différences :

- Alors que les données de Google Maps sont toutes centralisées chez Google et
  que seul Google peut les modifier (note : il est possible de contribuer de
  manière limitée à la carte), OpenStreetMap fonctionne plus comme Wikipédia :
  chacun peut modifier la carte ;
- Alors que Google Maps nécessite un compte Google et la génération d'une clé
  API, OpenStreetMap ne nécessite rien de tout cela (sauf une clé API *dans
  certains cas*) ;
- Alors que Google Maps, comme tous les produits Google, va analyser chacun de
  vos trajets, chacune de vos recherches, etc. OpenStreetMap ne va rien faire
  de tout cela.

La seule faiblesse qui existe actuellement dans OpenStreetMap par rapport à
Google Maps réside dans le moteur de recherche qui est peu performant. Mais
étant donné qu'ici il s'agit d'intégrer la carte à son site plutôt que de
l'utiliser comme carte d'itinéraire, cela n'est pas un souci (de plus, ce souci
peut être résolu en utilisant d'autres services qui se servent d'OpenStreetMap
mais qui ont un meilleur moteur de recherche).

La façon la plus simple d'intégrer une carte OpenStreetMap sur son site est
d'utiliser une instance de uMap :

- [uMap – OpenStreetMap](https://umap.openstreetmap.fr/fr/) ;
- [Framacarte](https://framacarte.org/fr/).

uMap permet donc d'avoir une édition de la carte en direct mais peut être
limitée. Et justement, pour éviter cette limitation, il est possible d'utiliser
une bibliothèque JavaScript ; en voici deux :

- [Leaflet](http://leafletjs.com/) ;
- [OpenLayers](http://openlayers.org/).

Bien sûr, il y existe d'autres instances de uMap et d'autres bibliothèques
JavaScript.

Certains sites payants vous proposent des fonds de carte, parfois
personnalisables :

- [Mapbox](https://www.mapbox.com/) ;
- [JawgLab](https://www.jawg.io/lab/) ;
- [MapQuest](https://business.mapquest.com/) ;
- [OpenMapTiles](https://openmaptiles.org/) ;
- [TileHosting](https://www.tilehosting.com/) ;
- [Wemap](https://getwemap.com/).

Liste de fonds de carte :

- [Liste de fonds de carte](https://leaflet-extras.github.io/leaflet-providers/preview/).

https://www.journaldunet.com/solutions/seo-referencement/1209643-11-alternatives-a-google-maps-leur-cout-leurs-avantages/

## Auto-héberger ses polices

Lorsque nous souhaitons utiliser une police sur un site internet, nous nous
tournons généralement vers Google Fonts. Sauf qu'il ne s'agit pas de la
meilleure solution :

- Si Google Fonts (ou autre service similaire) est ralenti ou ferme, le
  chargement de la police en sera aussi affecté ;
- Faire des requêtes vers un site externe ralenti la vitesse de chargement du
  site ;
- Et évidemment, comme toujours, cela envoie de nombreuses informations à
  propos de l'internaute à Google.

Une bonne solution est donc d'héberger la police sur le site. Pour cela, il
suffit de la télécharger, directement depuis Google Fonts ou de la rechercher
sur internet. Parfois, avec la police, vous aurez le code CSS nécessaire pour
charger la police, mais ce ne sera pas toujours le cas, voici la procédure à
suivre dans ce cas :

- Télécharger la police ;
- Aller sur [Transfonter](https://transfonter.org/) ;
- Envoyer la police (qui peut être constituée de plusieurs fichiers) ;
- Effectuer les paramétrages ;
- Cliquer sur « Convert » et récupérer le contenu (code source CSS avec les
  `@font-face` et la police au format choisi) ;
- Intégrer cela à votre site.

Quelques services pratiques :

- [Everything Fonts](https://everythingfonts.com/), pour la conversion de
  police ;
- [Font Squirrel - Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator),
  pour générer les `@font-face` à partir des fichiers de la police ;
- [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) ;
- [Can I use](https://caniuse.com/#search=woff), pour connaitre la
  compatibilité de WOFF et WOFF2 sur les différents navigateurs ;
- [@font-face sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/@font-face),
  la syntaxe de `@font-face`.

## Auto-héberger ses vidéos

Pour héberger les vidéos, nous nous tournons presque tous vers YouTube. Il y
existe bien d'autres sites pour héberger ses vidéos, mais nous allons nous
concentrer ici sur l'auto-hébergement.

### Pourquoi préférer l'auto-hébergement ?

- Avec le lecteur simpliste d'HTML5, la vidéo charge plus rapidement ;
- Aucune dépendance externe, donc aucune surveillance sur les internautes
  regardant vos vidéos.

### Quels inconvénients ?

- Si la vidéo est trop souvent lue, cela peut entrainer des ralentissements
  (bande passante utilisée trop importante) ;
- Ne convient que dans le cas où posséder une communauté est importante ;
- Prend de la mémoire disque.

### Que faire, donc ?

Examinez bien l'utilisation qui sera faite de vos vidéos. Gardez aussi en tête
que chaque vidéo lue par YouTube permet à Google de mieux analyser la personne
qui la regarde, et vous devez l'en protéger.

## Éviter les boutons sociaux avec compteurs

Les réseaux sociaux vous proposent d'insérer des bouts de code pour ajouter un
lien de partage, la possibilité d'aimer le contenu, etc. Mais ces bouts de
code, en plus de récupérer des informations sur le visiteur, prennent du temps
à charger, l'apparence est difficilement personnalisable et se trouvent bloqués
par les bloqueurs de publicités (qui portent mal leur nom par ailleurs).

Pour éviter cela, il est possible d'utiliser une technique très simple :
utiliser du HTML, du CSS, et remplacer ces scripts lourds par de simples liens
de partage. C'est tout. Bien sûr, il n'y aura pas de compteur, mais cela en
vaut la chandelle.

Une autre solution, un peu plus radicale, et de ne pas mettre de liens vers les
réseaux sociaux, car ceux-ci ne doivent apporter aucune valeur ajoutée : c'est
votre site qui possède le contenu et non ces réseaux. Cela permet d'éviter de
légitimer leur utilisation.

## Éviter les CDN tiers

Beaucoup de bibliothèques JavaScript ou de frameworks CSS proposent d'inclure
leur contenu via un CDN, sauf qu'il est préférable d'éviter cela. En effet,
bien que cela puisse avoir des avantages comme l'accélération (relative) du
chargement ressources et donc le chargement du site, cela présente aussi
l'inconvénient majeur de dépendre d'un tiers pour le fonctionnement de son
site et envoie des informations concernant vos visiteurs à ces tiers.

L'idée pour se prémunir de cela est très simple : récupérer le code sur son
site et faire les inclusions JavaScript/CSS soi-même.

## Éviter la publicité

Cela peut être difficile, mais il vaut mieux éviter l'affichage de publicité
sur son code, que ce soit à l'intérieur du site, car elle en dégrade
l'esthétique, la vitesse de chargement et contribue à pister les utilisateurs ;
ou à l'extérieur du site, sur des plateformes comme Google AdWords car cela
nourri ce commerce et ne permet que de l'amplifier, la publicité étant un
commerce basé sur l'utilisation intensive des données personnelles.

## Éviter le suivi des appels *(call-tracking)*

Le *call-tracking* consiste à faire transformer le numéro affiché sur votre
site ou sur vos publicités afin de tracer les appels, pour savoir comment
l'appelant vous a trouvé (quel site, quelle recherche...). Il enregistre le
numéro de télépone de l'appelant, la date, l'heure et la durée de l'appel,
la conversation téléphonique, l'objet/le sujet de la conversation et
l'aboutissement (prise de rendez-vous, commande, réservation...).

Tout cela ne serait pas bien grave si la solution de suivi des appels était
interne dans la société qui l'utilise. Là où se pose le problème, c'est que
c'est un entreprise externe (par exemple Google) qui enregistre toutes ces
données.

Ce suivi des appels est donc à éviter. De plus, il peut créer une confusion
chez l'individu car le numéro n'est jamais le même :

- Il y a le numéro de votre entreprise (le vrai) ;
- Il y a un numéro d'affichage fournit par le service de suivi des appels ;
- Et il y a un numéro généré à la volée, celui qui fait le lien entre
  l'annonce, la recherche ou autre que l'utilisateur a cliqué.

## Proposer un flux RSS

Pensez bien à proposer un flux RSS pour votre site et évitez d'utiliser Twitter
ou Facebook en ce sens (ou alors, n'utilisez ces services que pour partager le
lien vers le contenu). Ce genre de service est très utile pour ceux qui
souhaitent suivre l'évolution de vos contenus et permet de ne dépendre d'aucun
réseau social et d'aucun service externe.

Un très bon article présente l'avantage d'un flux RSS par rapport aux autres
méthodes :
[lire l'article](https://davidyat.es/2017/05/18/rss-nothing-better/).

*(par flux RSS, comprenez indifféremment
[RSS](https://fr.wikipedia.org/wiki/RSS),
[Atom](https://fr.wikipedia.org/wiki/Atom) et
[JSON Feed](https://jsonfeed.org/)).*

## Sondages/Formulaires

Pour faire des sondages, voici des alternatives à Google Forms :

- [Framaforms](https://framaforms.org/) ;
- [Pollen](https://pollen.cl/) ;
- [Forms.id](https://forms.id/).

## En vrac

### Ne récolter que les données nécessaires

N'enregistrez que des informations sur les visiteurs qui leur apporteront un
réel gain.

### Protéger les données

Cela est évident, mais il est bon de le rappeler : il est nécessaire de
protéger les informations personnelles que vous enregistrez avec un serveur
sécurisé, en utilisant HTTPS, en mettant à jour ses programmes, etc.

## Note de fin

Finalement, l'idée, c'est d'avoir un site qui existe par lui-même et ne soit
pas dépendant d'un tiers, qui ne piste pas vos visiteurs et ne donne aucune
information à des tiers.

En plus de protéger vos visiteurs du pistage, vous pouvez vous aussi vous en
protéger, quelques astuces sur
[Se protéger du pistage]({{ '/dossiers/se-proteger-du-pistage/' | url }}).
