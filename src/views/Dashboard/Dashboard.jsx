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
import styles from '../../assets/views/Dashboard/jss/dashboard-style';
import banner from '../../assets/views/Dashboard/img/banner.jpg'
import online from '../../assets/views/Dashboard/img/green_circle.png'
import offline from '../../assets/views/Dashboard/img/red_circle.png'
import style from '../../assets/views/Dashboard/css/style.css'
import roboticArm from '../../assets/views/Dashboard/img/robotic-arm.svg'
import tdown from '../../assets/views/Dashboard/img/TriangleArrow-Down.svg'
import tup from '../../assets/views/Dashboard/img/TriangleArrow-Up.svg'
import tleft from '../../assets/views/Dashboard/img/TriangleArrow-Left.svg'
import tright from '../../assets/views/Dashboard/img/TriangleArrow-Right.svg'
import indication from '../../assets/views/Dashboard/img/Parking_brake-indication.svg'

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import {connect} from "react-redux";

import QrReader from "react-qr-reader";

class Dashboard extends Component {

    state = {
        checkedDetection: false,
        message: "",
        type: "",
        open: false,
        dialogOpen: false,
        selectedRobotId: null,
        selectedRobot: null,
        robots: [],
        dialogType: "",

        newRobotSerialKey: "",
        newRobotTitle: "",

        qrDelay: 300,
    }

    qrHandleScan(data) {
        const prefix = "growbot:";
        if (data && data.startsWith(prefix)) {
            this.setState({
                newRobotSerialKey: data.slice(prefix.length)
            });
        }
    }

    qrHandleError(err) {
        alert(err);
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

        if (response.status === 200) {
            this.setState({message: "Successfully moved robot forward", open: true, type: "success"})
        } else {
            this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
        }
    }

