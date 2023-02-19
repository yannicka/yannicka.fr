class LunrIndex {
  data() {
    return {
      permalink: '/lunr.json',
      eleventyExcludeFromCollections: true,
    }
  }

  render(data) {
    const c = data.collections.all
    const result = []

    for (const b of c) {
      let content = b.content
      content = content.replace(/<[^>]*>?/gm, '') // Supprime les balises HTML
      content = content.replace(/\s{2,}|\r|\n/gm, ' ') // Nettoie les espaces

      let title = b.data.title

      if (title) {
        title = title.toString()

        result.push({
          title: title,
          url: b.url,
          content: content,
        })
      }
    }

    return JSON.stringify(result)
  }
}

module.exports = LunrIndex
