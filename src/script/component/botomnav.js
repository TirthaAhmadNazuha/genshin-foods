import router from '../router'
class BottomNav extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if (window.location.pathname == '/home') {
            this.setAttribute(
                'class',
                'bottomNav flex flex-nowrap fixed z-30 bg-white dark:bg-black dark:text-white p-4 box-border w-screen left-0 bottom-0 right-0 items-center justify-evenly'
            )
            this.render()
            this.children[0].classList.add('on')
        } else if (window.location.pathname == '/favorite') {
            this.setAttribute(
                'class',
                'bottomNav flex flex-nowrap fixed z-30 bg-white dark:bg-black dark:text-white p-4 box-border w-screen left-0 bottom-0 right-0 items-center justify-evenly'
            )
            this.render()
            this.children[1].classList.add('on')
        } else if (window.location.pathname == '/user') {
            this.setAttribute(
                'class',
                'bottomNav flex flex-nowrap fixed z-30 bg-white dark:bg-black dark:text-white p-4 box-border w-screen left-0 bottom-0 right-0 items-center justify-evenly'
            )
            this.render()
            this.children[2].classList.add('on')
        }
    }
    render() {
        this.innerHTML = `
        <button class="item" to="/home">
        <span class="material-symbols-outlined text-[30px]">home</span>
        </button>
        <button class="item" to="/favorite">
            <span class="material-symbols-outlined text-[30px]">favorite</span>
        </button>
        <button class="item" to="/user">
            <span class="material-symbols-outlined text-[30px]">person</span>
        </button>
        `
        const items = document.querySelectorAll('.bottomNav .item')
        items.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let ini = e.target
                if (e.target.classList[0] == 'material-symbols-outlined')
                    ini = e.target.parentNode
                items.forEach((button) => button.classList.remove('on'))
                ini.classList.add('on')
                router.onNavigate(ini.getAttribute('to'))
            })
        })
    }
}
customElements.define('bottom-nav', BottomNav)
