import Dashboard from "../views/Dashboard/Dashboard";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import Register from "../views/Register/Register";
import Settings from "../views/Settings/Settings";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard
  },
  {
    name: "Account Login",
    path: "/login",
    component: Login
  },
  {
    name: "Recover Password",
    path: "/recover",
    component: ForgotPassword
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "Settings",
    path: "/settings",
    component: Settings
  },
  {
    name: "Home",
    path: "/home",
    component: Home
  }
];

export default routes;
