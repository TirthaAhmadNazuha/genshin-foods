class UserPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('UserPage')
        this.render()
    }
    render() {
        this.innerHTML = `
            <h1>This is UserPage</h1>
        `
    }
}
customElements.define('user-page', UserPage)
