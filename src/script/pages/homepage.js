import foods from '../component/foods'
import router from '../router'
class HomePage extends HTMLElement {
    connectedCallback() {
        this.classList.add('HomePage')
        this.render()
    }
    render() {
        this.innerHTML = `
        <header class="bg-white px-4 pt-10 sticky">
            <nav class="flex item-end justify-between">
                <div>
                    <span>Hello</span>
                    <h3>Find food you want!</h3>
                </div>
                <button class="p-2">
                    <span class="material-symbols-outlined text-[30px]">favorite</span>
                </button>
            </nav>
            <div class="search-bar w-full py-3 relative">
                <form class="search-box w-full flex flex-nowrap gap-3">
                    <input
                        type="text"
                        class="search-inp bg-amber-400 bg-opacity-20 rounded-lg py-3 px-4 outline-none flex-grow"
                        placeholder="Explore..."
                    />
                    <button type="submit" class="bg-amber-400 bg-opacity-50 p-3 px-4 rounded-lg">
                        <span class="material-symbols-outlined">search</span>
                    </button>
                </form>
                <ul class="filtered-list-result w-full bg-white rounded-lg absolute top-[68px] left-0"></ul>
            </div>
        </header>
        <main class="bg-white px-4 min-h-screen">
            <div class="container w-full pb-28"></div>
        </main>
        `
        const func = (data) => {
            const foodListElem = document.createElement('food-list')
            foodListElem.foods = data
            document.querySelector('.App main .container').innerHTML = ''
            document.querySelector('.App main .container').append(foodListElem)
        }
        if (Array.isArray(foods.arr())) {
            func(foods.arr(true))
        } else {
            foods.all().then((data) => {
                foods.all = data
                func(foods.arr(true))
            })
        }
        this.querySelector('nav button').onclick = () =>
            router.onNavigate('/favorite')
        window.scroll(0, 0)
        let windowSrcollBeforeValue = 0
        let topHeaderInScrolling = 0
        window.onscroll = () => {
            if (windowSrcollBeforeValue < window.scrollY) {
                topHeaderInScrolling += window.scrollY - windowSrcollBeforeValue
                if (topHeaderInScrolling > 184) topHeaderInScrolling = 184
                document.querySelector(
                    'header'
                ).style.top = `-${topHeaderInScrolling}px`
                windowSrcollBeforeValue = window.scrollY
            } else if (windowSrcollBeforeValue > window.scrollY) {
                topHeaderInScrolling += window.scrollY - windowSrcollBeforeValue
                if (topHeaderInScrolling < 106) topHeaderInScrolling = 106
                document.querySelector(
                    'header'
                ).style.top = `-${topHeaderInScrolling}px`
                windowSrcollBeforeValue = window.scrollY
            }
        }
        const searchBoxForm = document.querySelector('.search-box')
        searchBoxForm.addEventListener('submit', (e) => {
            e.preventDefault()
            e.target[0].blur()
            document.querySelector('.filtered-list-result').innerHTML = ''
            func(foods.arrFiltered(e.target[0].value))
            window.scroll(0, 0)
        })
        document
            .querySelector('.search-box input')
            .addEventListener('keyup', (e) => {
                const value = e.target.value
                const filteredListResult = document.querySelector(
                    '.filtered-list-result'
                )
                filteredListResult.innerHTML = ''
                if (value.length > 2) {
                    const result = foods.filtered(value)
                    result.forEach((item) => {
                        const list = document.createElement('li')
                        list.setAttribute('class', 'p-3 w-full')
                        list.innerHTML = item
                        list.addEventListener('click', () => {
                            document.querySelector('.search-box input').value =
                                item
                        })
                        filteredListResult.append(list)
                    })
                }
            })
        document.querySelector('header').addEventListener('blur', () => {
            document.querySelector('.filtered-list-result').innerHTML = ''
        })
    }
}
customElements.define('home-page', HomePage)
