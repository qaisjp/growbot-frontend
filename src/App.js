import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";
import authRoutes from "./routes/authentication_routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/pe-icon-7-stroke.css";
import "react-datetime/css/react-datetime.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {authRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} component={prop.component} key={key} />
            );
          })}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
