import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core';
import styles from '../../assets/view-style';

class MovementControl extends Component {

    render() {
        let {classes} = this.props;
        return <div className={classes.root}>
            <Grid container xs={12} spacing={40}>
                <Grid item>
                    <Paper className={classes.paper}>xs=12bbjbjnkkjkjnkjjkn</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>xs=6jojjojoioijoijoji</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>xs=6kjnjknjnkjknjkn</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>xs=3jnjnjnkjknkjnkjnjkn</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>xs=3jknnjkjknnjkjknjkjnk</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>xs=3kjnkjnknjknjknjkjnkjnkj</Paper>
                </Grid>
            </Grid>
        </div>
    }
}

export default withStyles(styles)(MovementControl);