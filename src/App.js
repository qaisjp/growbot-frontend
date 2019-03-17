import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import indexRoutes from "./routes/index";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route to={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
