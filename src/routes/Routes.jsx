import Dashboard from '../views/Dashboard/Dashboard'
import LoremIpsum from '../views/LoremIpsum/LoremIpsum'

/**
 * This array supplies the routing plugin with the handlers that map particular URLs to particular components.
 * @type {*[]}
 */
let routes = [
    {
        name: "Dashboard",
        path: "/",
        component: Dashboard
    },
    {
        name: "Lorem Ipsum",
        path: "/lorem",
        component: LoremIpsum
    }
];

export default routes;