import Dashboard from '../views/MovementControl/MovementControl'
import LoremIpsum from '../views/LoremIpsum/LoremIpsum'

/**
 * This array supplies the routing plugin with the handlers that map particular URLs to particular components.
 * @type {*[]}
 */
let routes = [
    {
        name: "Movement Control",
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