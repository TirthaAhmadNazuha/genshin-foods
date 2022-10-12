class FoodElem extends HTMLElement {
    set food(food) {
        this._food = food
        this.setAttribute('class', 'food block')
        this.render()
    }
    render() {
        this.innerHTML = `
        <img src="https://api.genshin.dev/consumables/food/${_food.image}" alt="">
        <span>${this._food.name}</span>
        `
    }
}
