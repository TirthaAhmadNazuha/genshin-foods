import axios from 'axios'
const foods = {
    all: async () => {
        try {
            const res = await axios.get(
                'https://api.genshin.dev/consumables/all'
            )
            return res.data
        } catch (error) {
            console.log('food.all() is error ', error.message)
        }
    },
    key: {
        food: () => Object.keys(foods.all[0]),
        item: () => Object.keys(foods.all[1]),
        randomFood: () =>
            foods.key
                .food()
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
    },
    modifiy: () => {
        foods.key.food().forEach((item) => {
            foods.all[0][
                item
            ].rarity = `star-rarity-${foods.all[0][item].rarity}`
            foods.all[0][item].image = item
            foods.all[0][item].favorite = false
        })
    },
    arr: (random = false) => {
        const arr = []
        if (random) {
            foods.key.randomFood().forEach((key) => {
                arr.push(foods.all[0][key])
            })
        } else {
            foods.key.food().forEach((key) => {
                arr.push(foods.all[0][key])
            })
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
