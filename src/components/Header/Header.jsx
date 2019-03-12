import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import NavigationDrawer from "../Drawer/NavigationDrawer";
import styles from "../../assets/components/Header/jss/header-style";
import { openDrawer } from "../../actions/open_drawer";
import logout from "../../actions/logout";

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    let {
      classes,
      open,
      menuFunctionRoutes,
      menuRedirectRoutes,
      loggedIn
    } = this.props;
    let { anchorEl } = this.state;
    let menuOpen = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.showDrawer}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              GrowBot
            </Typography>

            {!loggedIn ? (
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
            ) : (
              <div>
                <IconButton
                  aria-owns={menuOpen ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={menuOpen}
                  onClose={this.handleClose}
                >
                  {menuFunctionRoutes.map(menuFunctionRoute => {
                    return (
                      <MenuItem
                        key={menuFunctionRoute.name}
                        onClick={() => menuFunctionRoute.func(this)}
                      >
                        {menuFunctionRoute.name}
                      </MenuItem>
                    );
                  })}

                  {menuRedirectRoutes.map(menuRedirectRoute => {
                    return (
                      <MenuItem
                        component={RouterLink}
                        to={menuRedirectRoute.url}
                      >
                        {menuRedirectRoute.name}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <NavigationDrawer routes={this.props.routes} />

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.drawer,
    isLoginPending: state.auth.isLoginPending,
    loggedIn: state.auth.isLoginSuccess,
    loginError: state.auth.loginError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showDrawer: _ => dispatch(openDrawer()),
    logout: email => dispatch(logout())
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Header));
