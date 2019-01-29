import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Appbar from '../components/Header/Header';
import {withStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import routes from '../routes/Routes';
import Typography from '@material-ui/core/Typography';
import styles from '../assets/layout-style';

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
            <div className={classes.appFrame}>
                <Appbar routes={routes}/>
                <Paper className={classes.contextHeader}><Typography component="h2" variant="display2" color="inherit">{Layout.getPathName(window.location.pathname)}</Typography></Paper>
                <br/>
                <main className={classes.content}>
                    <Switch>
                        {

                            routes.map((prop) => {

                                return <Route key = {prop.name} exact path={prop.path} render={(props) => <prop.component {...props}/>}/>

                            })

                        }
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Layout);