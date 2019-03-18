import Home from "../newviews/Home/Home";
import Settings from "../newviews/Settings/Settings";
import Scheduler from "../newviews/Scheduler/Scheduler";

const routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "pe-7s-graph",
    component: Settings
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
