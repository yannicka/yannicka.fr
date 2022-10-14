import '../css/style.css'
import './search.js'

const mobileMenu = document.querySelector('.js-mobile-menu')
const mobileMenuOpenButton = document.querySelector('.js-mobile-menu-open-button')
const mobileMenuCloseButton = document.querySelector('.js-mobile-menu-close-button')

if (mobileMenu && mobileMenuOpenButton && mobileMenuCloseButton) {
    mobileMenuOpenButton.addEventListener('click', () => {
        mobileMenu.style.display = 'block'
        mobileMenuOpenButton.style.display = 'none'
    })

    mobileMenuCloseButton.addEventListener('click', () => {
        mobileMenu.style.display = 'none'
        mobileMenuOpenButton.style.display = 'block'
    })
}
