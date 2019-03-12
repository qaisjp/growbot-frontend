import React from "react";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import styles from "../../assets/components/Drawer/jss/navigation-drawer-style";
import logo from "../../assets/components/Drawer/img/logo.png";
import { closeDrawer } from "../../actions/close_drawer";

function NavigationDrawer(props) {
  const { classes, theme, open, hideDrawer,routes } = props;
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
        <IconButton onClick={hideDrawer}>
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
        {routes.map((prop, index) => {
          const isCurrPath = window.location.pathname === prop.path;
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
                <ListItemIcon>
                  {prop.visible && prop.icon}
                </ListItemIcon>

                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      className={classes.listItemText}
                      variant="body1"
                      gutterBottom
                    >
                      {prop.name}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
}

const mapStateToProps = state => {
  return {
    open: state.drawer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ hideDrawer: closeDrawer }, dispatch);
};

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(NavigationDrawer));
