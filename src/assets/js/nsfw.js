const BLUR_CLASS = 'blur-3xl'

const nsfwButton = document.querySelector('.js-nsfw-button')

if (nsfwButton) {
  nsfwButton.innerText = 'Afficher les images NSFW'

  const nsfwImages = document.querySelectorAll('[data-nsfw="nsfw"]')

  nsfwImages.forEach(el => {
    el.classList.add(BLUR_CLASS)
  })

  nsfwButton.addEventListener('click', () => {
    nsfwImages.forEach(el => {
      if (el.classList.contains(BLUR_CLASS)) {
        el.classList.remove(BLUR_CLASS)
        nsfwButton.innerText = 'Masquer les images NSFW'
      } else {
        el.classList.add(BLUR_CLASS)
        nsfwButton.innerText = 'Afficher les images NSFW'
      }
    })
  })
}
