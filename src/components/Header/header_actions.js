import routeType from './header_action_types'

let routes = [

    {
        name: "Logout",
        type: routeType.function,
        func: (component) => {
            let { anchorEl } = component.state;
            let menuOpen = Boolean(anchorEl)

            if(menuOpen) {
                component.setState({ anchorEl: null })
            }

            component.props.authLogout('raees.aamir@ed.ac.uk')
        }
    },
    {
        name: "Settings",
        type: routeType.redirect,
        url: "/settings"
    }

]

export default routes;