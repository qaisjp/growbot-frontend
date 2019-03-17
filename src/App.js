import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import authRoutes from "./routes/authentication_routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/pe-icon-7-stroke.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {authRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key}/>;
        })}
      </Switch>
    </BrowserRouter>
  );

};

export default App;