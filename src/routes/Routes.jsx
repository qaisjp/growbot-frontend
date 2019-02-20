import Dashboard from '../views/MovementControl/MovementControl'
import VisionMonitor from '../views/VisionMonitor/VisionMonitor'
import Login from '../views/Login/Login'
import ForgotPassword from '../views/ForgotPassword/ForgotPassword'
import Register from '../views/Register/Register'
import Settings from '../views/Settings/Settings'

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
    },
    {
        name: "Register",
        path: "/register",
        component: Register,
        visible: false
    },
    {
        name: "Settings",
        path: "/settings",
        component: Settings,
        visible: false
    }
];

export default routes;