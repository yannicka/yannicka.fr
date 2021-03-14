---
title: Se protéger du pistage
created_at: 2017-04-02
updated_at: 2018-09-29
short_description: >
  Comment éviter la surveillance de masse avec quelques mesures simples.
obsolete: true
---

Depuis les révélations d'Edward Snowden en juin 2013 ([programme
PRISM](https://fr.wikipedia.org/wiki/PRISM_(programme_de_surveillance))),
nous sommes certains de la surveillance de masse qui a lieu de la part des
gouvernements et des multinationales (citons par exemple Google, Apple,
Facebook, Amazon et Microsoft) sur les citoyens. Les affaires comme
[Vault 7](https://fr.wikipedia.org/wiki/Vault_7) en mars 2017 (une
surveillance plus ciblée que PRISM) ou bien les lois sur le renseignement en
France et en Suisse, nous rappellent l'échelle de cette surveillance.

Échapper entièrement à cette surveillance, tout en continuant à utiliser les
nouvelles technologies, est quasi-impossible (si ce n'est impossible) et peut
s'avérer très complexe. Cependant, quelques méthodes simples existent pour s'en
prémunir, nous allons essayer d'en lister quelques-unes ici.

La plupart des applications présentées dans ce document sont libres/open source
et/ou de confiance. En effet, l'avantage du logiciel libre/open source est
qu'il est possible pour tout développeur de lire le code source, et donc de
voir et corriger les failles de sécurité. Bien sûr il y a d'autres avantages et
il y a des inconvénients. Aussi, toute application libre/open source ne mérite
pas une confiance aveugle, tout autant qu'une application propriétaire ne
mérite pas notre désapprobation, si l'organisation qui la gère est transparente
et de confiance.

## Navigateur web

Considérant que Google Chrome appartient à Google, Internet Explorer à
Microsoft et Safari à Apple, que ceux-ci pistent notre activité en ligne
(quoi qu'Apple semble faire des efforts avec Safari, mais il reste limité à
l'environnement Apple), il nous reste les possibilités suivantes :

**[Mozilla Firefox](https://www.mozilla.org/fr/firefox/new/)**
: Il s'agit du navigateur le plus connu de cette liste. Il est très performant,
  régulièrement mis à jour, possède une interface moderne et est géré par une
  organisation à but non lucratif. C'est vers lui que je conseille de se
  tourner.

**[Pale Moon](https://www.palemoon.org/)**
: *Fork* (clone) de la version 24 de Mozilla Firefox. Depuis, le projet évolue
  indépendamment. Il possède des extensions et il est possible personnaliser
  l'interface du navigateur.

**[Tor Browser](https://www.torproject.org/)**
: Basé sur Mozilla Firefox mais avec un réseau propre (le réseau Tor)
  permettant d'anonymiser (au mieux) sa navigation.

**[Waterfox](https://www.waterfoxproject.org/)**
: Waterfox est un clone de Firefox qui est paramétré de façon à accentuer le
  respect de la vie privée, ainsi que les performances et la sécurité.

**[Falkon](https://www.falkon.org/)**

Ensuite, il y existe d'autres navigateurs intéressants, mais basés sur le
moteur de rendu Blink, développé par Google.

**[Chromium](https://download-chromium.appspot.com/)**
: Chromium, c'est la version de développement de Google Chrome. Il s'agit de la
partie open source du navigateur de Google et ne possède pas l'ensemble du
système de pistage que Google Chrome intègre. Pour les utilisateurs de Google
Chrome qui désirent utiliser un navigateur plus respectueux tout en gardant les
extensions de Google Chrome et/ou son interface, il s'agit d'une alternative
envisageable. Il faut par contre bien penser à faire régulièrement des mises à
jour manuellement, car elles ne sont pas automatiques. Les autres solutions
restent tout de même (largement) préférables.

**[Brave](https://www.brave.com/)**
: Basé sur le même moteur de rendu que Google Chrome (c'est-à-dire que le rendu
  des sites est identique sur les deux navigateurs). Il intègre nativement un
  bloqueur de publicités et un bloqueur de traceurs.

Et encore d'autres alternatives semblant être intéressantes mais dont
l'ouverture du code laisse à désirer et dont le respect de la vie privée peut
être mis en doute :

- [Opera](https://www.opera.com/) ;
- [Vivaldi](https://vivaldi.com/).

Tous deux sont basés sur le même moteur de rendu que celui de Google Chrome
(nommé Blink).

**Rappel :** un moteur de rendu est ce qui gère l'affichage des pages internet.
Si deux navigateurs utilisent le même moteur de rendu et la même version de ce
moteur de rendu, alors l'affichage des sites sera le même sur ces deux
navigateurs. Ce qui différenciera donc les deux navigateurs (à part leur nom,
leur logo, etc.) ce sera les fonctionnalités que chacun propose (extensions,
personnalisation de l'interface, intuitivité de l'interface...).
{: .info }

<!--

**Questions :** je m'interroge sur Chromium : est-il de confiance, possède-t-il
des traceurs ? un peu, beaucoup ? Je m'interroge aussi sur Brave, est-il de
confiance ? Est-il légitime de lister Waterfox, Opera et Vivaldi ? Existe-t-il
d'autres navigateurs intéressants ?
{: .question }

-->

À la question « pourquoi Google Chrome est le navigateur le plus utilisé ? » la
réponse est très simple. Google a fait (et fait encore) de la publicité pour
son navigateur sur ses sites internet (Google, YouTube, etc.). De plus, Google
a aussi fait de l'installation forcée via d'autres logiciels (Adobe Flash
Player, µTorrent, CCleaner, etc. ;
[simili-preuve](https://mamot.fr/system/media_attachments/files/000/755/445/original/0922ff5e2bc7f708.png)).

<!--

Simili-preuve vu sur https://social.nah.re/@alex/99225555333290555

-->

<!--

S'il ne fallait conseillé qu'un navigateur, ce serait Mozilla Firefox. C'est le
navigateur libre le plus grand public et son développement est très actif.

Il est important de diversifier les moteurs de rendu. Si tout le monde
utilisait un navigateur basé sur le moteur de rendu Blink (celui de Google
Chrome), cela donnerait à Google le « pouvoir » de transformer le web à sa
façon car il contrôlerait tout le paysage du web.

-->

Une fois le navigateur sélectionné, il reste encore possible de se protéger du
pistage, toujours assez simplement, en installant des extensions pour
navigateur.

## Extensions pour navigateur

Ne sont listés ici que des extensions compatibles pour
[Mozilla Firefox](https://www.mozilla.org/fr/firefox/new/) et ses dérivés (à
quelques exceptions près), car Google Chrome, Internet Explorer et Safari ne
sont pas compatibles avec la protection contre la surveillance de masse, car
ils appartiennent respectivement à Google, Microsoft et Apple, et ne sont pas
libres. Pour les autres navigateurs (ou même ceux susmentionnés), il vous
faudra effectuer quelques recherches pour trouver des extensions similaires.
{: .info }

Après avoir choisi votre navigateur, il est possible de s'attaquer aux
extensions de celui-ci, afin de limiter le pistage fait par les sites que vous
visitez. Voici quelques extensions intéressantes :

**[uBlock Origin](https://addons.mozilla.org/fr/firefox/addon/ublock-origin/)**
: Extension la plus importante ; elle bloque le pistage publicitaire et de
  nombreuses requêtes qui servent à vous pister (donc, en plus de ne plus subir
  la publicité, vous êtes moins pisté).

  Petit rappel : la publicité est le principal motif du pistage (en plus de la
  surveillance), car en pistant les individus, il est possible de leur créer un
  profil publicitaire, pour faire de la publicité ciblée.

**[Privacy Badger](https://addons.mozilla.org/fr/firefox/addon/privacy-badger17/)**
: Analyse les cookies qui sont déposés sur votre ordinateur et bloque ceux qui
  semblent n'être utilisés que pour vous pister (le programme « apprend » seul,
  via un algorithme).

**[Skip Redirect](https://addons.mozilla.org/fr/firefox/addon/skip-redirect/)**
: Évite certaines redirections inutiles pour vous amener directement à la page
  voulue (ces redirections ayant pour but de vous pister pour faire des
  statistiques). Cela permet aussi d'effectuer moins de requêtes et donc
  d'éviter d'utiliser de la bande passante pour rien.

**[Decentraleyes](https://addons.mozilla.org/fr/firefox/addon/decentraleyes/)**
: Certains sites, pour des raisons qu'il serait inutile de citer ici, vont
  récupérer des fichiers qui se trouvent sur d'autres serveurs (à eux ou non).
  Certains de ces serveurs ont pour seul but de transmettre des fichiers
  fréquemment utilisés par les sites internet (bibliothèque CSS, framework
  JavaScript, etc.). Cependant, ces serveurs peuvent être utilisés pour vous
  pister. Ce que propose l'extension, c'est d'avoir ces fichiers sur sa
  machine, pour éviter des requêtes vers ces serveurs.

**[au-revoir-utm](https://addons.mozilla.org/fr/firefox/addon/au-revoir-utm/)**
: Certains sites, pour savoir d'où vous venez (de leur logiciel, d'une
  newsletter, etc.), ajoutent des paramètres à leur URL, souvent sous la forme
  « utm\_\* » (car reconnu par Google Analytics, un outil de statistique gratuit
  proposé par Google, très réputé). Cette extension supprime ces paramètres.

**[Smart Referer](https://addons.mozilla.org/fr/firefox/addon/smart-referer/)**
: Lorsque vous cliquez sur un lien, l'URL sur laquelle vous étiez est fournie
  au site que vous allez visiter, cette extension empêche cette information
  d'être envoyée au site.

**[Redirect AMP to HTML](https://addons.mozilla.org/fr/firefox/addon/amp2html/)**
: Redirige les pages AMP vers leur équivalent HTML. Si vous ne comprenez pas le
  jargon, ce n'est pas très grave, retenez juste ceci : cela vous évite d'être
  pisté par Google et évite d'utiliser une technologie destructrice.

**[Exodify](https://addons.mozilla.org/en-US/firefox/addon/exodify/)**
: Affiche, sur Google Play, le nombre de traceurs qu'une application possède.

Et quelques autres extensions que je considère un peu moins intéressantes mais
qui peuvent s'avérer pertinentes à partager :

**[Privacy Settings](https://addons.mozilla.org/en-US/firefox/addon/privacy-settings/)**
: Ajouter à votre navigateur une interface pour vous permettre de gérer
  quelques paramètres de confidentialité.

Il existe évidemment d'autres extensions pour vous protéger du pistage, par
exemple [NoScript](https://addons.mozilla.org/en-US/firefox/addon/noscript/)
ou [uMatrix](https://addons.mozilla.org/en-US/firefox/addon/umatrix/), mais
celles-ci bloquent plus de requêtes et peuvent gêner la navigation si vous ne
les maitrisez pas.

Il y existe une possibilité alternative, intéressant mais incompatible avec les
autres outils : il s'agit d'[AdNauseam](https://adnauseam.io/). Cette extension
pour navigateur « clique » sur les publicités, en arrière-plan de votre
navigation, pour limiter la possibilité d'établir un profil sur vous et pour
faire payer inutilement les clics à ceux qui publient les annonces. C'est
intéressant mais sûrement assez limité (les faux-clics peuvent être détectés et
votre profil peut être établi à partir d'autres données).

Concernant la configuration de ces extensions, elle n'est pas abordée ici, car
il serait inutile de le faire, puisque les extensions elles-mêmes le font bien
mieux que je ne le pourrais.

Si vous souhaitez découvrir plus d'extensions, voici quelques articles à lire :

- [12 extensions Chrome et Firefox pour protéger sa vie
   privée](https://iampox.com/blog/12-extensions-chrome-et-firefox-pour-proteger-sa-vie-privee) ;
- [Extensions Firefox pour protéger sa vie
   privée](https://blog.imirhil.fr/2015/12/08/extensions-vie-privee.html).

Et aussi un article intéressant à lire sur le pourquoi bloquer les publicités :
[Faut-il bloquer les publicités ?](https://esquisses.clochix.net/2015/09/21/pub/).

Aussi, il y a des applications qui bloquent la publicité qui sont à éviter, par
exemple AdBlock, AdBlock Plus et Ghostery, auxquels il faut préférer uBlock
Origin précédemment cité.

**Petit rappel :** ce que l'on nomme bloqueur de publicités est improprement
nommé. Les outils qui bloquent la publicité bloquent aussi, la plupart du
temps, les pisteurs, les cryptomineurs, les contenus bloquants, etc. (par
exemple, uBlock Origin se décrit lui-même comme un bloqueur à spectre large
(*wide-spectrum blocker* en anglais).
{: .info }

## Moteur de recherche

Google est sans surprise le moteur de recherche le plus utilisé, à tel point
que l'on peut oublier qu'il y en existe d'autres. Nous n'allons pas ici parler
de Bing (qui appartient à Microsoft) et de Yahoo!, mais de moteurs de recherche
qui protègent votre vie privée.

**[DuckDuckGo](https://duckduckgo.com/)**
: Moteur de recherche étasunien qui n'enregistre et n'analyse pas les
  recherches, protégeant ainsi votre vie privée. Les résultats sont pertinents,
  avec beaucoup de fonctionnalités, certaines présentes sur Google
  (calculatrice, carte...), d'autres absentes sur Google (*bangs*, pense-bête
  développeur...) et d'autres qui manquent (l'affichage de l'encadré des
  actualités par exemple).

  Quelques points négatifs :

  - Il faut faire une (petite) configuration pour avoir les résultats
    français ;
  - Les publicités affichées sont parfois sans rapport direct avec la
    recherche, et parfois aussi très troublantes ;
  - Les publicités proviennent de Microsoft AdCenter (utilisé par Bing et
    Yahoo!) ;
  - DuckDuckGo possède des serveurs basés aux États-Unis, le service est donc
    soumis à la loi de ce pays, peu scrupuleux sur le respect de la vie
    privée ;
  - DuckDuckGo utilise des serveurs d'Amazon pour fonctionner, une entreprise
    qu'il est préférable d'éviter.

  <!--

  - Quelques articles sur DuckDuckGo :
    - [DuckDuckGo, le canard aux pratiques boiteuses - Franck Ridel](http://franck-ridel.fr/duckduckgo-le-canard-aux-pratiques-boiteuses/) (vu sur [Mastodon Framapiaf](https://framapiaf.org/@franckridel/99466298851989160)) ;
    - [Réponse à Franck Ridel concernant DuckDuckGo - /home/lord](https://lord.re/fast-posts/08-reponse-franck-ridel-ddg/) ;
    - [Comment anonymiser Searx. Partie 1: Anonsurf et Whonix - Franck Ridel](http://franck-ridel.fr/comment-anonymiser-searx-partie-1-anonsurf-et-whonix/).

  -->

**[Qwant](https://www.qwant.com/)** (et [Qwant Lite](https://lite.qwant.com/))
: Moteur de recherche franco-allemand respectant la vie privée des utilisateurs
  en n'enregistrant pas les recherches. Il ressemble à DuckDuckGo, mais possède
  une interface moins épurée. Il semble posséder moins d'inconvénients que
  DuckDuckGo et propose de plus une interface pour les actualités (à la manière
  de Google Actualités).

**[StartPage](https://www.startpage.com/)**
: Ce moteur de recherche fait le pont entre votre machine et Google : vous
  effectuez une recherche sur StartPage, qui demande les résultats à Google,
  puis vous les affiche. Ainsi, Google ne sait rien de vous. Cela constitue,
  selon moi, un risque, car Google peut bloquer StartPage dès qu'il le
  souhaite. De plus, cela continue d'alimenter en données les serveurs de
  Google.

Encore d'autres alternatives semblent exister mais paraissent moins
intéressantes :

**[Lilo](https://search.uselilo.org/)**
: Chaque recherche vous donne une « goutte ». Vous pouvez ensuite reverser ses
  gouttes à des projets humanitaires, qui se transformeront en argent. Il
  s'agit d'un méta-moteur de recherche qui va chercher ses résultats sur les
  autres moteurs de recherche (comme Google, Yahoo!, etc.) et affiche de la
  publicité depuis Microsoft AdCenter, comme DuckDuckGo. Le respect de la vie
  privée semble être au cœur du projet.

**[Ecosia](https://www.ecosia.org/)**
: Les recherches affichent de la publicité. Ces publicités font gagner de
  l'argent à Ecosia, argent qui est utilisée pour la plantation d'arbres
  partout dans le monde. Comme DuckDuckGo et Lilo, Microsoft AdCenter est
  utilisé pour afficher de la publicité. Cette alternative n'est cependant
  conseillée que pour une démarche écologique, car le respect de la vie privée
  n'est pas central au projet, et vos informations sont envoyées à Microsoft.

**[Swisscows](https://swisscows.ch/)**
: Semble être une alternative intéressante, mais ne sachant pas grand-chose
  dessus, je préfère la mettre à part. La [page relative à la protection des
  données](https://swisscows.ch/privacy) semble indiquer que le moteur de
  recherche respecte la vie privée de ses utilisateurs.

**[findx](https://www.findx.com/)**
<!-- vu sur https://www.reddit.com/r/privacytoolsIO/comments/81oium/findx_search_engine_open_source_no_logging_no/ -->

Tous ces moteurs de recherche affichent de la publicité afin de pouvoir payer
les serveurs, les employés, financer des projets humanitaires, etc. Vous pouvez
néanmoins la désactiver dans le cas de DuckDuckGo via un paramétrage ou
utiliser un bloqueur de publicités pour les autres, ce qui n'est pas forcément
conseillé, car ces projets ont besoin de la publicité pour être pérenne. Je
considère que pour ces services, notamment ceux de Qwant, il est préférable de
garder la publicité affichée, contrairement aux services de Google et consorts,
car ici la publicité ne se base que sur la recherche et non sur des
informations personnelles de l'internaute. De plus, celle-ci est plus discrète
et sert à rémunérer de biens plus petites entreprises.

L'idée ici n'est pas de détailler chacun de ces moteurs de recherche, cela a
déjà été fait ailleurs, mais simplement de rappeler leur existence avec une
brève description. Il est aussi important de savoir, que si vous vous décidez
à changer de moteur de recherche, cela pourrait vous prendre un peu de temps,
car chaque moteur a sa façon de répondre aux requêtes.

Aussi, aucun de ces moteurs n'est libre ou open source, on ne peut donc pas
vérifier leur code source, on ne peut que leur faire confiance. De plus, aucun
ne semble utiliser entièrement son propre robot d'indexation (DuckDuckGo et
Qwant se basent sur les résultats de Bing, et StartPage se base sur Google). Il
existe un métamoteur de recherche qui est libre :
**[searx](https://searx.laquadrature.net/)** (instance de La Quadrature du
Net). Je le mets à part, car je trouve les réponses moins pertinentes que sur
les autres moteurs de recherche et son utilisation est plus technique.
Cependant, contrairement aux autres métamoteurs cités, celui-ci permet de
personnaliser les sources de recherche, ne contient aucune publicité et le code
source public fait qu'il existe par « instances ». En savoir plus sur
[le site officiel](https://asciimoo.github.io/searx/).

## Cartographie

Autant le dire tout de suite : aucune application de cartographie n'est aussi
avancée et complète que Google Maps. **MAIS**, il existe tout de même des
alternatives. La plus connue est OpenStreetMap, une carte du monde que chacun
peut modifier : tout est modifiable. OpenStreetMap est le Wikipédia de la
cartographie.

**[OpenStreetMap](https://www.openstreetmap.org/)**
: La carte d'OpenStreetMap n'est pas la meilleure, mais c'est sur les données
  de cette carte que se basent (presque) toutes les autres cartes. De plus,
  c'est là que se passent les éditions de la carte du monde. [Contribuer à
  OpenStreetMap](https://www.openstreetmap.fr/contribuer/).

**[Qwant Maps](https://www.qwant.com/maps/)**
: Qwant Maps est l'alternative la plus intéressante à Google Maps puisqu'elle
  présente les données de la même façon que celui-ci.

**[Mapy.cz](https://mapy.cz/)**
: Mapy.cz est un service tchèque dont le fonctionnement est proche de
  Google Maps / MAPCAT.

**[Mappy](https://mappy.com/)**
: Permet de découvrir rapidement les restaurants, hôtels, cafés, etc. d'une
  zone. Elle propose aussi l'affichage en 360° d'une rue, comme Steet View sur
  Google Maps.

**[OSMAND](http://osmand.net/)** (pour mobile seulement)
: Permet de remplacer Google Maps sur mobile.

**[Mapillary](https://www.mapillary.com/app/)**
: Carte collaborative d'images de lieux, là aussi un peu à la façon de
  Street View de Google Maps, mais seulement avec des photos (pas de vue à
  360°).

**[MAPS.ME](https://maps.me/)** (pour mobile seulement)

**[CityZen](http://cityzenapp.co/)** (pour mobile seulement)

**[Transportr](https://transportr.grobox.de/)**
: Application mobile Android pour le transport.

**[Magic Earth](https://www.generalmagic.com/magic-earth/)** (pour mobile
seulement)

**[Transformap Viewer](https://viewer.transformap.co/)**
<!-- vu sur https://twitter.com/transformap/status/964132834217725953 -->

**[Maps](https://f-droid.org/packages/com.github.axet.maps/)**
<!-- vu sur http://sebsauvage.net/links/?iZEHHw -->

**[OpenStreetCam](http://openstreetcam.org/)**
<!-- vu sur https://twitter.com/openstreetcam/status/967124790271078400 -->

**[OSRM](http://map.project-osrm.org/)**
<!-- vu sur https://linuxfr.org/news/proteger-sa-vie-privee-sur-le-web-exemple-avec-firefox -->

**[OpenStreetMap 2008](http://osmz.ru/osm2008.html)**
: Comparaison entre OpenStreetMap 2008 et OpenStreetMap d'aujourd'hui.
<!-- vu sur https://twitter.com/_vdct/status/968144893137838081 -->

**[Surveillance under Surveillance](https://kamba4.crux.uberspace.de/)** (carte
des caméras de surveillance)
<!-- vu sur https://framapiaf.org/@oaktree/100021143415518329 -->

**[F4map](http://demo.f4map.com)**
: Démonstration de l'affichage d'une carte avec les bâtiments en trois
  dimensions.

**[Transformap](http://transformap.co/)**
<!-- vu sur https://bob.mikorizal.org/notice/15770 -->

**[OpenTopoMap](https://opentopomap.org/)**
<!-- vu sur https://mamot.fr/@bauvens/102797677585259496 -->

**[BRouter](https://brouter.de/brouter-web/)**
<!-- vu sur https://linuxfr.org/news/brouter-un-calcul-d-itineraire-libre-pour-velo-mais-pas-que -->

**[Openrouteservice Maps](https://maps.openrouteservice.org/)**

Pour compléter ces cartes (et les rendre plus attractives que Google Maps),
n'hésitez pas à vous inscrire sur
[OpenStreetMap](https://www.openstreetmap.org/) pour modifier ce qui serait
incorrect ou compléter ce qui manque (numéros de rue, parkings, boulangeries,
commerces, etc.). Des applications mobiles comme
[StreetComplete](https://github.com/westnordost/StreetComplete/)
[Jungle Bus](https://junglebus.io/) ou peuvent vous assister.

Il est aussi possible de passer par le service de cartographie du gouvernement
français pour avoir une vue satellite :
[Géoportail](https://www.geoportail.gouv.fr/) (cependant, seule la France
semble nette ; voir aussi
[Géoportail - Carte IGN](https://www.geoportail.gouv.fr/donnees/carte-ign)).

L'IGN français (Institut national de l'information géographique et forestière)
propose aussi un comparateur de carte à travers le temps :
[Remonter le temps - IGN](https://remonterletemps.ign.fr/).

Et il est aussi possible de comparer plusieurs cartes différentes grâce à
l'outil [Map Compare](http://tools.geofabrik.de/mc/).

<!-- voir https://sebsauvage.net/wiki/doku.php?id=gps-android -->

## Suite bureautique

Les suites bureautiques sont peu nombreuses. On peut en citer essentiellement
deux que sont Microsoft Office et LibreOffice. Ici, c'est
**[LibreOffice](https://fr.libreoffice.org/)** qui va nous intéresser, car
Microsoft Office appartient à Microsoft.

Contrairement à Microsoft Office, LibreOffice est gratuit, libre et est gérée
par une organisation à but non lucratif.

LibreOffice, possède cependant deux logiciels en moins que Microsoft Office :

- Le client de messagerie (Outlook) ;
- Le logiciel de prise de note (OneNote).

Pour le client de messagerie, il suffit de lire la partie
« [Client de messagerie](#client-de-messagerie) », de télécharger un logiciel à
part.

Pour le logiciel de prise de note OneNote, je ne connais aucun logiciel libre
équivalent. Voici cependant une liste de logiciels (libres) de prise de note :
  [QOwnNotes](http://www.qownnotes.org/),
  [Laverna](https://laverna.cc/),
  [Simplenote](https://simplenote.com/),
  [Zim](http://www.zim-wiki.org/),
  [Turtl](https://turtlapp.com/),
  [cherrytree](http://www.giuspen.com/cherrytree/),
  [Lifeograph](http://lifeograph.sourceforge.net/wiki/Main_Page),
  [Standard Notes](https://standardnotes.org/).
Et quelques solutions plus techniques :
  [TagSpaces](https://www.tagspaces.org/),
  [Org mode](http://orgmode.org/),
  [Taskwarrior](https://taskwarrior.org/).

Ces solutions de prise de note peuvent aussi être utilisées comme des
alternatives à Evernote, Google Keep, Microsoft To-Do, etc.

Concernant les suites bureautiques,
[ONLYOFFICE](https://www.onlyoffice.com/fr/) semble être une alternative
intéressante, mais ne l'ayant pas assez essayé, je ne pourrais en dire plus.
Elle semble avoir assez peu de fonctionnalités mais semble pouvoir répondre aux
besoins de base.

D'autres alternatives (propriétaires) :

- [FreeOffice](http://www.freeoffice.com/en/) ;
- [WPS Office](https://www.wps.com/).

<!--

**Questions :** existe-t-il un équivalent libre à OneNote (de même niveau de
qualité) ? La suite bureautique [ONLYOFFICE](https://www.onlyoffice.com/fr/)
semble libre, est-elle de confiance ? est-elle complète ? Je ne l'ai testé que
rapidement, mais elle ne m'a pas convaincu.
{: .question }

-->

## Système d'exploitation

### Ordinateur

Nous allons nous attaquer à un gros morceau : le système d'exploitation. Il y
en existe trois grand public : Windows, macOS et Linux (parfois appelé
GNU/Linux).

Comme vous vous en doutez, Windows appartenant à Microsoft et macOS à Apple, le
système d'exploitation qui va donc nous intéresser ici est Linux.

Contrairement aux deux autres systèmes d'exploitation, Linux est libre et peut
être amélioré par n'importe qui ayant des connaissances informatique.  Aussi,
il fonctionne par « distributions » ; une distribution, c'est le système
d'exploitation (Linux) auquel on ajoute quelques surcouches : pilotes,
logiciels, environnement graphique, environnement de bureau, etc.

Cela fait donc que vous ne téléchargez pas Linux mais une distribution (qui
contient Linux). Et il existe beaucoup de distributions :

- **[Ubuntu](https://www.ubuntu.com/)** ;
- **[Debian](https://www.debian.org/)** ;
- **[Arch Linux](https://archlinux.fr/)** ;
- **[Fedora](https://getfedora.org/)** ;
- **[Linux Mint](https://linuxmint.com/)** ;
- **[Gentoo](https://www.gentoo.org/)** ;
- **[openSUSE](https://www.opensuse.org/)** ;
- **[Manjaro](https://manjaro.org/)** ;
- **[Mageia](https://www.mageia.org/fr/)** ;
- **[elementary OS](https://elementary.io/)** ;
- **[Solus](https://solus-project.com/)** ;
- [Et bien d'autres](https://fr.wikipedia.org/wiki/Liste_des_distributions_Linux) ;
- *[Bien choisir sa distribution GNU/Linux – 2018](http://frederic.bezies.free.fr/blog/?page_id=17076)*.

Les deux plus connues du grand public sont [Ubuntu](https://www.ubuntu.com/) et
[Linux Mint](https://linuxmint.com/), c'est donc l'une de celle-ci que je vous
conseille pour débuter.

Concernant l'installation, elle n'est pas insurmontable mais peut s'avérer
complexe pour des personnes n'ayant pas assez de connaissances informatiques.
Pour ces personnes-là, il est conseillé de demander à quelqu'un de votre
entourage, qui s'y connait, de vous aider ; cette personne pourra vous aider à
l'installation, à la configuration, à la personnalisation et vous assister en
cas de problème.

Pour l'utilisation, une fois installée, elle ne change guère de Windows pour
les usages basiques que sont la navigation internet, l'impression de documents,
l'affichage de photos et de vidéos, le traitement de texte, etc. Il y a bien
sûr un temps d'adaptation : c'est nouveau, l'interface change, mais, cela n'est
pas insurmontable.

Pour des usages plus avancés, cela dépend de l'usage, je ne vais pas m'étendre
là-dessus, excepté que Linux est très adapté au développement informatique.

Pour ceux qui ont absolument besoin d'un logiciel qui n'est pas disponible sur
une distribution Linux mais qui est disponible sur Windows, il est possible
d'utiliser [Wine](https://www.winehq.org/), un logiciel qui permet d'installer
des applications Windows sur Linux ; toutes ne sont pas compatibles, mais cela
peut pallier certains manques.

**À savoir :** il y existe d'autres systèmes d'exploitation comme
[BSD](https://fr.wikipedia.org/wiki/Berkeley_Software_Distribution) qui est,
comme Linux, distribué par « distributions » (ce n'est pas exactement ça, mais
on s'en contentera) ou [ReactOS](https://www.reactos.org/) qui essaye de
reproduire l'environnement de Windows, mais en *tout-libre*. Ces solutions sont
cependant moins grand public et ReactOS est encore au stade d'alpha, et ce
depuis un certain temps.

### Mobile

Les deux grands systèmes d'exploitation mobiles que sont Android et iOS,
appartiennent respectivement à Google et Apple, deux géants de l'industrie du
numérique.

Voici donc quelques solutions alternatives :

**[LineageOS](http://lineageos.org/)**
: Il s'agit d'une version d'Android qui ne vous bride pas : vous avez un accès
  total à tout le contenu de votre téléphone. Cela vous permet de vous
  débarrasser des applications Google et des applications constructeur.

**[Replicant](https://www.replicant.us/)**
: Similaire à LineageOS, excepté que la vision du *tout-libre* est une
  composante majeure du projet.

**[Sailfish OS](https://sailfishos.org/)**
: Système d'exploitation pour mobile compatible avec la plupart des
  applications Android. Toutes les composantes ne sont cependant pas libres.

**[OmniROM](https://omnirom.org/)**
: Semblable à LineageOS.

**[Librem 5](https://puri.sm/shop/librem-5/)**
: Il ne s'agit pas là d'un système d'exploitation mais d'un téléphone qui
  embarque une distribution Linux prévue pour mobile. Le logiciel libre et le
  respect de la vie privée sont au cœur du projet.

**[/e/](https://e.foundation/)**

**[postmarketOS](https://postmarketos.org/)**

**[Copperhead](https://copperhead.co/android/)**

Aussi, il est possible de ne plus passer par le Play Store et de n'utiliser que
des applications libres en utilisant le magasin d'applications
**[F-Droid](https://f-droid.org/)** (et pour les exceptions, il est possible
d'utiliser
[Yalp Store](https://f-droid.org/packages/com.github.yeriomin.yalpstore/) ou
[Aurora Store](https://f-droid.org/fr/packages/com.dragons.aurora/)).

Autres outils intéressants :

- [microG](https://microg.org/) qui réimplémente l'API Google, de façon libre,
  pour pouvoir se passer de Google ;
- [microG pour Lineage](https://lineage.microg.org/) ;
- [Xposed](http://repo.xposed.info/), qui permet de captrer tout ce qu'il se
  passe sur le téléphone, pour par exemple modifier les permissions d'une
  application qui semble fouiner là où elle ne devrait pas.

## Traduction

Google Traduction, même s'il s'agit d'un très bon service, est un outil de
Google, que nous allons donc tâcher d'éviter. Voici comment :

- [DeepL](https://www.deepl.com/translator), un traducteur performant. Il est
  aussi accessible sous forme d'extension Firefox : [DeepLT, extension
  Firefox](https://addons.mozilla.org/fr/firefox/addon/deeplt/) ;
- [Wiktionnaire](https://fr.wiktionary.org/), un dictionnaire en ligne qui
  affiche aussi les traductions d'un terme donné ;
- [Linguee](https://www.linguee.com/), qui propose des traductions selon des
  textes sources traduits par des humains (c'est la même entreprise qui propose
  Linguee et DeepL).

Malheureusement, DeepL et Linguee ne sont pas libres, mais cela permet tout de
même de diversifier les sources.

Si les traductions ne vous conviennent pas, vous pouvez toujours les croiser
avec d'autres outils comme [Yandex Traduction](https://translate.yandex.com/),
[Bing Traduction](https://www.bing.com/translator/) et [Google
Traduction](https://translate.google.fr/). Et oui, en effet, il s'agit des
outils que nous souhaitons éviter, mais il est parfois intéressant de croiser
les sources. De plus, ces outils proposent actuellement plus de langues que
DeepL.

## Messagerie

### Service de messagerie

Les services de messagerie les plus utilisés sont ceux de GMail, Outlook,
Laposte ou ceux des fournisseurs d'accès internet.

Cependant, dans tous ces cas, vos conversations peuvent être lues. L'idée est
donc de trouver un service qui chiffre vos messages ou qui respectent votre vie
privée en garantissant ne pas lire vos messages. En voici quelques-uns :

**[Protonmail](https://protonmail.com/)**
: Client web libre/open source, facile d'utilisation. Disponible en version
  gratuite avec un espace de stockage de 500 Mo (bien suffisant pour un usage
  simple ; encore plus si on efface ses messages). Et pour quelques euros par
  mois, un plus grand espace disponible ainsi que d'autres avantages. Données
  enregistrées sur des serveurs en Suisse.

**[Tutanota](https://tutanota.com/fr/)**
: 1 Go de stockage gratuit et plus pour quelques euros par mois.

**[disroot.org](https://disroot.org/services/email)**
: Entièrement gratuit, financé par les dons.

**[mailbox.org](https://mailbox.org/en/)**
: 2 Go d'espace de stockage à partir d'un euro par mois.

**[Posteo](https://posteo.de/fr/)**
: 2 Go d'espace de stockage à partir d'un euro par mois.

**[Mailden](https://www.mailden.net/)**
: Trois euros par mois.

**[StartMail](https://www.startmail.com/)**
: 10 Go de stockage pour environ cinquante euros par an. Données enregistrées
  sur des serveurs en Allemagne.

**[Net-C](https://www.netcourrier.com/)**
: Gratuit. Basé en Europe.

**[Lilo Mail](https://mail.lilo.org/)**
: Gratuit, hébergé en France, avec le respect de la vie privée et de
  l'environnement comme priorités.

**[MsgSafe](https://www.msgsafe.io/)**

<!--

À étudier :

- https://www.autistici.org/
- https://riseup.net/
- Offre de Gandi avec SOGo ou Roundcube
- https://www.fastmail.com/
- Mailden

-->

Changer d'adresse électronique est moins délicat qu'il n'y parait, voici une
idée de procédure à suivre :

- Créer votre nouvelle adresse électronique sur le service de votre choix ;
- Configurer votre ancienne adresse électronique pour que les messages qui
  arrivent dessus soient retransmis sur la nouvelle (cela se configure dans
  les paramètres de votre ancienne boite) ;
- Quand vous vous inscrivez sur un site ou que vous donnez votre adresse
  électronique à quelqu'un, fournissez votre nouvelle adresse ;
- Prenez le temps, si vous le désirez, d'aller modifier sur les sites où vous
  êtes déjà inscrit, de changer votre adresse électronique pour la nouvelle
  (cela peut être fait peu à peu, rien de pressant).

Ainsi, vous continuerez à recevoir les messages qui atterrissent sur votre
ancienne boite de messagerie, et peu à peu, votre ancienne boite de messagerie
sera oubliée (par vous et par les services que vous utilisez).

**[Voir une liste de services de messagerie conseillés par Damien sur
Blog-Libre](https://www.blog-libre.org/2017/09/21/messagerie-email-ethique-comment-preserver-sa-vie-privee-et-celle-de-son-entourage/)**.

<!--

Propositions de Damien :

OK : Tutanota, ProtonMail, Infomaniak, Vivaldi, Runbox, StartMail, Kolab Now
     Mailfence, Ox.io, Posteo, Mailbox.

POURQUOI PAS : OVH, Gandi, Yulpa, Net C, Zaclys, mail.be, riseup, Autistici,
               Gozmail.bzh, Fastmail (https://www.fastmail.com/), Unseen.

À ÉVITER : Yahoo, YandexMail, OpenMailBox, Gmail, GMX, Outlook, La Poste,
           Scryptmail, Zoho.

-->

### Client de messagerie

Le client de messagerie, à l'opposé du *webmail* qui vous permet de lire vos
courriels via un navigateur, vous permet de lire vos courriels via un logiciel.
Le client le plus connu est Outlook (appartenant à Microsoft). Voici quelques
alternatives.

Clients que j'ai pu tester :

- **[Thunderbird](https://www.mozilla.org/fr/thunderbird/)** ;
- **[Claws Mail](http://www.claws-mail.org/)**.

Clients que je n'ai pas testé :

- **[K-9 Mail](https://k9mail.github.io/)** (pour mobile seulement).

<!--

À étudier :

- mutt (client de messagerie dans le terminal)

-->

## Discussion en ligne

Le domaine de la discussion en ligne est assez chaotique et part un peu dans
tous les sens. Mais voici quelques alternatives intéressantes.

### Discussions textuelles

Skype appartenant à Microsoft et Discord n'étant pas tout rose, il est
nécessaire de trouver des alternatives. En voici quelques-unes :

IRC
: Il s'agit d'un protocole dont voici quelques projets l'utilisant :

  - **[freenode](https://webchat.freenode.net/)** ;
  - **[QuakeNet](https://webchat.quakenet.org/)** ;
  - **[Mibbit](https://chat.mibbit.com/)**.

XMPP
: Il s'agit là aussi d'un protocole. Voici quelques projets l'utilisant :
  - **[Movim](https://fr.movim.eu/)** ;
  - **[Gajim](https://gajim.org/)** ;

**[Mattermost](https://about.mattermost.com/)**
: Ressemble beaucoup à Discord, excepté que là, chacun peut installer une
  instance (exemple d'instance : **[Framateam](https://framateam.org/)**).

[Matrix](http://matrix.org/)
: Là aussi, il s'agit d'un protocole, dont le principal usage actuel est
  [Riot](https://riot.im/). Il ressemble beaucoup à Mattermost : chacun peut
  créer une instance (exemple d'instance :
  **[instance officielle](https://riot.im/app/)**).

**[Tox](https://tox.chat/)**
: Logiciel gratuit et libre. Conversations chiffrées.

**[Rocket.chat](https://rocket.chat/)**
: Ressemble lui aussi beaucoup à Mattermost : chacun peut créer une instance.

**[Wire](https://wire.com/)**
: Gratuit, libre. Conversations chiffrées.

**[Gitter](https://gitter.im/)**
: Gratuit, libre.

**[Signal](https://whispersystems.org/)** (sur mobile seulement)
: Entièrement libre. Le tout est assez classique. Il permet de discuter avec un
  chiffrement de bout en bout.

**[Ring](https://ring.cx/)**
: Article intéressant sur le sujet : https://www.libre-parcours.net/post/silence-ou-signal/
  <!-- vu sur https://mstdn.fr/@taziden/99570338647546362 -->

**[Delta Chat](https://delta.chat/fr/)** (sur mobile seulement pour l'instant)
<!-- vu sur https://framapiaf.org/@sebsauvage/100725368592097778 -->

**[Ensichat](https://f-droid.org/packages/com.nutomic.ensichat/)** (sur mobile
seulement)
<!-- vu sur https://maly.io/@marsxyz/99852191875002035 -->

**[Zulip](https://zulipchat.com/)**

**[Miaou](https://miaou.dystroy.org/)**

**[Talkyard](https://www.talkyard.io/)**

Une autre alternative existe, mais elle est plus controversée, il s'agit de
[Telegram](https://telegram.org/) : le client est libre mais le serveur est
propriétaire. De plus, par défaut, les conversations ne sont pas chiffrées.

<!-- @todo Ajouter des clients pour XMPP/IRC/Matrix/etc. -->

### Discussions audio/vidéo

Tous les logiciels ci-dessus ont aussi une fonction audio/vidéo. Mais voici
ceux qui sont le plus adaptés à cela :

- **[Signal](https://whispersystems.org/)** (sur mobile seulement) ;
- [Telegram](https://telegram.org/), mais comme expliqué plus haut, cette
  solution est controversée.

Cependant, certains sont spécialisés là-dedans et ne font que ça :

- [Jitsi Meet](https://jitsi.org/jitsi-meet/) (**[instance
  officielle](https://meet.jit.si/)**,
  **[Framatalk](https://framatalk.org/)** et
  **[La Quadrature du Net](https://chat.lqdn.fr/)**). Avantages : ne nécessite
  aucune installation ni inscription. Il n'y a qu'un lien à partager ;
- **[Linphone](http://linphone.org/)**.

Ce n'est pas exhaustif, mais c'est déjà une bonne base.

Toutes ces alternatives permettent de se passer de logiciels comme Messenger,
Slack, Hangouts, etc.

## SMS/MMS

Plutôt que d'utiliser l'application SMS/MMS de base de téléphone, il est
possible d'utiliser d'autres services, qui permettent de chiffrer vos messages
dans le cas où l'utilisateur avec qui vous discutez utilise la même application
que vous. Si l'utilisateur n'utilise pas la même application que vous, cela ne
fera que remplacer l'application SMS/MMS de base, l'utilisation sera la même.
Donc, un tel remplacement est transparent pour vous comme pour vos contacts.

- **[Signal](https://whispersystems.org/)** ;
- **[Silence](https://silence.im/)** ;
- **[Briar](https://briarproject.org/)**.

## Transfert de fichiers

Pour le transfert de fichiers, il est possible de passer par un service comme
WeTransfer, sauf que :

- Il s'agit d'un logiciel propriétaire ;
- Il y a de la publicité dans la version gratuite ;
- On ne sait pas ce qui est fait avec nos fichiers ;
- Le lien de téléchargement du fichier s'envoie forcément par courriel ;
- Pas le choix de la durée de vie du fichier dans la version gratuite ;
- Fichiers non chiffrés (donc, lisibles par WeTransfer), peu idéal pour le
  transfert de données confidentielles.

Pour cela, il y existe les alternatives suivantes qui corrigent tous les points
présentés ci-dessus :

- **[Framadrop](https://framadrop.org/)**, une instance de
  [Lufi](https://framagit.org/luc/lufi) ;
- **[Firefox Send](https://send.firefox.com/) ;
- **[Framapic](https://framapic.org/)**
  (seulement pour les images).

D'autres alternatives existent mais ne corrigent pas tous les points
précédents (seulement quelques-uns) :

- **[Drop Unixcorn](https://drop.unixcorn.org/)** ;
- **[Jirafeau](http://jirafeau.net/)** ;
- **[Firefox Send](https://send.firefox.com/)**.

## Réseau social

Bon, il faut l'avouer, se passer de tout ce qui a été dit précédemment est
parfois assez difficile, mais le réseau social est le plus délicat, car il faut
arriver à faire déplacer ses contacts vers un autre réseau, chose très
difficile, mais parlons ici simplement de quelques alternatives :

**Diaspora\*\**
: Diaspora\* (aussi nommé D\*) est un réseau social décentralisé, c'est-à-dire
  qu'il est composé d'instances : il n'y a pas un point central qui possède
  toutes les données comme les réseaux sociaux connus, mais qu'il y a plusieurs
  nœuds qui communiquent entre eux : tout le monde ayant la possibilité de
  créer un nœud (avec des connaissances techniques). Il permet de remplacer
  Facebook.

  Présentation non exhaustive des pratiques de Facebook :
  <https://joachimesque.com/blog/2018-03-24-il-faut-se-me%CC%81fier-de-facebook-version-rapide>

  Quelques instances :

  - **[Framasphère\*](https://framasphere.org/)** ;
  - **[diaspora-fr\*](https://diaspora-fr.org/)** ;
  - **[JoinDiaspora\*](https://joindiaspora.com/)** ;
  - [Liste des instances](https://podupti.me/).

**Mastodon**
: Mastodon est un réseau social décentralisé comme Diaspora\*, mais qui
  ressemble plus à Twitter.

  Voici quelques instances :

  - **[mamot.fr](https://mamot.fr/)** (celle sur laquelle je suis, gérée par
    [La Quadrature du Net](https://www.laquadrature.net/fr/)) ;
  - **[unixcorn.xyz](https://unixcorn.xyz/)** ;
  - **[mastodon.xyz](https://mastodon.xyz/)** ;
  - **[m.g3l.org](https://m.g3l.org/)** ;
  - **[framapiaf.org](https://framapiaf.org/)** (gérée par
    [Framasoft](https://framasoft.org/)) ;
  - [Une liste plus exhaustive des
    instances](https://joinmastodon.org/)
    (et [une autre](https://instances.social/list)).

  <!--

  - [masto.svnet.fr](https://masto.svnet.fr/) ;
  - [miaou.drycat.fr](https://miaou.drycat.fr/) ;
  - [mastodon.zaclys.com](https://mastodon.zaclys.com/) ;
  - [mastodon.roflcopter.fr](https://mastodon.roflcopter.fr/) ;
  - [pouet.outils-conviviaux.fr](https://pouet.outils-conviviaux.fr/) ;
  - [mastodon.indie.host](https://mastodon.indie.host/) ;
  - [toot.aquilenet.fr](https://toot.aquilenet.fr/) ;
  - [mastodon.gougere.fr](https://mastodon.gougere.fr/) ;
  - [mstdn.fr](https://mstdn.fr/) ;
  - [mastodon.tetaneutral.net](https://mastodon.tetaneutral.net/)

  -->

La vie privée est mieux préserver quand l'application est décentralisée, car
les données sont éparpillées un peu partout, et il est possible de ne pas se
connecter à des instances si on le souhaite, pour par exemple créer un petit
réseau social d'entreprise ou d'association. Aussi, votre IP est enregistrée
sur le serveur de votre instance et pas sur les autres.

<!--

Secure Scuttlebutt (SSB)

**[Patchwork](https://github.com/ssbc/patchwork)**

**[Manyverse](https://www.manyver.se/)**

-->

<!--

@todo Retrouver des alternatives gratuites ou peu chères pour le stockage en
      ligne

## Stockage en ligne

Google Drive appartenant à Google et OneDrive à Microsoft, voici quelques
alternatives :

**[hubiC](https://hubic.com/fr/)**
: 25 Go de stockage gratuit. Et bien plus pour pas cher. Il s'agit d'un service
  proposé par OVH, un hébergeur français, les données sont stockées en France.
  Un défaut connu du service est par contre sa lenteur.

**[OX App Suite](https://ox.io/)**
: 2 Go de stockage gratuit (l'application est un peu plus détaillée dans la
partie [Édition collaborative de
documents](#dition-collaborative-de-documents)).

Pour le stockage en ligne, il peut être intéressant d'utiliser un outil de
chiffrement local comme [Cryptomator](https://cryptomator.org/). Ainsi, vous
seuls êtes en mesure de lire les fichiers.

-->

## Édition collaborative de documents

Pour l'édition de document en ligne ou en collaboration, il est d'habitude de
passer par des services comme Google Docs ou Office Online, respectivement des
services de Google et Microsoft. Mais il existe des alternatives, certes moins
abouties pour l'instant, mais qui ont l'avantage de ne pas vous pister, et
d'alimenter la concurrence :

**[CryptPad](https://www.cryptpad.fr/)**
: Éditeur de texte, éditeur de code, édition de diaporama et création de
  sondage. Il propose en plus un « *drive* », équivalent de Google Drive, qui
  permet de stocker des fichiers en ligne (50 Mo gratuits).

**[Framapad](https://framapad.org)** et **[Framacalc](https://framacalc.org/)**
: Framapad permet l'édition de documents textes. Il s'agit d'une instance
  d'[Etherpad](http://etherpad.org/) parmi
  [d'autres](https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite).

  Framacalc permet l'édition d'un tableur. Il s'agit d'une instance
  d'[Ethercalc](https://ethercalc.net/).

<!--

**[OX App Suite](https://ox.io/)**
: Semblable à Google Drive ou OneDrive, avec une adresse de messagerie, pour
  accéder à vos courriers électroniques, un gestionnaire de contacts, un
  calendrier, un gestionnaire (sommaire) de tâches et du stockage en ligne (le
  *drive*). Il est possible d'éditer en ligne et collaborativement des
  documents textes, des présentations (diaporamas) et des tableurs. 2 Go
  d'espace disque gratuitement.

@todo OX App Suite a fermé. mailbox.org constitue une alternative car se base
      sur le même code, mais pour 1 € par mois au lieu d'être grauit.

-->

**[Personal ONLYOFFICE](https://personal.onlyoffice.com/)** semble aussi être
une alternative intéressante pour l'édition collaborative de documents.

## Suivre l'actualité

Si vous souhaitez suivre l'actualité de certains sites, inutile d'aller visiter
chaque jour le site en question, inutile d'utiliser Google Actualités, Facebook
ou Twitter, il suffit d'utiliser un agrégateur de flux RSS.

Un flux RSS, c'est un fichier fournit par un site internet qui liste les
actualités/activités du site. Ces fichiers ne sont pas à destination des
humains mais plutôt à destination des agrégateurs (logiciels).

La procédure à suivre est très simple : vous vous inscrivez sur un site
agrégateur puis vous listez les sites dont vous souhaitez suivre l'actualité.
Ensuite, dès qu'il y aura une activité (par exemple, un nouvel article de blog,
une actualité...), vous en serez averti.

Voici une liste d'agrégateurs :

**[NewsBlur](http://newsblur.com/)**

**[Thunderbird](https://www.mozilla.org/fr/thunderbird/)**
: En plus d'être un client de messagerie, le logiciel fait aussi office
  d'agrégateur.

**[CommaFeed](https://www.commafeed.com/)**

**[QuiteRSS](https://quiterss.org/)**

**[Liferea](https://lzone.de/liferea/)**

**[Akregator](https://userbase.kde.org/Akregator)**

**[Sismics Reader](https://www.sismics.com/reader/)**

**[FeedReader](https://jangernert.github.io/FeedReader/)**

Une autre alternative est [Claws Mail](http://www.claws-mail.org/), qui,
comme Thunderbird, est un client de messagerie, mais il peut aussi faire
agrégateur, avec l'extension « RSSyl ».

Il est aussi possible, pour remplacer Google Actualités, d'effectuer une
recherche sur [Qwant](https://www.qwant.com/), qui a une interface dédiée à
l'affichage des actualités. DuckDuckGo fait aussi cela, mais il semble que ce
soit réservé à l'anglais pour l'instant.

Un article qui aide à la transition d'abonnements YouTube vers l'utilisation
d'un flux RSS.
[La cloche de Youtube? Je m'en fous](http://etnadji.fr/blog/?d=2017/05/23/16/42/52-la-cloche-de-youtube-je-men-fous)

<!-- @todo Expliquer que le flux RSS peut être utilisé pour suivre l'actualité,
           remplacer les abonnements YouTube, etc. -->

<!-- https://github.com/getstream/winds -->

<!--

## YouTube

S'abonner à l'URL suivante (où `NNNN` est le code de la chaine) :
`https://www.youtube.com/feeds/videos.xml?channel_id=NNNN`

[hooktube Redirector](https://addons.mozilla.org/fr/firefox/addon/hooktube-redirector/)

[PeerTube](https://joinpeertube.org/fr/) (à faire : lister des instances intéressantes où s'inscrire)

[Sur le sujet de PeerTube](https://tkpx.wordpress.com/2018/05/26/peertube/)

-->

## Musique

Pour remplacer Spotify et Deezer, il est possible d'utiliser
[Bandcamp](https://bandcamp.com/). Bandcamp rémunère mieux les artistes, mais
vous y trouverez plus d'artistes indépendants et moins de musiques de grosses
industries (pas de VEVO par exemple). Il est bien sûr possible d'utiliser deux
(ou plus) plateformes de musique simultanément.

<!--

Discussions en rapport :

- https://framapiaf.org/@madsugar/99830525480825010
- https://mstdn.io/@angristan/99831350912366919

-->

## Aller plus loin

Privilégiez :

- Les outils d'organismes à but non lucratifs, d'organismes transparents et le
  logiciel libre/open source ;
- Sur mobile, Firefox ou Firefox Focus à Chrome ou autre ;
- Des téléphones comme le Fairphone ou le Librem 5 aux autres ;
- Des FAI associatifs ou un FAI comme OVH plutôt que les plus connus ;
- Une démarche écologique : évitez de changer vos appareils trop régulièrement,
  s'ils sont encore fonctionnels, évitez le gaspillage en tout genre, etc. Cela
  n'est pas directement lié au pistage, mais suivre une démarche écologique est
  important, comme de ne pas accepter le pistage.

Évitez :

- Les appareils connectés tels que les montres, les lunettes ou les stations,
  ils fournissent bien trop d'informations sur votre vie privée (notamment les
  stations) ;
- D'utiliser les outils comme Cortana (Microsoft), Siri (Apple) ou l'assistant
  vocal de Google ;
- Les réseaux sociaux comme Facebook, Google+, Twitter, Snapchat, Instagram,
  etc. ;
- D'utiliser Uber, d'acheter une liseuse Kindle, un assistant Google Home, un
  assistant Amazon Echo, un routeur Google Wi-Fi, etc.

Etc. etc. etc.

## Quelques liens intéressants

- La publicité en ligne,
  [(1) c’est quoi, la
  publicité ?](http://pixellibre.net/2017/10/publicite-ligne-episode-1-cest-quoi-publicite/),
  [(2) qu’est-ce qui est
  collecté ?](http://pixellibre.net/2017/10/publicite-ligne-episode-2-quest-collecte/),
  [(3) les problèmes liés à la
  publicité](http://pixellibre.net/2017/10/publicite-ligne-episode-3-problemes-lies-a-publicite/) ;
- [Comment les entreprises surveillent notre
  quotidien](https://framablog.org/2017/10/25/comment-les-entreprises-surveillent-notre-quotidien/) ;
- [Kit de sécurité numérique](https://rsf.org/fr/kit-de-securite-numerique) ;
- [Derrière les assistants vocaux, des humains vous entendent - La Quadrature
  du Net](https://www.laquadrature.net/en/temoin_cortana) ;
- [switching.social](https://switching.social/) ;
- [Utiliser son Android de façon plus sécurisée](https://linuxfr.org/news/utiliser-son-android-de-facon-plus-securisee) ;
- [Privacy Tools](https://www.privacytools.io/) ;
- [Alternatives to Google Products – the Complete List (2019)](https://restoreprivacy.com/google-alternatives/).

## Et ainsi de suite

Il y a tellement de domaines, tellement d'offres, que je n'ai pas tout essayé,
et être exhaustif est impossible.

Aussi, je n'ai pas cité mes sources, car je n'ai pas de réelles sources. Il
s'agit plus d'outils que j'ai découvert aux travers d'articles ou que j'ai
recherché. Si vous souhaitez en savoir plus sur un outil présenté, je vous
invite donc à recherche plus d'informations sur celui-ci sur internet.

Si vous pensez qu'il manque la présentation d'un outil, d'une section complète,
qu'une description est mauvaise, qu'un outil ne devrait pas être présent, qu'il
y a une faute d'orthographe ; bref, pour un peu tout, n'hésitez pas à me
contacter. <!-- @todo Un moyen de contact -->

Pour les utilisateurs plus expérimentés, je conseille en supplément la lecture
de [Se protéger du pistage, pour les utilisateurs
expérimentés]({{ '/dossiers/se-proteger-du-pistage-utilisateurs-experimentes/' | url }}).

<!--

CHATONS
[Zaclys](https://zaclys.com/)
[Colibris Outils libres](https://www.colibris-outilslibres.org/)

Comme mastodon ? https://project.hubzilla.org/page/hubzilla/hubzilla-project

-->

<!--

Pour info :

- Une instance est la mise en ligne d'une solution. Par exemple, Mattermost est
  un logiciel qui permet de créer un chat. Mattermost n'est donc pas en
  lui-même un chat utilisable par quiconque, il faut que quelqu'un mette en
  place la solution, et on appelle cela une « instance » ;
- Le clic-molette ou « Clic droit > Ouvrir le lien dans un nouvel onglet »
  permet d'ouvrir le lien sans avoir à quitter la page, permettant d'éviter de
  faire des aller-retours ;
- Un logiciel open source est un logiciel donc le code source est mis en ligne.
  C'est-à-dire que la « recette » du logiciel est publique et que les
  développeurs peuvent analyser le source code ;
- Un logiciel libre est un logiciel open source avec une philosophie un peu
  plus poussée, qui invite au partage ;
- L'avantage d'un protocole ouvert est que les logiciels peuvent ainsi être
  interopérable. Ainsi, l'utilisateur n'est pas limité à un logiciel mais à
  une multitude et peut choisir ce qu'il préfère.

-->

<!--

Interrogations :

- Parler des alternatives à Amazon (intéressant : https://blog.genma.fr/?Degoogliser-d-accord-mais-demamazoner)
- Parler des alternatives pour les montres connectés (https://asteroidos.org/, https://gadgetbridge.org/)
- https://hostux.net/

-->

<!--

https://geek-mexicain.net/comment-quitter-definitivement-le-monde-de-google-en-24-heures

-->

<!--

Assistants vocaux :

- Snips : http://linuxfr.org/news/snips-ouvre-sa-technologie-nlu
- Mycroft (https://mycroft.ai/)
- LinTO (https://linto.ai/)
- SUSI.AI (https://chat.susi.ai/overview)
- Kalliope (https://kalliope-project.github.io/)

-->

<!--

Dans le même genre que Framasoft, Hostux :

- https://hostux.net/

-->

<!--

Il faudrait présenter un peu plus le logiciel libre pour ceux qui ne
connaissent pas.

-->
