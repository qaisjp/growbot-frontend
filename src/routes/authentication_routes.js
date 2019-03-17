import Dashboard from "../layout/Dashboard/Dashboard.jsx";
import Login from "../newviews/Login/Login.jsx";
import Register from "../newviews/Register/Register.jsx";

const indexRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
