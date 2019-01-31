import Dashboard from '../views/MovementControl/MovementControl'
import VisionMonitor from '../views/VisionMonitor/VisionMonitor'

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
        name: "Vision Monitor",
        path: "/vision",
        component: VisionMonitor
    }
];

export default routes;