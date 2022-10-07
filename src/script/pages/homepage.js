class HomePage extends HTMLElement {
    connectedCallback() {
        this.classList.add('HomePage')
        this.render()
    }
    render() {
        this.innerHTML = `
            <h1>This is HomePage</h1>
        `
    }
}
customElements.define('home-page', HomePage)
