import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import styles from "../../assets/components/Header/jss/header-style";
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
    const {
      classes,
      menuFunctionRoutes,
      menuRedirectRoutes,
      loggedIn
    } = this.props;
    const { anchorEl } = this.state;
    const menuOpen = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              <Button component={RouterLink} to="/" color="inherit">
                GrowBot
              </Button>
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
                      <MenuItem onClick={() => menuFunctionRoute.func(this)}>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoginPending: state.auth.isLoginPending,
    loggedIn: state.auth.isLoginSuccess,
    loginError: state.auth.loginError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
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
