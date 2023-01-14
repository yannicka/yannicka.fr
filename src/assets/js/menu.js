const header = document.querySelector('.js-header')
const mobileMenu = document.querySelector('.js-mobile-menu')
const mobileMenuOpenButton = document.querySelector('.js-mobile-menu-open-button')
const mobileMenuCloseButton = document.querySelector('.js-mobile-menu-close-button')

if (mobileMenu && mobileMenuOpenButton && mobileMenuCloseButton) {
    mobileMenuOpenButton.addEventListener('click', () => {
        mobileMenu.style.display = 'block'
        header.style.display = 'none'
    })

    mobileMenuCloseButton.addEventListener('click', () => {
        mobileMenu.style.display = 'none'
        header.style.display = 'block'
    })
}
