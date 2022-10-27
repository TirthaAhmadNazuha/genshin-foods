class FavoritePage extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if (window.location.pathname == '/favorite') {
            this.setAttribute('class', 'block')
            this.render()
        }
    }
    render() {
        this.innerHTML = `
        <header class="bg-white py-4 px-6 dark:bg-black dark:text-white">
            <nav class="flex item-center">
                <button class="back mr-4">
                    <span class="material-symbols-outlined"
                        >arrow_back</span
                    >
                </button>
                <h3>Favorite</h3>
            </nav>
        </header>
        <main
            class="bg-white px-4 dark:bg-black min-h-screen dark:text-white"
        >
            <div class="container w-full pb-28"></div>
        </main>
        <bottom-nav />
        `
        const func = (data) => {
            if (data) {
                const foodListElem = document.createElement('food-list')
                foodListElem.foods = data
                this.querySelector('.container').innerHTML = ''
                this.querySelector('.container').append(foodListElem)
            } else {
                this.querySelector('.container').innerHTML =
                    '<span class="text-opacity-50">Favorite is null, Add item with click icon heart in item page</span>'
            }
        }
        func(JSON.parse(window.localStorage.getItem('favorite-item')))
    }
}
customElements.define('favorite-page', FavoritePage)
