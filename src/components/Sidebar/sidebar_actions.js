import store from "../../store";
import logout from "../../actions/logout";

const actions = [
  {
    name: "Logout",
    icon: "pe-7s-graph",
    action: () => {
      store.dispatch(logout());
    }
  }
];

export default actions;
