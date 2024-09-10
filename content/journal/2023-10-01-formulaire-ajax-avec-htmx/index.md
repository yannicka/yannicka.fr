+++
title = "Formulaire AJAX avec htmx"
+++

Imaginons que vous ayez une structure HTML comme celle-ci :

```html
<div>
  <label for="category">Catégorie</label>
  <select id="category" name="category">
    <option>Catégorie 1</option>
    <option>Catégorie 2</option>
    <option>Catégorie 3</option>
  </select>

  <label for="country">Pays</label>
  <select id="country" name="country">
    [...]
  </select>

  <label for="position">Position</label>
  <select id="position" name="position">
    [...]
  </select>
</div>

<div class="result"></div>
```

Et vous souhaitez que lorsque l'utilisateur sélectionne une valeur, une requête s'exécute avec les valeurs renseignées, et que la réponse HTML aille dans `.result`.

Une façon naïve de faire est la suivante :

```js
// 1. Récupérer les éléments.
const categorySelect = document.querySelector('[name="category"]');
const countrySelect = document.querySelector('[name="country"]');
const positionSelect = document.querySelector('[name="position"]');

const resultElement = document.querySelector('.result');

// 2. Ajouter un évènement à chaque champ (pour exécuter la requête au
//    changement de valeur).
categorySelect.addEventListener('change', () => {
  executeQuery();
});

countrySelect.addEventListener('change', () => {
  executeQuery();
});

positionSelect.addEventListener('change', () => {
  executeQuery();
});

// 3. Fonction pour exécuter la requête.
async function executeQuery() {
  const form = new FormData();
  form.append('category', categorySelect.value);
  form.append('country', countrySelect.value);
  form.append('position', positionSelect.value);

  const result = await fetch('/url-a-appeler', {
    method: 'POST',
    body: form,
  }).then(res => res.text());

  resultElement.innerHTML = result;
}

// 4. Exécuter la requête au chargement de la page.
executeQuery();
```

On peut faire plus simple (notamment en utilisant un `form`), mais en finalité on se rapprocherait toujours d'un résultat assez similaire.

Une autre manière de faire, c'est d'utiliser [htmx](https://htmx.org/) !

Voici le seul changement à apporter au code HTML pour atteindre le même résultat en utilisant htmx, en considérant qu'htmx est installé dans le projet :

```html
<div
    hx-trigger="load, change"
    hx-post="/url-a-appeler"
    hx-include="[name='category'], [name='country'], [name='position']"
    hx-target=".result"
>
```

Et c'est tout. Aucun JavaScript (écrit par nous), htmx gère tout pour nous.

- `hx-trigger` indique quand l'évènement doit s'appeler, ici dans deux cas : au chargement de la page (`load`) et au changement d'une valeur (`change`).

- `hx-post` indique l'URL qui doit être appelée.

- `hx-include` indique les valeurs qui seront dans le `POST`. Le nom du champ (`name`) sera la clé, et sa valeur... la valeur.

- `hx-target` indique où doit aller le retour HTML.

Dans un cas simple comme le notre, avec un seul formulaire, intégrer htmx n'a pas forcément d'intérêt. Néanmoins, sur les plus gros projets, où cette structure revient plusieurs fois, htmx permet d'éviter l'écriture de code JavaScript, et donc de la maintenance.
