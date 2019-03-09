import routeType from './header_action_types'

const routes = [

    {
        name: "Logout",
        type: routeType.function,
        func: (component) => {
            const { anchorEl } = component.state;
            const { logout } = component.props;
            const menuOpen = Boolean(anchorEl)

            if(menuOpen) {
                component.setState({ anchorEl: null })
            }

            logout();
        }
    },
    {
        name: "Settings",
        type: routeType.redirect,
        url: "/settings"
    }

]

export default routes;