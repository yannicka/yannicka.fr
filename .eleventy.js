const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const toml = require('toml')

module.exports = function (config) {
  config.addDataExtension('toml', contents => toml.parse(contents))
  config.addPassthroughCopy('src/projets/age-of-rice/src')
  config.addPassthroughCopy('src/projets/switch-color/src')
  config.addPassthroughCopy('src/projets/switch-color/img')
  config.addPassthroughCopy('src/dossiers/**/*.{png,jpg,jpeg,gif,svg}')
  config.addPassthroughCopy('src/dessins/**/*.{png,jpg,jpeg,gif,svg}')
  // config.addPassthroughCopy('src/**/*.{png,jpg,jpeg,gif,svg}')

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

  config.addCollection('project', function(collection) {
    let projects = collection.getFilteredByTag('project')

    projects.sort((a, b) => {
      return new Date(b.data.publish_month) - new Date(a.data.publish_month)
    })

    return projects
  })

  let markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    renderPermalink: () => '',
  })

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
      if (minPlayers === 'unknown') {
        return `Nombre de joueurs inconnu`
      } else {
        return `${minPlayers} joueurs`
      }
    } else {
      if (maxPlayers === 'unknown') {
        return `${minPlayers} à ? joueurs`
      } else if (minPlayers === 'unknown') {
        return `? à ${maxPlayers} joueurs`
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
