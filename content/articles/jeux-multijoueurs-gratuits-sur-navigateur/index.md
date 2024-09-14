+++
title = "Jeux multijoueurs gratuits sur navigateur"
date = 2020-11-21
updated = 2022-07-10
short_description = "Jeux par navigateur."
+++

{% macro show_games(games) %}
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {% for game in games %}
      <article class="bg-stone-100 dark:bg-gray-600 rounded shadow-lg">
        <a href="{{ game.url }}" class="block p-4 pt-2 bg-stone-200 dark:bg-gray-700 rounded-t transition hover:bg-stone-300 dark:hover:bg-gray-900 focus-visible:outline-none focus-visible:ring">
          <header class="flex">
            <div>
              <h3 class="underline font-bold text-xl">
                {{ game.name }}
              </h3>

              <div class="mt-1">
                <span class="text-sm text-black bg-{% category_to_color game.category %}-300 py-0.5 px-2 rounded-full">
                  {% category_to_string game.category %}
                </span>
              </div>
            </div>

            <div class="ml-auto mt-2" aria-hidden="true">
              {# Heroicon name: medium link #}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </header>
        </a>

        <div class="p-4">
          <div class="text-stone-700 dark:text-gray-300 text-sm">
            <div class="flex items-center">
              <div>
                {# Heroicon name: small users #}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"  width="20" height="20" aria-hidden="true">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>

              <p class="ml-2">
                {% minmax_players_to_string game.min_players, game.max_players %}
              </p>
            </div>
          </div>

          <p class="pt-2">
            {% if game.description %}
              {% markdown %}{{ game.description }}{% endmarkdown %}
            {% else %}
              <span class="text-stone-700 dark:text-gray-300 text-sm italic">
                Pas de description.
              </span>
            {% endif %}
          </p>
        </div>
      </article>
    {% endfor %}
  </div>
{% endmacro %}

{% markdown %}

<details class="group bg-white dark:bg-gray-900 rounded">
  <summary class="cursor-pointer bg-stone-200 dark:bg-gray-700 p-3 rounded group-open:rounded-none group-open:rounded-t transition hover:bg-stone-300 dark:hover:bg-gray-600 focus-visible:outline-none focus-visible:ring">
    Voir l'introduction et les critères d'admissibilité d'un jeu
  </summary>

  <div class="p-4">

  Parfois, il arrive qu'on souhaite jouer avec des amis ou des connaissances à
  des jeux, que ce soit en vocal ou non. Cela est possible avec tous les jeux en
  ligne. Mais ici, on va s'intéresser au genre très particulier du jeu en ligne
  facilement accessible, auquel on accède gratuitement via le navigateur.

  ## Critères

  Voici les critères que j'ai mis en place pour accepter un jeu ou non : le jeu
  doit être accessible via un navigateur, être gratuit et être jouable sans
  création de compte.

  - **Être accessible via un navigateur**, comme ça tout le monde peut jouer,
    peu importe le système d'exploitation, sans perdre de temps à devoir
    installer un jeu ;
  - **Être gratuit**, pour être sûr que ça convienne à toutes les bourses et ne
    pas perdre du temps à acheter le jeu ;
  - **Pas d'obligation de créer un compte**, pour ne pas perdre de temps et ne
    pas donner ses informations personnelles ;
  - **Avoir la possibilité de créer des salons privés**, pour pouvoir jouer
    seulement entre amis ;
  - **En temps réel (pas d'attente d'évènements côté serveur)**, pour éviter des
    limitations artificielles ;
  - **Jouable dès 2 joueurs**, pour pouvoir jouer avec un seul ami ;
  - ***Si possible*, être en français**, pour que tout le monde puisse y jouer
    sans avoir de connaissance de l'anglais (ou tout autre langue) ;
  - ***Si possible*, avoir des parties courtes** (ou du moins qui *peuvent* être
    courtes), pour que n'importe qui puisse venir au milieu d'une partie ;
  - ***Si possible*, simple à prendre en main**, pour éviter de perdre du temps
    à devoir expliquer les règles.

  Tous ces critères servent à un objectif commun : rendre l'accès au jeu
  immédiat. On se rend sur le site, on crée une partie privée et on partage le
  lien à ses amis, sans aucune friction.

  </div>
</details>

## Jeux

Voici les jeux qui, *à ma connaissance, et en l'état actuel des choses*,
respectent les critères définis.

Note : le tri est purement arbitraire, à l'appréciation de l'auteur de cet
article.

{% endmarkdown %}

<div class="not-prose">
  {{ show_games(browser_games.games) }}
</div>

{% markdown %}

## Autres jeux

Voici quelques autres jeux qui ne respectent pas strictement les critères, mais
qui restent intéressants à explorer et dans le même concept.

{% endmarkdown %}

<div class="not-prose">
  {{ show_games(browser_games.other_games) }}
</div>
