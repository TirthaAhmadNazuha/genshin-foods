const router = {
    AppDiv: document.querySelector('.App'),
    routes: {
        '/': document.querySelector('.App').innerHTML,
        '/home': document.createElement('home-page'),
        '/user': document.createElement('user-page'),
    },
    popState: () => {
        window.onpopstate = () => {
            AppDiv.innerHTML = router.routes[window.location.pathname]
        }
    },
    onNavigate: (pathname) => {
        window.history.pushState(
            {},
            pathname,
            window.location.origin + pathname
        )
        router.AppDiv.innerHTML = ''
        if (pathname == '/') {
            router.AppDiv.innerHTML = router.routes[pathname]
        } else router.AppDiv.appendChild(router.routes[pathname])
    },
}
export default router
