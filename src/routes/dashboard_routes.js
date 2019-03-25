import Controller from "../newviews/Controller/Controller";
import Gallery from "../newviews/Gallery/Gallery";
import Home from "../newviews/Home/Home";
import Scheduler from "../newviews/Scheduler/Scheduler";
import Settings from "../newviews/Settings/Settings";

const routes = [
  {
    path: "/controller",
    name: "Controller",
    icon: "pe-7s-compass",
    sidebar: true,
    component: Controller
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "pe-7s-photo-gallery",
    sidebar: true,
    component: Gallery
  },
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-home",
    sidebar: true,
    component: Home
  },
  {
    path: "/scheduler",
    name: "Scheduler",
    icon: "pe-7s-clock",
    sidebar: true,
    component: Scheduler
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
