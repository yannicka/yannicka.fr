const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItClass = require('@toycode/markdown-it-class')
const toml = require('toml')

module.exports = function (config) {
  config.addDataExtension('toml', contents => toml.parse(contents))
  config.addPassthroughCopy('src/assets')
  config.addPassthroughCopy('src/projets/age-of-rice/src')
  config.addPassthroughCopy('src/projets/switch-color/src')
  config.addPassthroughCopy('src/projets/switch-color/img')
  config.addPassthroughCopy('src/**/*.{png,jpg,jpeg,gif,svg}')

  /* Plugins */
  config.addPlugin(syntaxHighlight)

  /* Collections */
  config.addCollection('dossier', function(collection) {
    let dossiers = collection.getFilteredByTag('dossier')

    dossiers.sort((a, b) => {
      const aTitle = a.data.title.toLowerCase()
      const bTitle = b.data.title.toLowerCase()
  
      if (aTitle < bTitle)
        return -1

      if (aTitle > bTitle)
        return 1

      return 0
    })

    return dossiers
  })

  /* Markdown */
  const mapping = {
    h1: ['text-6xl mt-4 mb-2'],
    h2: ['text-5xl mt-4 mb-2'],
    h3: ['text-4xl mt-4 mb-2'],
    h4: ['text-3xl mt-4 mb-2'],
    h5: ['text-2xl mt-4 mb-2'],
    h6: ['text-xl mt-4 mb-2'],
    p: ['my-3'],
    a: ['underline', 'hover:text-gray-700', 'dark:hover:text-gray-300'],
    ul: ['ml-3', 'my-3', 'list-dashed', 'list-inside'],
    ol: ['ml-8', 'my-3', 'list-decimal'],
    li: ['my-2'],
  }

  let markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    renderPermalink: () => '',
  }).use(markdownItClass, mapping)

  config.setLibrary('md', markdownLibrary)

  config.addPairedShortcode('markdown', function(content) {
    return markdownLibrary.render(content)
  })

  /* Shortcodes */
  config.addShortcode('category_to_color', function(category) {
    if (category === 'drawing') {
      return 'red'
    } else if (category === 'music') {
      return 'green'
    } else if (category === 'quiz') {
      return 'blue'
    } else if (category === 'action') {
      return 'yellow'
    } else if (category === 'reflexion') {
      return 'orange'
    } else if (category === 'card') {
      return 'purple'
    } else if (category === 'various') {
      return 'pink'
    } else  {
      return 'gray'
    }
  })

  config.addShortcode('category_to_string', function(category) {
    if (category === 'drawing') {
      return 'Dessin'
    } else if (category === 'music') {
      return 'Musique'
    } else if (category === 'quiz') {
      return 'Quiz'
    } else if (category === 'action') {
      return 'Action'
    } else if (category === 'reflexion') {
      return 'Réflexion'
    } else if (category === 'card') {
      return 'Cartes'
    } else if (category === 'various') {
      return 'Divers'
    } else  {
      return 'Autre'
    }
  })

  config.addShortcode('minmax_players_to_string', function(minPlayers, maxPlayers) {
    if (minPlayers === maxPlayers) {
      return `${minPlayers} joueurs`
    } else {
      if (maxPlayers === 'unknown') {
        return `${minPlayers} à ? joueurs`
      } else if (maxPlayers === 'infinite') {
        return `À partir de ${minPlayers} joueurs`
      } else {
        return `${minPlayers} à ${maxPlayers} joueurs`
      }
    }
  })

  /* Filtres */
  config.addFilter('format_date', date => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  })

  config.addFilter('format_month', date => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
    }).format(date)
  })

  /* Retour */
  return {
    dir: {
      input: 'src',
      output: 'public',

      includes: '_templates/_partials',
      layouts: '_templates',
      data: '_data',
    },
  }
}
