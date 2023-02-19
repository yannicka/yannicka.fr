import { create, insert, search } from '@lyrasearch/lyra'

(async function() {
    const db = await create({
        schema: {
            title: 'string',
            url: 'string',
            content: 'string',
        },
        defaultLanguage: 'french',
    })

    fetch('/lunr.json')
        .then(response => response.json())
        .then(async data => {
            for (const row of data) {
                await insert(db, row)
            }
        })

    const inputsSearch = document.querySelectorAll('.input-search')
    const searchResults = document.querySelector('#js-search-results')

    if (searchResults) {
        inputsSearch.forEach(inputSearch => {
            inputSearch.addEventListener('input', async (e) => {
                const term = e.target.value.trim()

                if (term === '') {
                    searchResults.innerHTML = ''
    
                    return
                }

                const searchResult = await search(db, {
                    term: term,
                    properties: '*',
                    limit: 1000,
                    tolerance: 2,
                })

                searchResults.innerHTML = `
                    <div class="p-4 bg-gradient-to-br from-transparent to-black/5 border-t border-t-stone-200 rounded dark:bg-gray-900">
                        <p class="font-bold">
                            ${searchResult.hits.length} résultats pour « ${term} » :
                        </p>
    
                        <ul class="list-dashed mt-2 ml-2">
                            ${Object.values(searchResult.hits).map(result => {
                                return `
                                    <li>
                                        <a href="${result.document.url}" class="underline">${result.document.title}</a>
                                    </li>
                                `
                            }).join('')}
                        </ul>
                    </div>
                `
            })
        })
    }
}())
