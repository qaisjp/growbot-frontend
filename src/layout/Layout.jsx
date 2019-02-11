import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Appbar from '../components/Header/Header';
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


    componentDidMount() {
        /*
        this.webSocket = new WebSocket("ws://localhost/stream/c14e69bd-a50b-4ab8-8045-f81fcc2bc668");

        this.webSocket.onopen = () => {
            console.log("[Layout jsx]: web-socket opened!");
        }

        this.webSocket.onmessage = (msg) => {
            console.log("[Layout.jsx]: received frames from vision system");
            console.log("[Layout.jsx]: contents of frames: " + msg);
            Layout.decodeMsg(msg);
        }*/
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={colors}>
            <div className={classes.appFrame}>
                <Appbar routes={routes.filter(route => route.visible)}/>
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