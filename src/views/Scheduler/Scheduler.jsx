import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';

import styles from '../../assets/views/Scheduler/jss/scheduler-style'
import banner from '../../assets/views/Scheduler/img/banner.jpg'

class Scheduler extends Component {

    render() {
        let {classes} = this.props;
        return <main className={classes.main}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={banner}
                    title="Video"
                    width='100%'
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Schedule
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </main>

    }
}

export default withStyles(styles)(Scheduler)