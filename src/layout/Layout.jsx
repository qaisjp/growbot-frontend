import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Appbar from '../components/Header/Header';
import {withStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import routes from '../routes/Routes';
import Typography from '@material-ui/core/Typography';

let styles = theme => ({
    contextHeader: {
        padding: theme.spacing.unit * 7,
        width: '100%',
        align: 'center',
        textAlign: 'left',
        color: '#ffffff',
        background: '#339933',
    }
});

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
                                return (<div>
                                        <Paper className={classes.contextHeader}><Typography component="h2" variant="display2" color="inherit">{prop.name}</Typography></Paper>
                                        <Route key = {prop.name} exact path={prop.path} render={(props) => <prop.component {...props}/>}/></div>
                                )})
                        }
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Layout);