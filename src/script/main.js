import imageHero from './component/imagehero.js'
import router from './router.js'
import minWidthImageHero from '../assets/hero-foods-img.png'
import foods from './component/foods.js'
const main = () => {
    router.popState()
    if (location.pathname == '/') {
        const startedBtn = document.querySelectorAll('.GetStarted')
        startedBtn.forEach((btn) => {
            btn.onclick = () => {
                router.onNavigate('/home')
            }
        })
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
        window.location.pathname == '/' && wideScreenHeroImgChangein()
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
        foods.key.food().forEach((key) => {
            const arr = foods.all[0]
            const elem = document.createElement('item-page')
            elem.item = arr[key]
            router.routes[`/${key}`] = elem
        })
        window.onscroll = () => {
            if (window.location.pathname == '/') {
                console.log('window scroling')
                const hero = document.querySelector('.hero')
                if (scrollY > hero.clientHeight / 2) {
                    document.querySelector(
                        '.row-item .con'
                    ).style.transform = `translate(-${
                        scrollY - hero.clientHeight / 2
                    }px)`
                }
            }
        }
    })
}
export default main
