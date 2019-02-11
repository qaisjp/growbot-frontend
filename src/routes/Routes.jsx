import Dashboard from '../views/MovementControl/MovementControl'
import VisionMonitor from '../views/VisionMonitor/VisionMonitor'
import Login from '../views/Login/Login'
import ForgotPassword from '../views/ForgotPassword/ForgotPassword'

/**
 * This array supplies the routing plugin with the handlers that map particular URLs to particular components.
 * @type {*[]}
 */
let routes = [
    {
        name: "Movement Control",
        path: "/",
        component: Dashboard,
        visible: true
    },
    {
        name: "Vision Monitor",
        path: "/vision",
        component: VisionMonitor,
        visible: true
    },
    {
        name: "Account Login",
        path: "/login",
        component: Login,
        visible: false
    },
    {
        name: "Recover Password",
        path: "/recover",
        component: ForgotPassword,
        visible: false
    }
];

export default routes;