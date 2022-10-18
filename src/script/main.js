import logo from '../assets/genshin-logo.png'
import imageHero from './component/imagehero.js'
import minWidthImageHero from '../assets/hero-foods-img.png'
import foods from './component/foods.js'
const main = () => {
    const NavImageLogo = document.createElement('img')
    NavImageLogo.src = logo
    NavImageLogo.style.height = '80px'
    NavImageLogo.style.filter = 'brightness(0)'
    document.querySelector('.nav').append(NavImageLogo)
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
            document.querySelector('.hero .image').append(elem)
        }
        if (window.innerWidth > 768) {
            document.querySelector('.hero .image').innerHTML = imageHero
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
            document.querySelector('.row-item .con').append(imgRowItemIndex)
        }
        window.onscroll = () => {
            const hero = document.querySelector('.hero')
            if (scrollY > hero.clientHeight / 2) {
                document.querySelector(
                    '.row-item .con'
                ).style.transform = `translate(-${
                    scrollY - hero.clientHeight / 2
                }px)`
            }
        }
    })
}
export default main
