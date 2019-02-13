import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from '../components/Header/Header';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core';
import routes from '../routes/Routes';
import Typography from '@material-ui/core/Typography';
import styles from '../assets/layout-style';
import colors from '../assets/color-style'

class Layout extends Component {

    static getPathName(url) {
        for(let i = 0; i < routes.length; i++) {
            let route = routes[i];
            if(route.path === url) {
                return route.name;
            }
        }

        return null;
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={colors}>
            <div className={classes.appFrame}>
                <Header routes={routes.filter(route => route.visible)} />
                <div className={classes.contextHeader}><Typography component="h2" variant="display2" color="inherit">{Layout.getPathName(window.location.pathname)}</Typography></div>
                <main className={classes.content}>
                    <Switch>
                        {

                            routes.map((prop) => {

                                return <Route key = {prop.name} exact path={prop.path} render={(props) => <prop.component {...props}/>}/>

                            })

                        }
                    </Switch>
                </main>

                <br/>
                <br/>
                <center><Typography variant="overline" gutterBottom>Designed by Raees for Team XIV.</Typography></center>
            </div></MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Layout);