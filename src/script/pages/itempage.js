import foods from '../component/foods'
import router from '../router'
class ItemPage extends HTMLElement {
    set item(food) {
        this._food = food
        this.setAttribute(
            'class',
            'block bg-white dark:bg-black dark:text-white relative'
        )
        this.render()
    }
    render() {
        this.innerHTML = `
        <div class="con flex flex-col md:flex-row items-center relatve py-4 px-6 bg-amber-400 bg-opacity-20 min-h-screen">
            <button class="back mr-auto mt-3 absolute top-0 left-0 py-3 px-4"><span class="material-symbols-outlined">arrow_back</span></button>
            <img src="https://api.genshin.dev/consumables/food/${this._food.image}" class="w-full md:ml-[8%] md:mr-[5%] max-w-[300px]" alt="">
            <div class="xl:pr-[3%]">
                <header>
                    <h2 class="text-center md:text-left">${this._food.name}</h2>
                    <button class="add-favorite" favoriteAttr="${this._food.favorite}"><span class="material-symbols-outlined">favorite</span></button>
                <header>
                <div class="sub mb-3 text-center md:text-left">
                    <span class="${this._food.rarity}">${this._food.rarity}</span> | <span class="type">${this._food.type}</span>
                </div>
                <article class="text-center md:text-left mb-3">
                    <h3>Description</h3>
                    <p>${this._food.description}</p>
                </article>
                <article class="text-center md:text-left mb-5">
                    <h3>Effect</h3>
                    <p>${this._food.effect}</p>
                </article>
            </div>
        </div>
        `
        const saveFavoritem = (save = true) => {
            let favoriteItem = JSON.parse(
                window.localStorage.getItem('favorite-item')
            )
            if (save) {
                favoriteItem.push(this._food)
                this.querySelector('.add-favorite').classList.add('saved')
            } else {
                favoriteItem.forEach((item, i) => {
                    if (item.image == this._food.image)
                        favoriteItem.splice(i, 1)
                })
                this.querySelector('.add-favorite').classList.remove('saved')
            }
            window.localStorage.setItem(
                'favorite-item',
                JSON.stringify(favoriteItem)
            )
        }
        JSON.parse(window.localStorage.getItem('favorite-item')).forEach(
            (item) => {
                if (foods.all[0][this._food.image].name == item.name) {
                    foods.all[0][this._food.image].favorite = item.favorite
                }
            }
        )
        if (foods.all[0][this._food.image].favorite) {
            this.querySelector('.add-favorite').classList.add('saved')
        } else this.querySelector('.add-favorite').classList.remove('saved')
        this.querySelector('.back').onclick = () => router.onNavigate('/home')
        this.querySelector('.add-favorite').onclick = () => {
            if (
                !window.localStorage.length ||
                !window.localStorage.getItem('favorite-item')
            ) {
                window.localStorage.setItem('favorite-item', JSON.stringify([]))
            }
            if (foods.all[0][this._food.image].favorite) {
                foods.all[0][this._food.image].favorite = false
                saveFavoritem(false)
            } else {
                foods.all[0][this._food.image].favorite = true
                saveFavoritem()
            }
        }
    }
}
customElements.define('item-page', ItemPage)
