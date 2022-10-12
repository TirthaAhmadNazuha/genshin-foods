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
    },
    modifiy: () => {
        foods.key.food().forEach((item) => {
            foods.all[0][
                item
            ].rarity = `star-rarity-${foods.all[0][item].rarity}`
            foods.all[0][item].image = item
        })
    },
}
export default foods
