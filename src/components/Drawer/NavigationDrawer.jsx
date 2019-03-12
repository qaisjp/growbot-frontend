import React, { Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import styles from "../../assets/components/Drawer/jss/navigation-drawer-style";
import logo from "../../assets/components/Drawer/img/logo.png";
import { closeDrawer } from "../../actions/close_drawer";

class NavigationDrawer extends Component {
  isSelectedRoute = path => {
    return window.location.pathname === path;
  };

  render() {
    let { classes, theme } = this.props;
    let { open } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.hideDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <img src={logo} alt="growbot-logo" className={classes.image} />
        <Divider />
        <List>
          {this.props.routes.map((prop, index) => {
            const isCurrPath = this.isSelectedRoute(prop.path);
            return (
              <Link
                component={RouterLink}
                className={classes.link}
                to={prop.path}
                key={prop.name}
              >
                <ListItem
                  button
                  key={prop.name}
                  className={classNames({
                    [classes.listItem]: true,
                    [classes.selected]: isCurrPath
                  })}
                >
                  <ListItemText
                    primary={prop.name}
                  >
                  </ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.drawer
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ hideDrawer: closeDrawer }, dispatch);
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(NavigationDrawer));
