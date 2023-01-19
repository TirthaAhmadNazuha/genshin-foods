class FoodsList extends HTMLElement {
    constructor() {
        super()
    }
    set foods(foods) {
        this._foods = foods
        this.render()
    }
    render() {
        this.setAttribute(
            'class',
            'mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full box-border'
        )
        this.innerHTML = ''
        this._foods.forEach((food) => {
            const foodElem = document.createElement('food-elem')
            foodElem.food = food
            this.append(foodElem)
        })
    }
}
customElements.define('food-list', FoodsList)
