import axios from 'axios'
const foods = {
    all: async () => {
        try {
            const res = await axios.get(
                'https://api.genshin.dev/consumables/food'
            )
            return res.data
        } catch (error) {
            console.log('food.all() is error ', error.message)
        }
    },
    key: {
        food: () => Object.keys(foods.all),
        randomFood: () =>
            foods.key
                .food()
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
    },
    modifiy: () => {
        foods.key.food().forEach((item) => {
            foods.all[item].rarity = `star-rarity-${foods.all[item].rarity}`
            foods.all[item].image = item
            foods.all[item].favorite = false
        })
    },
    arr: (random = false) => {
        let arr = []
        if (random) {
            foods.key.randomFood().forEach((key) => {
                arr.push(foods.all[key])
            })
        } else {
            arr = Object.values(foods.all)
        }
        return arr
    },
    filtered: (keyword = '') => {
        const result = []
        foods.arr().forEach((food) => {
            if (food.name.toLowerCase().includes(keyword.toLowerCase()))
                result.push(food.name)
        })
        return result
    },
    arrFiltered: (keyword = '') => {
        const result = foods
            .arr()
            .filter((food) =>
                food.name.toLowerCase().includes(keyword.toLowerCase())
            )
        return result
    },
}
export default foods