    onMove = async (direction) => {
        let directionCommand = {
            direction: direction
        }

        let response = await fetch(endpoints.robot_move(this.state.selectedRobotId), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directionCommand)
        });

        if (response.status === 200) {
            this.setState({message: "Successfully moved robot", open: true, type: "success"})
        } else {
            this.setState({message: (await response.json()).message, open: true, type: "error"})
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleListItemClick = (event, robot) => {
        this.setState({selectedRobotId: robot.id, selectedRobot: robot});
    };

    robotsApi = async () => {
        console.log("Current isLoginSuccess", this.props.isLoginSuccess);
        console.log("Current props.loginToken", this.props.loginToken);
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
                console.log("componentDidMount error", result.message)
                this.setState({robots: []})
            } else {
                console.log("componentDidMount", result.robots)
                this.setState({robots: result.robots})
                if (result.robots.length > 0) {
                    this.handleListItemClick(null, result.robots[0]);
                }
            }

            console.log("Robots: ", this.state.robots)

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
            title: this.state.newRobotTitle,
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
            let result = await this.robotsApi();

            if (result instanceof Error) {
                this.setState({robots: []})
            } else {
                this.handleDialogClose()
                this.setState({robots: result.robots})

                const found = result.robots.filter(r => r.id === addRobotRequest.robot_id)
                if (found.length === 1) {
                    this.handleListItemClick(null, found[0]);
                }
            }
        } else {
            response.text().then(x => console.log(x))
        }
    }

    onRemoveRobot = async () => {
        let response = await fetch(endpoints.robot_delete(this.state.selectedRobotId), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken
            },
        });

        if(response.status === 200) {

            let result = await this.robotsApi();

            if (result instanceof Error) {
                this.setState({robots: []})
            } else {
                this.setState({robots: result.robots})
            }
        } else {

        }
    }

    handleDialogOpenRename = async () => {
        const newTitle = prompt("Rename this robot", this.state.selectedRobot.title);
        if (newTitle === "" || newTitle === this.state.selectedRobot.title) {
            alert("Robot not renamed");
            return;
        }

        let response = await fetch(endpoints.robot_settings(this.state.selectedRobot.id), {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + this.props.loginToken
            },
            body: JSON.stringify({
                "key": "title",
                "value": newTitle,
            })
        });

        if(response.status === 200) {
            let result = await this.robotsApi();

            if (result instanceof Error) {
                this.setState({robots: []})
            } else {
                const thisID = this.state.selectedRobot.id;
                this.setState({robots: result.robots, message: (await response.json()).message, open: true, type: "success" })
                const found = result.robots.filter(r => r.id === thisID)
                if (found.length === 1) {
                    this.handleListItemClick(null, found[0]);
                }
            }
        } else {
            this.setState({message: (await response.json()).message, open: true, type: "error"})
        }
    }

    render() {
        let {classes} = this.props;

        let controller = null;
        if (this.state.selectedRobotId !== null) {
            controller = (<Grid item xs={12} sm={6} md={6}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={banner}
                    title="Controller"
                    width='100%'
                />

                <CardContent>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.selectedRobot.title}
                            </Typography>
                            <Typography component="p">
                                Move Growbot around by pressing the navigation buttons below the card.
                            </Typography>
                        </div>

                        <div>
                            <Button size="small" color="secondary" onClick={this.handleDialogOpenRename}>
                                Rename
                            </Button>
                            <Button size="small" color="secondary" onClick={this.handleDialogOpenRemove}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardActions style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <div style={style} id="main-wrapper">
                        <div id="arm-control-wrapper">
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "armup")}>
                                    <img src={tup} className="arrow-image arrow-vert"></img>
                                </Fab>
                            </div>
                            <div className="grid-item">
                                <img src={roboticArm} id="robotic-arm-icon"></img>
                            </div>
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "armdown")}>
                                    <img src={tdown} className="arrow-image arrow-vert"></img>
                                </Fab>
                            </div>
                        </div>
                        <div id="directional-wrapper">
                            <div className="grid-item"></div>
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "forward")}>
                                    <img src={tup} className="arrow-image arrow-vert"></img>
                                </Fab>

                            </div>
                            <div className="grid-item"></div>
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "left")}>
                                    <img src={tleft} className="arrow-image arrow-hor"></img>
                                </Fab>
                            </div>
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "brake")}>
                                    <img src={indication} className="circle-centre"></img>
                                </Fab>
                            </div>
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "right")}>
                                    <img src={tright} className="arrow-image arrow-hor"></img>
                                </Fab>
                            </div>
                            <div className="grid-item"></div>
                            <div className="grid-item">
                                <Fab size="large" color="secondary" aria-label="Add" className={classes.margin} onClick={this.onMove.bind(this, "backward")}>
                                    <img src={tdown} className="arrow-image arrow-vert"></img>
                                </Fab>

                            </div>
                            <div className="grid-item"></div>
                        </div>
                    </div>
                    <img alt="Video stream" src={endpoints.robot_video(this.state.selectedRobot.id, this.props.loginToken)} ></img>
                </CardActions>
            </Card>
        </Grid>)
        }


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
                            Please scan the robot serial and name your robot.
                        </DialogContentText>
                        <QrReader
                            delay={this.state.qrDelay}
                            onError={this.qrHandleError.bind(this)}
                            onScan={this.qrHandleScan.bind(this)}
                            style={{ width: "100%" }}
                        />
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <TextField
                                id="addRobot"
                                label="Serial key"
                                className={classes.textField}
                                value={this.state.newRobotSerialKey}
                                onChange={this.handleChange('newRobotSerialKey')}
                                margin="normal"
                            />
                            <TextField
                                id="addRobotTitke"
                                label="Title"
                                className={classes.textField}
                                required={true}
                                value={this.state.newRobotTitle}
                                onChange={this.handleChange('newRobotTitle')}
                                margin="normal"
                            />
                        </div>
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
                        <CardMedia
                            className={classes.media}
                            image={banner}
                            title="Robots"
                            width='100%'
                        />

                        <CardContent>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Robots
                                    </Typography>
                                    <Typography component="p">
                                        { this.state.robots.length === 0 ? "Please add some GrowBots to your account" : "Select the GrowBot you would like to control" }
                                    </Typography>
                                </div>
                                <Button size="small" color="primary" onClick={this.handleDialogOpenAdd}>
                                    Add Robot
                                </Button>
                            </div>
                        </CardContent>

                        <CardActions>
                            <List className={classes.root}>

                                {
                                    this.state.robots.map(robot => (
                                        <ListItem
                                            key={robot.id}
                                            alignItems="flex-start"
                                            button
                                            selected={this.state.selectedRobotId === robot.id}
                                            onClick={event => this.handleListItemClick(event, robot)}
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
                        </CardActions>
                    </Card></Grid>

                    {controller}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));