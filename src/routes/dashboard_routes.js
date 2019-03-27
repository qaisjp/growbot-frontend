import Controller from "../views/Controller/Controller";
import Gallery from "../views/Gallery/Gallery";
import Home from "../views/Home/Home";
import Scheduler from "../views/Scheduler/Scheduler";
import Settings from "../views/Settings/Settings";

const routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-home",
    sidebar: true,
    component: Home
  },
  {
    path: "/controller",
    name: "Controller",
    icon: "pe-7s-compass",
    sidebar: true,
    component: Controller
  },
  {
    path: "/scheduler",
    name: "Scheduler",
    icon: "pe-7s-clock",
    sidebar: true,
    component: Scheduler
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "pe-7s-photo-gallery",
    sidebar: true,
    component: Gallery
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "pe-7s-settings",
    sidebar: false,
    component: Settings
  },
  { redirect: true, path: "/", to: "/home", name: "Dashboard" }
];

export default routes;
