import Controller from "../views/Controller/Controller";
import Dashboard from "../views/Dashboard/Dashboard";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import Register from "../views/Register/Register";
import Settings from "../views/Settings/Settings";
import Gallery from "../views/Gallery/Gallery";

const routes = [
  {
    name: "Movement & Controller",
    path: "/controller",
    component: Controller,
    visible: true
  },
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
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
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
    visible: true
  },
  {
    name: "Gallery",
    path: "/gallery",
    component: Gallery,
    visible: true
  }
];

export default routes;
