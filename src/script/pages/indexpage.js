import logo from '../../assets/genshin-logo.png'
import minWidthImageHero from '../../assets/hero-foods-img.png'
import router from '../router'
import foods from '../component/foods'
import imageHero from '../component/imagehero'
class IndexPage extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        this.innerHTML = `
        <header>
            <nav
                class="nav absolute z-50 top-0 left-0 right-0 px-11 py-5"
            ></nav>
            <div
                class="hero px-11 pt-28 bg-amber-50 flex flex-col-reverse content-evenly items-center w-full md:flex-row md:pt-11"
            >
                <div
                    class="text relative w-full flex flex-col items-center text-center md:w-1/2 md:text-left md:items-start"
                >
                    <h1>Buff your character with food in Genshin impact</h1>
                    <p class="mb-6">
                        See the specific description of each food at Gensin
                        impact
                    </p>
                    <button
                        class="GetStarted px-8 py-4 mb-11 rounded-xl bg-amber-700 text-white"
                    >
                        Start now
                    </button>
                </div>
                <div
                    class="image relative z-10 w-full flex mx-auto md:mr-0 md:w-1/2 md:mt-[-8%] md:ml-[-3%] md:h-screen"
                ></div>
            </div>
        </header>
        <main>
            <div
                class="description p-11 pb-12 flex flex-col md:flex-row content-between bg-amber-100 gap-6"
            >
                <article>
                    <h3>What this for</h3>
                    <p>
                        The developer's hope for this webApp is that it's a
                        place to buy food using
                        <abbr title="currency in Genshin">mora</abbr> and
                        delivered by mailbox in genshin.
                    </p>
                </article>
                <article>
                    <h3>Why was it made</h3>
                    <p>
                        The developer is also a user of the game Genshin
                        Impact. So he wanted to make it easier to get food
                        with the food buff he wanted.
                    </p>
                </article>
                <article>
                    <h3>Then how to determine the price of each</h3>
                    <p>
                        Of course it's illegal for developers to set prices
                        at will. So this webApp will be a marketplace and
                        buyers buy from other users who make.
                    </p>
                </article>
            </div>
            <div class="row-item py-11 w-full overflow-clip bg-amber-50">
                <div class="con flex"></div>
            </div>
            <div
                class="get-started-now p-11 box-border bg-amber-100 flex flex-col text-center items-center"
            >
                <h2>So what are you waiting for</h2>
                <p>
                    start and explore the pleasures of food at Genshin
                    impact
                </p>
                <button
                    class="GetStarted px-8 py-4 rounded-xl mt-5 min-w-full md:w-1/2 md:min-w-fit bg-amber-700 text-white"
                >
                    Start now
                </button>
            </div>
        </main>
        <footer
            class="flex flex-col md:flex-row p-11 justify-evenly bg-amber-900 text-amber-50"
        >
            <div class="creator mb-8">
                <h4 class="text-amber-300">Created by</h4>
                <h3>Tirtha Ahmad Nazuha</h3>
            </div>
            <div class="contact mb-8 md:mx-2">
                <h4 class="text-amber-300">Contact</h4>
                <ul>
                    <li>
                        <a
                            class="hover:underline"
                            href="https://www.instagram.com/tirtha.ahmad.nazuha/"
                            target="_blank"
                            >@tirtha.ahmad.nazuha</a
                        >
                    </li>
                    <li>
                        <a
                            class="hover:underline"
                            href="mailto:tirthaahmadnazuha.udah@gmail.com"
                            target="_blank"
                            >tirthaahmadnazuha.udah@gmail.com</a
                        >
                    </li>
                    <li>
                        <a
                            class="hover:underline"
                            href="https://wa.me/085778769535"
                            target="_blank"
                            >wa:+6285778769535</a
                        >
                    </li>
                </ul>
            </div>
            <div class="dev-description mb-8">
                <p class="text-stone-300 w-44">
                    This page does not sell or generate any profit. Use of
                    images is limited to general creatives.
                </p>
            </div>
        </footer>`
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
            window.location.pathname == '/' && wideScreenHeroImgChangein()
            setTimeout(() => {
                if (window.innerWidth > 768) {
                    const imageHero =
                        document.querySelectorAll('.hero .image img')
                    imageHero.forEach((img) => {
                        img.setAttribute('style', 'transition: 300ms ease;')
                    })
                }
            }, 300)
        }
        if (foods.key.food() && foods.key.food().length) {
            for (let i = 15; i <= 45; i++) {
                const imgRowItemIndex = document.createElement('img')
                imgRowItemIndex.src = `https://api.genshin.dev/consumables/food/${
                    foods.key.food()[i]
                }`
                imgRowItemIndex.style.height = '200px'
                document.querySelector('.row-item .con').append(imgRowItemIndex)
            }
        } else {
            foods.all().then((data) => {
                foods.all = data
                for (let i = 15; i <= 45; i++) {
                    const imgRowItemIndex = document.createElement('img')
                    imgRowItemIndex.src = `https://api.genshin.dev/consumables/food/${
                        foods.key.food()[i]
                    }`
                    imgRowItemIndex.style.height = '200px'
                    document
                        .querySelector('.row-item .con')
                        .append(imgRowItemIndex)
                }
            })
        }
        const startedBtn = document.querySelectorAll('.GetStarted')
        startedBtn.forEach((btn) => {
            btn.onclick = () => {
                router.onNavigate('/home')
            }
        })
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
    }
}
customElements.define('index-page', IndexPage)
