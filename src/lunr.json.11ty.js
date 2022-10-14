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
        let title = b.data.title

        if (title) {
          title = title.toString()

          result.push({
            title: title,
            url: b.url,
            content: b.templateContent,
          })
        }
    }

    return JSON.stringify(result)
  }
}

module.exports = LunrIndex
