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
  config.addWatchTarget('./_tmp/style.css')
  config.addPassthroughCopy({ './_tmp/style.css': './style.css' })

  config.addPlugin(syntaxHighlight)

  const mapping = {
    h1: ['text-6xl mt-4 mb-2'],
    h2: ['text-5xl mt-4 mb-2'],
    h3: ['text-4xl mt-4 mb-2'],
    h4: ['text-3xl mt-4 mb-2'],
    h5: ['text-2xl mt-4 mb-2'],
    h6: ['text-xl mt-4 mb-2'],
    p: ['py-3'],
    a: ['underline', 'hover:text-gray-700'],
    ul: ['py-3', 'list-dashed', 'list-inside'],
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

  config.addShortcode('category_to_color', function(category) {
    if (category === 'drawing') {
      return 'red'
    } else if (category === 'music') {
      return 'green'
    } else if (category === 'quiz') {
      return 'blue'
    } else if (category === 'action') {
      return 'yellow'
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
    } else  {
      return 'Autre'
    }
  })

  config.addFilter('format_month', date => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
    }).format(date)
  })

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
