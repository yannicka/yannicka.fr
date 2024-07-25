const fs = require('node:fs')

const imdbIds = [
  'tt1327773',
  'tt4699388',
  'tt12823454',
  'tt14208870',
  'tt10505316',
  'tt16428256',
  'tt7534150',
  'tt6718170',
  'tt1798188',
  'tt0096283',
  'tt2463208',
  'tt1798709',
  'tt6264654',
  'tt1465487',
  'tt0347618',
  'tt3700392',
  'tt7401588',
  'tt27510455',
  'tt6791350',
  'tt15789038',
  'tt9362722',
  'tt15398776',
  'tt7458762',
  'tt13079150',
  'tt13399946',
  'tt16987062',
  'tt28236368',
  'tt0362227',
  'tt24068064',
  'tt1517268',
  'tt29078233',
  'tt24070754',
  'tt1355630',
  'tt21638298',
  'tt10545296',
  'tt0477348',
  'tt6166392',
  'tt0367594',
];

const movies = {};

(async () => {
  for (const imdbId of imdbIds) {
    const url = `https://api.themoviedb.org/3/movie/${imdbId}?external_source=imdb_id&language=fr-FR`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2UzODcxNGIyNGY0YWU5NDVmM2IzNDEwM2NmZTczMiIsInN1YiI6IjY1OTFhZjU4MWRjYjc3NmJkNjQ1MmViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fHVOGVgD-JENW9hu-GK6FX_3pp5YoFhgvB0WIVzA9OQ',
        }
      })

      const data = await response.json()

      movies[imdbId] = {
        imdbId,
        tmdbId: data.id,
        title: data.title,
        originalTitle: data.original_title,
        releaseYear: new Date(data.release_date).getFullYear(),
      }
    } catch (error) {
      console.error(error)
    }
  }

  fs.writeFileSync('src/_data/movies.json', JSON.stringify(movies, null, 2), {
    encoding: 'utf8',
    flag: 'w',
  })
})()
