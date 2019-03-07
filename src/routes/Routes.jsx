import Dashboard from '../views/Dashboard/Dashboard'
import Login from '../views/Login/Login'
import ForgotPassword from '../views/ForgotPassword/ForgotPassword'
import Register from '../views/Register/Register'
import Scheduler from '../views/Scheduler/Scheduler'
import Settings from '../views/Settings/Settings'

let routes = [
    {
        name: "Dashboard",
        path: "/",
        component: Dashboard,
        visible: true
    },
    {
        name: "Scheduler",
        path: "/scheduler",
        component: Scheduler,
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