import router from '../router'
class FoodElem extends HTMLElement {
    set food(food) {
        this._food = food
        this.setAttribute(
            'class',
            'food block p-2 bg-amber-400 bg-opacity-20 rounded-xl box-border'
        )
        this.render()
    }
    render() {
        this.innerHTML = `
        <img src="https://api.genshin.dev/consumables/food/${this._food.image}" class="w-full" alt="">
        <h3>${this._food.name}</h3>
        `
        this.addEventListener('click', () => {
            router.onNavigate(`/${this._food.image}`)
        })
    }
}
customElements.define('food-elem', FoodElem)
