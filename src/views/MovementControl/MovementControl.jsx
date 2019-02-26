import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core';

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"

import endpoints from '../../endpoints';
import styles from '../../assets/views/MovementControl/jss/movement-control-style';
import banner from '../../assets/views/MovementControl/img/banner.jpg'
import online from '../../assets/views/MovementControl/img/green_circle.png'
import offline from '../../assets/views/MovementControl/img/red_circle.png'
import {connect} from "react-redux";

const robot_uuid = "c14e69bd-a50b-4ab8-8045-f81fcc2bc668";

class MovementControl extends Component {

    state = {
        checkedDetection: false,
        message: "",
        type: "",
        open: false,
        selectedIndex: 0,
        robots: []
    }

    onChangeObjectDetection = async () => {
        let objectDetectionActive = !this.state.checkedDetection
        let objectDetectionCommand = {
            "key": "object_avoidance",
            "value": objectDetectionActive
        }
        let response = await fetch(endpoints.robot_settings(robot_uuid), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objectDetectionCommand)
        });
        console.log(response);
        if (response.status === 200) {
            this.setState({message: "Successfully changed object detection mode", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    onMakeSquare = async () => {
        let directionCommand = {
            procedure: "square"
        }

        let response = await fetch(endpoints.robot_startDemo(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });
        console.log(response);
        if (response.status === 200) {
            this.setState({message: "Successfully moved robot forward", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    onRandomMove = async () => {
        let directionCommand = {
            procedure: "random_move"
        }

        let response = await fetch(endpoints.robot_startDemo(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });
        console.log(response);
        if (response.status === 200) {
            this.setState({message: "Successfully moved robot forward", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }


    onMoveForward = async () => {
        let directionCommand = {
            direction: "forward"
        }

        let response = await fetch(endpoints.robot_move(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });
        console.log(response);
        if (response.status === 200) {
            this.setState({message: "Successfully moved robot forward", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }


    onMoveBackward = async () => {
        let directionCommand = {
            direction: "backward"
        }

        let response = await fetch(endpoints.robot_move(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if (response.status === 200) {
            this.setState({message: "Successfully moved robot backward", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    onMoveRight = async () => {
        let directionCommand = {
            direction: "right"
        }

        let response = await fetch(endpoints.robot_move(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if (response.status === 200) {
            this.setState({message: "Successfully moved robot right", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }


    onMoveLeft = async () => {
        let directionCommand = {
            direction: "left"
        }

        let response = await fetch(endpoints.robot_move(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if (response.status === 200) {
            this.setState({message: "Successfully moved robot left", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    onBrake = async () => {
        let directionCommand = {
            direction: "brake"
        }

        let response = await fetch(endpoints.robot_move(robot_uuid), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(directionCommand)
        });

        console.log(response);

        if (response.status === 200) {
            this.setState({message: "Successfully braked", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleListItemClick = (event, index) => {
        this.setState({selectedIndex: index});
    };

    robotsApi = async () => {
        console.log(this.props.loginToken)
        let response = await fetch(endpoints.robots_list, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.props.loginToken
            },
        });
        let body = await response.text();

        if(response.status === 200) {
            let data = JSON.parse(body);
            return data;
        }
        return new Error(body);
    }

    componentDidMount = async () => {
        let result = []
        try {

            result = await this.robotsApi();

            if(result instanceof Error) {
                console.log(result.message)
                this.setState({robots: []})
            } else {
                console.log("NOT NULL")
                console.log(result.robots)
                this.setState({robots: result.robots})
            }

            console.log(this.state.robots)

        } catch(e) {
            //set lorem ipsum robots here
        }
    }

    isRobotOnline = (robot) => {
        return robot.seen_at !== null
    }

    render() {
        let {classes} = this.props;
        return <div className={classes.root}>

            <br/>
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
            <Grid container spacing={12}>
                <Grid item xs={5}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={banner}
                                title="Robots"
                                width='100%'
                            />
                            <CardContent>

                                <Typography gutterBottom variant="h5" component="h2">
                                    Robots
                                </Typography>
                                <Typography component="p">
                                    Select the name of a Growbot you would like to control.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <List className={classes.root}>

                                {
                                    this.state.robots.map(robot => (
                                        <ListItem
                                            alignItems="flex-start"
                                            button
                                            selected={this.state.selectedIndex === 0}
                                            onClick={event => this.handleListItemClick(event, 0)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar src={this.isRobotOnline(robot) ? online : offline}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={robot.title}
                                                secondary={
                                                    <React.Fragment>
                                                        {`Charge: ${robot.battery_level}%; Water Volume: ${robot.water_level}ml`}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </CardActions>
                    </Card></Grid>
                <Grid item xs={5}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={banner}
                                title="Controller"
                                width='100%'
                            />
                            <CardContent>

                                <Typography gutterBottom variant="h5" component="h2">
                                    Controller
                                </Typography>
                                <Typography component="p">
                                    Move Growbot around by pressing the navigation buttons below the card.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Grid container>
                                <Grid item>
                                    <Button size="small" onClick={this.onMoveForward}>Forwards</Button></Grid>
                                <Grid item>
                                    <Button size="small" onClick={this.onMoveBackward}>Backwards</Button></Grid>
                                <Grid item>
                                    <Button size="small" onClick={this.onMoveLeft}>Left</Button></Grid>
                                <Grid item>
                                    <Button size="small" onClick={this.onMoveRight}>Right</Button></Grid>
                                <Grid item>
                                    <Button size="small" onClick={this.onRandomMove}>Random Move</Button></Grid>
                                <Grid item>
                                    <Button size="small" onClick={this.onMakeSquare}>Make Square</Button></Grid>
                                <Grid item>
                                    <Button size="small" onClick={this.onBrake}>Brake</Button></Grid>
                                <Grid item>
                                    <FormControlLabel value="checkedDetection" onChange={this.onChangeObjectDetection}
                                                      control={<Checkbox/>}
                                                      label="Object Avoidance"/></Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        isLoginPending: state.auth.isLoginPending,
        isLoginSuccess: state.auth.isLoginSuccess,
        loginError: state.auth.loginError,
        loginToken: state.auth.loginToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(MovementControl));