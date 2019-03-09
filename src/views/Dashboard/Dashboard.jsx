import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core';

import DateTimePicker from 'react-datetime-picker';

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"

import endpoints from '../../endpoints';
import styles from '../../assets/views/Dashboard/jss/dashboard-style';
import banner from '../../assets/views/Dashboard/img/banner.jpg'
import online from '../../assets/views/Dashboard/img/green_circle.png'
import offline from '../../assets/views/Dashboard/img/red_circle.png'

import Gamepad from '../../components/Gamepad/Gamepad'
import LetterIcon from '../../components/LetterIcon/LetterIcon'

import {connect} from "react-redux";

import QrReader from "react-qr-reader";

import fetchRobots from '../../http/fetch_robots';
import moveRobot from '../../http/move_robot';
import addRobot from '../../http/add_robot'
import removeRobot from '../../http/remove_robot'

class Dashboard extends Component {

    state = {
        checkedMonday: false,
        checkedTuesday: false,
        checkedWednesday: false,
        checkedThursday: false,
        checkedFriday: false,
        checkedSaturday: false,
        checkedSunday: false,
        repetitionQuantity: null,
        repetitionUnit: null,
        repetitionEnd: 'never',
        action: "",
        checkedDetection: false,
        message: "",
        type: "",
        open: false,
        dialogOpen: false,
        selectedRobotId: null,
        selectedRobot: null,
        robots: [],
        dialogType: "",
        searchFilter: null,
        newRobotSerialKey: "",
        newRobotTitle: "",
        date: new Date(),
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

    onMove = async (direction) => {
        const {loginToken} = this.props;
        const {selectedRobotId} = this.state;
        const response = await moveRobot(loginToken, direction, selectedRobotId);

        if (response.status === 200) {
            this.setState({message: "Successfully moved robot", open: true, type: "success"})
        } else {
            const body = await response.json();
            this.setState({message: body.message, open: true, type: "error"})
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleListItemClick = (event, robot) => {
        this.setState({selectedRobotId: robot.id, selectedRobot: robot});
    };

    componentDidMount = async () => {
        const {loginToken} = this.props;
        const result = await fetchRobots(loginToken);

        if (result instanceof Error) {
            this.setState({robots: []})
        } else {
            const {robots} = result;
            this.setState({robots})
            if (robots.length > 0) {
                this.handleListItemClick(null, result.robots[0]);
            }
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

    handleCheck = name => event => {
        this.setState({[name]: event.target.checked});
    };

    onAddRobot = async () => {
        const {loginToken} = this.props;
        const {newRobotSerialKey, newRobotTitle} = this.state;
        const response = await addRobot(loginToken, newRobotSerialKey, newRobotTitle);

        if (response.status === 200) {
            const result = await fetchRobots(loginToken);

            if (result instanceof Error) {
                this.setState({robots: []})
            } else {
                this.handleDialogClose()
                this.setState({robots: result.robots})

                const found = result.robots.filter(r => r.id === newRobotSerialKey)
                if (found.length === 1) {
                    this.handleListItemClick(null, found[0]);
                }
            }
        } else {
            const body = await response.json();
            this.setState({message: body.message, open: true, type: "error"})
        }
    }

    onRemoveRobot = async () => {
        const {loginToken} = this.props;
        const {selectedRobotId} = this.state;

        const response = await removeRobot(loginToken, selectedRobotId);

        if (response.status === 200) {

            let result = await fetchRobots(loginToken);

            if (result instanceof Error) {
                this.setState({robots: [], dialogOpen: false})
            } else {
                this.setState({robots: result.robots, dialogOpen: false})
            }
        } else {
            const body = await response.json();
            this.setState({message: body.message, open: true, type: "error"})
        }
    }

    handleDialogOpenRename = async () => {
        const newTitle = prompt("Rename this robot", this.state.selectedRobot.title);
        if (newTitle === null || newTitle === "" || newTitle === this.state.selectedRobot.title) {
            this.setState({message: "Robot not renamed", open: true, type: "info"})
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

        if (response.status === 200) {
            let result = await fetchRobots(this.props.loginToken);

            if (result instanceof Error) {
                this.setState({robots: []})
            } else {
                const thisID = this.state.selectedRobot.id;
                this.setState({
                    robots: result.robots,
                    message: (await response.json()).message,
                    open: true,
                    type: "success"
                })
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
        console.log("CHECKED-MON" + this.state.checkedMonday);
        if (this.state.selectedRobotId !== null) {
            controller = [<Grid item xs={12} md={4}>
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

                            <div style={{display: "flex", flexDirection: "column"}}>
                                <Button size="medium" color="secondary" onClick={this.handleDialogOpenRename}>
                                    Rename
                                </Button>
                                <Button size="medium" color="secondary" onClick={this.handleDialogOpenRemove}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Gamepad forward={this.onMove.bind(this, "forward")} backward={this.onMove.bind(this, "backward")} armdown={this.onMove.bind(this, "armdown")} armup={this.onMove.bind(this, "armup")} left={this.onMove.bind(this, "left")} right={this.onMove.bind(this, "right")} brake={this.onMove.bind(this, "brake")} />
                    </CardActions>
                </Card>
            </Grid>,
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={banner}
                            title="Video"
                            width='100%'
                        />

                        <CardContent>
                            <div>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Video
                                </Typography>
                                <Typography component="p">
                                    Live stream from {this.state.selectedRobot.title}
                                </Typography>
                            </div>

                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img alt="Video stream"
                                     src={endpoints.robot_video(this.state.selectedRobot.id, this.props.loginToken)}></img>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>,
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={banner}
                            title="Scheduler"
                            width='100%'
                        />

                        <CardContent>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Scheduler
                                    </Typography>
                                    <Typography component="p">
                                        Assign tasks to Growbot.
                                    </Typography>
                                    <TextField
                                        id="search-criteria"
                                        label="Filter"
                                        className={classes.textField}
                                        value={this.state.searchFilter}
                                        onChange={this.handleChange('searchFilter')}
                                        margin="normal"
                                    />
                                </div>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <IconButton aria-label="Add" onClick={_ => {
                                        this.setState({dialogOpen: true, dialogType: "schedule_add"})
                                    }}>
                                        <AddIcon/>
                                    </IconButton>
                                </div>
                            </div>
                            <List
                                className={classes.root}
                                subheader={<ListSubheader component="div">Tasks</ListSubheader>}
                            >
                                <ListItem key="1">
                                    <ListItemText primary="Water Plant A every 3 hours"/>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Edit">
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Remove">
                                            <RemoveIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem key="2">
                                    <ListItemText primary="Water Plant B every 6 hours"/>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Edit">
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Remove">
                                            <RemoveIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem key="1">
                                    <ListItemText primary="Take Picture of Plant A every 3 hours"/>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Edit">
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Remove">
                                            <RemoveIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            ]
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
                        this.state.dialogType === "add" ? "Add Robot" : this.state.dialogType === "schedule_add" ? "Schedule Task" :
                            "Remove Robot"
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
                            style={{width: "100%"}}
                        />
                        <div style={{display: "flex", flexDirection: "column"}}>
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
                    </DialogContent> : this.state.dialogType === "schedule_add" ? <DialogContent>

                            <Grid container>
                                <Grid item>
                                    <InputLabel>Repeat every</InputLabel>
                                </Grid>
                                <Grid item>
                                    <Select
                                        value={this.state.repetitionQuantity}
                                        onChange={event => this.setState({repetitionQuantity: event.target.value})}
                                        inputProps={{
                                            name: 'repetition_quantity',
                                            id: 'repetition_quantity',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            [1, 2, 3, 4, 5, 6, 7].map(quantity => (
                                                <MenuItem value={quantity}>{quantity}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Select
                                        value={this.state.repetitionUnit}
                                        onChange={event => this.setState({repetitionUnit: event.target.value})}
                                        inputProps={{
                                            name: 'repetition_unit',
                                            id: 'repetition_unit',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            ["Week"].map(unit => (
                                                <MenuItem value={unit}>{unit}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <InputLabel>Repeat on</InputLabel>
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="M" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="M" color="#006600"/>}
                                        checked={this.state.checkedMonday}
                                        onChange={this.handleCheck('checkedMonday')}
                                        value="checkedMonday"
                                    />
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="T" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="T" color="#006600"/>}
                                        checked={this.state.checkedTuesday}
                                        onChange={this.handleCheck('checkedTuesday')}
                                        value="checkedTuesday"
                                    />
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="W" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="W" color="#006600"/>}
                                        checked={this.state.checkedWednesday}
                                        onChange={this.handleCheck('checkedWednesday')}
                                        value="checkedWednesday"
                                    />
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="T" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="T" color="#006600"/>}
                                        checked={this.state.checkedThursday}
                                        onChange={this.handleCheck('checkedThursday')}
                                        value="checkedThursday"
                                    />
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="F" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="F" color="#006600"/>}
                                        checked={this.state.checkedFriday}
                                        onChange={this.handleCheck('checkedFriday')}
                                        value="checkedFriday"
                                    />
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="S" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="S" color="#006600"/>}
                                        checked={this.state.checkedSaturday}
                                        onChange={this.handleCheck('checkedSaturday')}
                                        value="checkedSaturday"
                                    />
                                </Grid>
                                <Grid item>
                                    <Checkbox
                                        icon={<LetterIcon letter="S" color="#000000"/>}
                                        checkedIcon={<LetterIcon letter="S" color="#006600"/>}
                                        checked={this.state.checkedSunday}
                                        onChange={this.handleCheck('checkedSunday')}
                                        value="checkedSunday"
                                    />
                                </Grid>
                            </Grid>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Ends</FormLabel>
                                <RadioGroup
                                    aria-label="Ends"
                                    name="ends"
                                    className={classes.group}
                                    value={this.state.repetitionEnd}
                                    onChange={x => this.setState({repetitionEnd: x.target.value})}
                                >
                                    <FormControlLabel value="never" control={<Radio/>} label="Never"/>
                                    <FormControlLabel value="on" control={<Radio/>} label="On"/>
                                    <DateTimePicker
                                        onChange={date => this.setState({date})}
                                        value={this.state.date}
                                    />
                                    <FormControlLabel value="after" control={<Radio/>} label="After"/>

                                    <Select
                                        value={this.state.repetitionUnit}
                                        onChange={event => this.setState({repetitionUnit: event.target.value})}
                                        inputProps={{
                                            name: 'repetition_unit',
                                            id: 'repetition_unit',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            ["Week"].map(unit => (
                                                <MenuItem value={unit}>{unit}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </RadioGroup>
                            </FormControl>
                            <Grid container>
                                <Grid item>
                                    <InputLabel htmlFor="action">Action</InputLabel>
                                </Grid>
                                <Grid item>
                                    <Select
                                        value={this.state.action}
                                        onChange={event => this.setState({action: event.target.value})}
                                        inputProps={{
                                            name: 'action',
                                            id: 'action',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="water">Water</MenuItem>
                                        <MenuItem value="picture">Picture</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>


                        </DialogContent> :


                        <DialogContent><DialogContentText>Are you sure you want to delete the robot
                            ?</DialogContentText></DialogContent>
                }

                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    {
                        this.state.dialogType === "add" ? <Button onClick={this.onAddRobot} color="primary">
                            Add
                        </Button> : this.state.dialogType === "schedule_add" ?
                            <Button color="primary">Schedule</Button> :
                            <Button onClick={this.onRemoveRobot} color="primary">
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
            <Grid container spacing={24}>
                <Grid item xs={12} md={4}>
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
                                        {this.state.robots.length === 0 ? "Please add some GrowBots to your account" : "Select the GrowBot you would like to control"}
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