import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core';

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"

import endpoints from '../../endpoints';
import styles from '../../assets/views/MovementControl/jss/movement-control-style';
import banner from '../../assets/views/MovementControl/img/banner.jpg'
import online from '../../assets/views/MovementControl/img/green_circle.png'
import offline from '../../assets/views/MovementControl/img/red_circle.png'
import {connect} from "react-redux";

class MovementControl extends Component {

    state = {
        checkedDetection: false,
        message: "",
        type: "",
        open: false,
        dialogOpen: false,
        selectedRobotId: null,
        robots: [],
        newRobotSerialKey: "",
        dialogType: ""
    }

    onChangeObjectDetection = async () => {
        let objectDetectionActive = !this.state.checkedDetection
        let objectDetectionCommand = {
            "key": "object_avoidance",
            "value": objectDetectionActive
        }
        let response = await fetch(endpoints.robot_settings(this.state.selectedRobotId), {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_startDemo(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_startDemo(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_move(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_move(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_move(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_move(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

        let response = await fetch(endpoints.robot_move(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
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

    handleListItemClick = (event, uuid) => {
        this.setState({selectedRobotId: uuid});
    };

    robotsApi = async () => {
        console.log(this.props.isLoginSuccess);
        console.log(this.props.loginToken);
        let response = await fetch(endpoints.robots_list, {
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
                "Content-Type": "application/json",
            },
        });
        let body = await response.text();

        if (response.status === 200) {
            let data = JSON.parse(body);
            return data;
        }
        return new Error(body);
    }

    componentDidMount = async () => {
        let result = []
        try {

            result = await this.robotsApi();

            if (result instanceof Error) {
                console.log(result.message)
                this.setState({robots: []})
            } else {
                console.log("NOT NULL")
                console.log(result.robots)
                this.setState({robots: result.robots})
            }

            console.log(this.state.robots)

        } catch (e) {
            //set lorem ipsum robots here
        }
    }

    isRobotOnline = (robot) => {
        return robot.seen_at !== null
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    handleDialogOpenAdd = () => {
        this.setState({dialogOpen: true, dialogType: "add"})
    }

    handleDialogOpenRemove = () => {
        this.setState({dialogOpen: true, dialogType: "remove"})
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    onAddRobot = async () => {
        let addRobotRequest = {
            robot_id: this.state.newRobotSerialKey,
            title: "Robot 1"
        }

        console.log("[TOKEN] " + this.props.loginToken)
        let response = await fetch(endpoints.robots_register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.props.loginToken
            },
            body: JSON.stringify(addRobotRequest)
        });

        if (response.status === 200) {
            console.log('200')

            let result = await this.robotsApi();

            if (result instanceof Error) {
                console.log(result.message)
                this.setState({robots: []})
            } else {
                console.log("NOT NULL")
                console.log(result.robots)
                this.setState({robots: result.robots})
            }
        } else {
            console.log('not 200')
            response.text().then(x => console.log(x))
        }
    }

    onRemoveRobot = async () => {
        console.log(this.state.selectedRobotId)
        let response = await fetch(endpoints.robot_delete(this.state.selectedRobotId), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken
            },
        });

        console.log("response status " + response.status)

        if(response.status === 200) {

            let result = await this.robotsApi();

            if (result instanceof Error) {
                console.log(result.message)
                this.setState({robots: []})
            } else {
                console.log("NOT NULL")
                console.log(result.robots)
                this.setState({robots: result.robots})
            }
        } else {

        }
    }

    getSelectedRobot = () => {
        for(let robot in this.state.robots) {
            if(robot.id === this.state.selectedRobotId) {
                return robot;
            }
        }

        return null;
    }

    render() {
        let {classes} = this.props;
        return <div className={classes.root}>
            <br/>
            <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {
                        this.state.dialogType === "add" ? "Add Robot" : "Remove Robot"
                    }
                </DialogTitle>
                {
                    this.state.dialogType === "add" ? <DialogContent>
                        <DialogContentText>
                            To add a robot please fill in the serial key below
                        </DialogContentText>
                        <TextField
                            id="addRobot"
                            label="Serial key"
                            className={classes.textField}
                            value={this.state.newRobotSerialKey}
                            onChange={this.handleChange('newRobotSerialKey')}
                            margin="normal"
                        />
                    </DialogContent> : <DialogContentText>Are you sure you want to delete the robot ?</DialogContentText>
                }

                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    {
                        this.state.dialogType === "add" ? <Button onClick={this.onAddRobot} color="primary">
                            Add
                        </Button> : <Button onClick={this.onRemoveRobot} color="primary">
                            Remove
                        </Button>
                    }

                </DialogActions>
            </Dialog>
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
                <Grid item xs={12} sm={6} md={6}>
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
                                    { this.state.robots.length === 0 ? "Please add some robots to your account" : "Select the name of a Growbot you would like to control" }
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <List className={classes.root}>

                                {
                                    this.state.robots.map(robot => (
                                        <ListItem
                                            key={robot.id}
                                            alignItems="flex-start"
                                            button
                                            selected={this.state.selectedRobotId === robot.id}
                                            onClick={event => this.handleListItemClick(event, robot.id)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar src={this.isRobotOnline(robot) ? online : offline}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={robot.title}
                                                secondary={
                                                    robot.seen_at === null ?
                                                        <React.Fragment>Please start this growbot</React.Fragment> :
                                                        <React.Fragment>
                                                            {`Charge: ${robot.battery_level}%; Water Volume: ${robot.water_level}ml`}
                                                        </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                            <Button size="small" color="primary" onClick={this.handleDialogOpenAdd}>
                                Add Robot
                            </Button>
                            <Button size="small" color="primary" onClick={this.handleDialogOpenRemove}>
                                Remove Robot
                            </Button>
                        </CardActions>
                    </Card></Grid>
                <Grid item xs={12} sm={6} md={6}>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MovementControl));