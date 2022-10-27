const router = {
    AppDiv: document.querySelector('.App'),
    routes: {
        '/': document.createElement('index-page'),
        '/home': document.createElement('home-page'),
        '/user': document.createElement('user-page'),
        '/favorite': document.createElement('favorite-page'),
    },
    popState: () => {
        window.onpopstate = () => {
            document.querySelector('.App').innerHTML = ''
            document
                .querySelector('.App')
                .append(router.routes[window.location.pathname])
            location.pathname == '/' && location.reload()
        }
    },
    onNavigate: (pathname) => {
        window.history.pushState(
            {},
            pathname,
            window.location.origin + pathname
        )
        router.AppDiv.innerHTML = ''
        router.AppDiv.append(router.routes[pathname])
    },
}
export default router
