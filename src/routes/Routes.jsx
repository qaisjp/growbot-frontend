import React from "react";

import SvgIcon from "@material-ui/core/SvgIcon";

import Controller from "../views/Controller/Controller";
import Dashboard from "../views/Dashboard/Dashboard";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import Register from "../views/Register/Register";
import Scheduler from "../views/Scheduler/Scheduler";
import Settings from "../views/Settings/Settings";
import Gallery from "../views/Gallery/Gallery";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    icon: (
      <SvgIcon>
        <path fill="#ffffff" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
      </SvgIcon>
    ),
    visible: true
  },
  {
    name: "Gallery",
    path: "/gallery",
    component: Gallery,
    icon: (
      <SvgIcon>
        <path
          fill="#ffffff"
          d="M6,19L9,15.14L11.14,17.72L14.14,13.86L18,19H6M6,4H11V12L8.5,10.5L6,12M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z"
        />
      </SvgIcon>
    ),
    visible: true
  },
  {
    name: "Scheduler",
    path: "/scheduler",
    component: Scheduler,
    icon: (
      <SvgIcon>
        <path
          fill="#ffffff"
          d="M14,19H22V17H14V19M14,13.5H22V11.5H14V13.5M14,8H22V6H14V8M2,12.5C2,8.92 4.92,6 8.5,6H9V4L12,7L9,10V8H8.5C6,8 4,10 4,12.5C4,15 6,17 8.5,17H12V19H8.5C4.92,19 2,16.08 2,12.5Z"
        />
      </SvgIcon>
    ),
    visible: true
  },
  {
    name: "Stream & Controller",
    path: "/controller",
    component: Controller,
    icon: (
      <SvgIcon>
        <path
          fill="#ffffff"
          d="M9,12C9,11.19 9.3,10.5 9.89,9.89C10.5,9.3 11.19,9 12,9C12.81,9 13.5,9.3 14.11,9.89C14.7,10.5 15,11.19 15,12C15,12.81 14.7,13.5 14.11,14.11C13.5,14.7 12.81,15 12,15C11.19,15 10.5,14.7 9.89,14.11C9.3,13.5 9,12.81 9,12M5.53,8.44L7.31,10.22L5.53,12L7.31,13.78L5.53,15.56L2,12L5.53,8.44M8.44,18.47L10.22,16.69L12,18.47L13.78,16.69L15.56,18.47L12,22L8.44,18.47M18.47,15.56L16.69,13.78L18.47,12L16.69,10.22L18.47,8.44L22,12L18.47,15.56M15.56,5.53L13.78,7.31L12,5.53L10.22,7.31L8.44,5.53L12,2L15.56,5.53Z"
        />
      </SvgIcon>
    ),
    visible: true
  },
  {
    name: "OLD_DASHBOARD",
    path: "/old",
    component: Dashboard,
    icon: (
      <SvgIcon>
        <path
          fill="#ffffff"
          d="M9,12C9,11.19 9.3,10.5 9.89,9.89C10.5,9.3 11.19,9 12,9C12.81,9 13.5,9.3 14.11,9.89C14.7,10.5 15,11.19 15,12C15,12.81 14.7,13.5 14.11,14.11C13.5,14.7 12.81,15 12,15C11.19,15 10.5,14.7 9.89,14.11C9.3,13.5 9,12.81 9,12M5.53,8.44L7.31,10.22L5.53,12L7.31,13.78L5.53,15.56L2,12L5.53,8.44M8.44,18.47L10.22,16.69L12,18.47L13.78,16.69L15.56,18.47L12,22L8.44,18.47M18.47,15.56L16.69,13.78L18.47,12L16.69,10.22L18.47,8.44L22,12L18.47,15.56M15.56,5.53L13.78,7.31L12,5.53L10.22,7.31L8.44,5.53L12,2L15.56,5.53Z"
        />
      </SvgIcon>
    ),
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
