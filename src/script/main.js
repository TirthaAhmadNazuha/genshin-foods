import $ from 'jquery'
import router from './router.js'
import logo from '../../dist/assets/images/genshin-impact-logo.png'
import imageHero from './component/imagehero.js'
import minWidthImageHero from '../../dist/assets/images/foods-hero.png'
import foods from './component/foods.js'
const main = () => {
    router.AppDiv.innerHTML = ''
    if (window.location.pathname == '/') {
        router.AppDiv.innerHTML = router.routes[window.location.pathname]
    } else router.AppDiv.appendChild(router.routes[window.location.pathname])
    router.popState()
    $('.nav button').on('click', (e) => {
        router.onNavigate(e.target.getAttribute('to'))
    })
    const NavImageLogo = document.createElement('img')
    NavImageLogo.src = logo
    NavImageLogo.style.height = '80px'
    NavImageLogo.style.filter = 'brightness(0)'
    $('nav.nav').append(NavImageLogo)
    window.onload = () => {
        setTimeout(() => {
            const imageHero = document.querySelectorAll('.hero .image img')
            imageHero.forEach((img) => {
                img.setAttribute('style', 'transition: 300ms ease;')
            })
        }, 300)
    }
    const wideScreenHeroImgChangein = () => {
        if (window.innerWidth <= 768) {
            const elem = document.createElement('img')
            elem.src = minWidthImageHero
            elem.classList.add('w-full')
            document.querySelector('.hero .image').innerHTML = ''
            $('.hero .image').append(elem)
        } else {
            document.querySelector('.hero .image').innerHTML = ''
            $('.hero .image').append(imageHero)
        }
    }
    wideScreenHeroImgChangein()
    window.onresize = () => {
        wideScreenHeroImgChangein()
        setTimeout(() => {
            if (window.innerWidth > 768) {
                const imageHero = document.querySelectorAll('.hero .image img')
                imageHero.forEach((img) => {
                    img.setAttribute('style', 'transition: 300ms ease;')
                })
            }
        }, 300)
    }
    foods.all().then((data) => {
        foods.all = data
        foods.modifiy()
        for (let i = 15; i <= 45; i++) {
            const imgRowItemIndex = document.createElement('img')
            imgRowItemIndex.src = `https://api.genshin.dev/consumables/food/${
                foods.key.food()[i]
            }`
            imgRowItemIndex.style.height = '200px'
            $('.row-item .con').append(imgRowItemIndex)
        }
        window.onscroll = () => {
            if (location.pathname == '/' && scrollY > $('.hero').height() / 2) {
                document.querySelector(
                    '.row-item .con'
                ).style.transform = `translate(-${
                    scrollY - $('.hero').height() / 2
                }px)`
            }
        }
    })
}
export default main
