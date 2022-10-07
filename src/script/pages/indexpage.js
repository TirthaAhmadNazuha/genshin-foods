import '../component/text-and-img.js'
class IndexPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('indexPage')
    }
}
customElements.define('index-page', IndexPage)
