import Home from "../newviews/Home/Home.jsx";
import Settings from "../newviews/Settings/Settings.jsx";

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
  { redirect: true, path: "/", to: "/home", name: "Dashboard" }
];

export default routes;
