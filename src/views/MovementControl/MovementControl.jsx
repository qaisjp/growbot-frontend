import React, { Component } from 'react';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from '../../assets/view-style';

class MovementControl extends Component {

    render() {
        let {classes} = this.props;
        return <div className={classes.root}>
            <Grid container xs={12} spacing={24}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 1
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Move Growbot slightly forwards by clicking the Move button.
                        </Typography>
                        <Button size="small">Move Forwards</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 2
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Move Growbot slightly backwards by clicking the Move button.
                        </Typography>
                        <Button size="small">Move Backwards</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 4
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Turn GrowBot by 90 degrees backwards by clicking the Turn button.
                        </Typography>
                        <Button size="small">Turn Backwards</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Test GrowBot - 3
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Turn GrowBot by 90 degrees forwards by clicking the Turn button.
                        </Typography>
                        <Button size="small">Turn Forwards</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}

export default withStyles(styles)(MovementControl);