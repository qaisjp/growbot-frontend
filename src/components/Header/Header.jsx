import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'
import styles from '../../assets/components/Header/jss/header-style';
import NavigationDrawer from '../Drawer/NavigationDrawer'
import { openDrawer } from '../../actions/open_drawer'

class Header extends Component {

    state = {
        loggedIn: false
    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
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
                        <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                            GrowBot
                        </Typography>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={() => {}}
                            color="inherit"
                        >
                            { this.state.loggedIn ?  <AccountCircle /> : <Button color="inherit">Login</Button> }
                        </IconButton>
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
        open: state.drawer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showDrawer : openDrawer}, dispatch)
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(Header));