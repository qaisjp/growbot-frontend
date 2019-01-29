import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Appbar from '../components/Appbar/Appbar';
import {withStyles} from '@material-ui/core';
import routes from '../routes/Routes';


class Layout extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.appFrame}>
                <Appbar routes={routes}/>
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

export default withStyles({})(Layout);