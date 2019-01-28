import Dashboard from '../views/Dashboard/Dashboard'

/**
 * This array supplies the routing plugin with the handlers that map particular URLs to particular components.
 * @type {*[]}
 */
let routes = [
    {
        name: "Dashboard",
        path: "/",
        component: Dashboard
    }
];

export default routes;