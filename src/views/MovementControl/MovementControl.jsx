import React, { Component } from 'react';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"
import styles from '../../assets/view-style';

class MovementControl extends Component {

    state = {
        message: "",
        type: "",
        open: false
    }


    onMoveNorth = async () => {
        let directionCommand = {
            id: "c14e69bd-a50b-4ab8-8045-f81fcc2bc668",
            direction: "north"
        }

        let response = await fetch("http://api.growbot.tardis.ed.ac.uk/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });
        console.log(response);
        if(response.status === 200) {
            this.setState({message: "Successfully moved robot north", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }


    onMoveSouth = async () => {
        let directionCommand = {
            id: "c14e69bd-a50b-4ab8-8045-f81fcc2bc668",
            direction: "south"
        }

        let response = await fetch("http://api.growbot.tardis.ed.ac.uk/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if(response.status === 200) {
            this.setState({message: "Successfully moved robot south", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }


    onMoveEast = async () => {
        let directionCommand = {
            id: "c14e69bd-a50b-4ab8-8045-f81fcc2bc668",
            direction: "north"
        }

        let response = await fetch("http://api.growbot.tardis.ed.ac.uk/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if(response.status === 200) {
            this.setState({message: "Successfully moved robot east", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }


    onMoveWest = async () => {
        let directionCommand = {
            id: "c14e69bd-a50b-4ab8-8045-f81fcc2bc668",
            direction: "south"
        }

        let response = await fetch("http://api.growbot.tardis.ed.ac.uk/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if(response.status === 200) {
            this.setState({message: "Successfully moved robot west", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        let {classes} = this.props;
        return <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <SnackbarContentWrapper
                    onClose={this.handleClose}
                    variant={this.state.type}
                    message={this.state.message}
                />
            </Snackbar>
            <Grid container xs={12} spacing={24}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 1
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Move Growbot Up by clicking the Move button.
                        </Typography>
                        <Button size="small" onClick={this.onMoveNorth}>Move Up</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 2
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Move Growbot Down by clicking the Move button.
                        </Typography>
                        <Button size="small" onClick={this.onMoveSouth}>Move Down</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 3
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Move Growbot left by clicking the Move button.
                        </Typography>
                        <Button size="small" onClick={this.onMoveEast}>Move Left</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 4
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Move Growbot right by clicking the Move button.
                        </Typography>
                        <Button size="small" onClick={this.onMoveWest}>Move Right</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}

export default withStyles(styles)(MovementControl);