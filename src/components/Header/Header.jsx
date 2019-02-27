import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavigationDrawer from '../Drawer/NavigationDrawer'
import styles from '../../assets/components/Header/jss/header-style';
import { openDrawer } from '../../actions/open_drawer'
import logout from '../../actions/logout_auth'

class Header extends Component {

    state = {
        anchorEl: null
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        let { classes, open, loggedIn } = this.props;

        let loginContent = <Button component={RouterLink} to="/login" color="inherit">Login</Button>;
        if (loggedIn) {
            loginContent = (
                <div>
                    <Button component={RouterLink} to="/settings" color="inherit">Settings</Button>
                    <Button onClick={this.props.authLogout.bind(this)} color="inherit">Logout</Button>
                    {/* <IconButton
                        aria-owns={menuOpen ? 'menu-appbar' : undefined}
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
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={menuOpen}
                        onClose={this.handleClose}
                    >
                        {

                            menuFunctionRoutes.map(menuFunctionRoute => {
                                return <MenuItem onClick={()=>menuFunctionRoute.func(this)}>{menuFunctionRoute.name}</MenuItem>
                            })

                        }

                        {
                            menuRedirectRoutes.map(menuRedirectRoute => {
                                return <MenuItem component={RouterLink} to={menuRedirectRoute.url}>{menuRedirectRoute.name}</MenuItem>
                            })
                        }
                    </Menu> */}
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        {/* <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.showDrawer}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton> */}

                        <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                            <Button component={RouterLink} to="/" color="inherit">GrowBot</Button>
                        </Typography>

                        <Button target="_blank" href="https://goo.gl/forms/IGczlsR2sYve5YNq2" color="inherit">Survey</Button>

                        {loginContent}
                    </Toolbar>
                </AppBar>

                <NavigationDrawer routes={this.props.routes} />

                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                </main>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showDrawer: _ => dispatch(openDrawer()),
        authLogout: (email) => dispatch(logout())
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(Header));