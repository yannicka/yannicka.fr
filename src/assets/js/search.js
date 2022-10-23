import { create, insert, search } from '@lyrasearch/lyra'

const db = create({
    schema: {
        title: 'string',
        url: 'string',
        content: 'string',
    },
    defaultLanguage: 'french',
})

fetch('/lunr.json')
    .then(response => response.json())
    .then(data => {
        for (const row of data) {
            insert(db, row)
        }
    })

const inputsSearch = document.querySelectorAll('.input-search')
const searchResults = document.querySelector('#js-search-results')

if (searchResults) {
    inputsSearch.forEach(inputSearch => {
        inputSearch.addEventListener('input', (e) => {
            const term = e.target.value.trim()

            if (term === '') {
                searchResults.innerHTML = ''

                return
            }

            const searchResult = search(db, {
                term: term,
                properties: '*',
                limit: 1000,
                tolerance: 2,
            })

            searchResults.innerHTML = `
                <div class="p-4 bg-white rounded dark:bg-gray-900">
                    <p class="font-bold">
                        ${searchResult.hits.length} résultats pour « ${term} » :
                    </p>

                    <ul class="list-dashed mt-2 ml-2">
                        ${Object.values(searchResult.hits).map(result => {
                            return `
                                <li>
                                    <a href="${result.url}" class="underline">${result.title}</a>
                                </li>
                            `
                        }).join('')}
                    </ul>
                </div>
            `
        })
    })
}
