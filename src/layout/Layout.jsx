import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import {withStyles} from '@material-ui/core';
import style from './layout-style'
import routes from '../routes/Routes';


class Layout extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.appFrame}>
                <Sidebar routes={routes}/>
                <main className={classes.content}>
                    <Switch>
                        {
                            routes.map((prop) => {
                                return <Route key={prop.name} path={prop.path} render={(props) => <prop.component {...props}/>}/>
                            })
                        }
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(style)(Layout);