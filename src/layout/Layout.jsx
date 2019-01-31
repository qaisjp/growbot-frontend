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

    static decodeMsg(msg) {

    }

    handleMovementRequest= (message) => {
        this.webSocket.send(message);
        console.log("SENT MESSAGE!")
    }



    componentDidMount() {
        this.webSocket = new WebSocket("ws://localhost:8080/");

        this.webSocket.onopen = () => {
            console.log("[Layout jsx]: web-socket opened!");
        }

        this.webSocket.onmessage = (msg) => {
            console.log("[Layout.jsx]: received frames from vision system");
            console.log("[Layout.jsx]: contents of frames: " + msg);
            Layout.decodeMsg(msg);
        }
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

                                return <Route key = {prop.name} exact path={prop.path} render={(props) => <prop.component {...props} send={this.handleMovementRequest}/>}/>

                            })

                        }
                    </Switch>
                </main>

                <br/>
                <br/>
                <center><Typography variant="overline" gutterBottom>Designed by Raees for Team XIV.</Typography></center>
            </div>
        );
    }
}

export default withStyles(styles)(Layout);