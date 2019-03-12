import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Photo";
import ControllerIcon from "@material-ui/icons/ControlPoint";

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
    name: "Home",
    path: "/home",
    component: Home,
    icon: <HomeIcon color="action"/>,
    visible: true
  },
  {
    name: "Gallery",
    path: "/gallery",
    component: Gallery,
    icon: <GalleryIcon/>,
    visible: true
  },
  {
    name: "Stream & Controller",
    path: "/controller",
    component: Controller,
    icon: <ControllerIcon/>,
    visible: true
  },
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    visible: false
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
