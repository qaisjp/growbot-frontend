import Controller from "../newviews/Controller/Controller";
import Gallery from "../newviews/Gallery/Gallery";
import Home from "../newviews/Home/Home";
import Scheduler from "../newviews/Scheduler/Scheduler";

const routes = [
  {
    path: "/controller",
    name: "Controller",
    icon: "pe-7s-graph",
    component: Controller
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "pe-7s-graph",
    component: Gallery
  },
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Home
  },
  {
    path: "/scheduler",
    name: "Scheduler",
    icon: "pe-7s-graph",
    component: Scheduler
  },
  { redirect: true, path: "/", to: "/home", name: "Dashboard" }
];

export default routes;
