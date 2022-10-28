import router from './router.js'
import foods from './component/foods.js'
const main = () => {
    router.popState()
    foods.all().then((data) => {
        foods.all = data
        foods.modifiy()
        foods.key.food().forEach((key) => {
            const arr = foods.all
            const elem = document.createElement('item-page')
            elem.item = arr[key]
            router.routes[`/${key}`] = elem
        })
    })
}
export default main
