const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const toml = require('toml')

module.exports = function (config) {
  config.addDataExtension('toml', contents => toml.parse(contents))
  config.addPassthroughCopy('src/projets/age-of-rice/src')
  config.addPassthroughCopy('src/projets/switch-color/src')
  config.addPassthroughCopy('src/projets/switch-color/img')
  config.addPassthroughCopy('src/projets/bobby-for-playdate/img')
  config.addPassthroughCopy('src/dossiers/**/*.{png,jpg,jpeg,gif,svg}')
  config.addPassthroughCopy('src/dessins/**/*.{png,jpg,jpeg,gif,svg}')
  config.addPassthroughCopy('src/exercices/**/*.{png,jpg,jpeg,gif,svg}')
  config.addPassthroughCopy('src/experiments')
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

  config.addCollection('articles', function(collection) {
    let articles = collection.getFilteredByTag('article')

    articles.sort((a, b) => {
      return new Date(b.data.created_at) - new Date(a.data.created_at)
    })

    return articles
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
      return 'R??flexion'
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
        return `${minPlayers}??joueurs`
      }
    } else {
      if (maxPlayers === 'unknown') {
        return `${minPlayers}???? ???joueurs`
      } else if (minPlayers === 'unknown') {
        return `? ?? ${maxPlayers}??joueurs`
      } else if (maxPlayers === 'infinite') {
        return `?? partir de ${minPlayers}??joueurs`
      } else {
        return `${minPlayers}???? ${maxPlayers}??joueurs`
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

  /* Filtres */
  config.addFilter('format_date_yyyy_mm_dd', date => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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
