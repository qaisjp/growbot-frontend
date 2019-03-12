import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/Header/Header";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import routes from "../routes/Routes";
import menuRoutes from "../components/Header/header_actions";
import menuRouteTypes from "../components/Header/header_action_types";
import Typography from "@material-ui/core/Typography";
import styles from "../assets/layout/jss/layout-style";
import colors from "../assets/layout/jss/color-style";
import { connect } from "react-redux";

class Layout extends Component {
  static getPathName(url) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.path === url) {
        return route.name;
      }
    }

    return null;
  }

  render() {
    const { classes, loggedIn, location } = this.props;

    let redirectLogin = null;
    let isAuthPage =
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/chgpass";
    if (!loggedIn && !isAuthPage) {
      redirectLogin = <Redirect to={"/login"} />;
    } else if (loggedIn && isAuthPage) {
      redirectLogin = <Redirect to={"/"} />;
    }

    return (
      <MuiThemeProvider theme={colors}>
        <div className={classes.appFrame}>
          <Header
            routes={routes.filter(route => route.visible)}
            menuFunctionRoutes={menuRoutes.filter(
              menuRoute => menuRoute.type === menuRouteTypes.function
            )}
            menuRedirectRoutes={menuRoutes.filter(
              menuRoute => menuRoute.type === menuRouteTypes.redirect
            )}
          />
          <div className={classes.contextHeader}>
            <Typography component="h2" variant="h2" color="inherit">
              {Layout.getPathName(window.location.pathname)}
            </Typography>
          </div>
          <main className={classes.content}>
            {redirectLogin}
            <Switch>
              {routes.map(prop => {
                return (
                  <Route
                    key={prop.name}
                    exact
                    path={prop.path}
                    render={props => <prop.component {...props} />}
                  />
                );
              })}
            </Switch>
          </main>

          <br />
          <br />
          <center>
            <Typography variant="overline" gutterBottom>
              Designed by Raees for Team XIV.
            </Typography>
          </center>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.isLoginSuccess,
    loginToken: state.auth.loginToken
  };
}

function mapDispatchToProps() {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Layout))
);
