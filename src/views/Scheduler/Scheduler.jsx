import React, { Component } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import RemoveIcon from "@material-ui/icons/Remove";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

import DateTimePicker from "react-datetime-picker";
import { connect } from "react-redux";

import Dialogue from "../../components/Dialogue/Dialogue";
import LetterIcon from "../../components/Icon/LetterIcon";
import Select from "../../components/Select/Select";
import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents";

import styles from "../../assets/views/Scheduler/jss/scheduler-style";
import { RRule } from "rrule/dist/esm/src/index";
import scheduleAction from "../../http/schedule_action";

import fetchEvents from "../../http/fetch_events";
import removeEvent from "../../http/remove_event";

class Scheduler extends Component {
  state = {
    message: "",
    open: false,
    type: "",
    checkedMonday: false,
    checkedTuesday: false,
    checkedWednesday: false,
    checkedThursday: false,
    checkedFriday: false,
    checkedSaturday: false,
    checkedSunday: false,
    repetitionQuantity: "",
    repetitionUnit: "",
    repetitionEnd: "never",
    occurances: "",
    searchFilter: "",
    date: new Date(),
    action: "",
    plantId: "11967a3a-4433-11e9-b210-d663bd873d93",
    plantName: "",
    scheduleRobotDialogue: false,
    removeActionDialogue: false,
    events: [],
    selectedEvent: ""
  };
  fetchEvents = async () => {
    const { loginToken } = this.props;
    const fetchEventsResult = await fetchEvents(loginToken);

    console.log(fetchEventsResult);

    if (fetchEventsResult instanceof Error) {
      this.setState({ events: [] });
    } else {
      const { events } = fetchEventsResult;
      this.setState({ events });
    };
  }
  componentDidMount = async () => {
    this.fetchEvents();
  }
  onRemoveEvent = async () => {
    const { loginToken } = this.props;
    const { selectedEvent } = this.state;

    const response = await removeEvent(loginToken, selectedEvent.id);

    if (response.status === 200) {
      const result = await fetchEvents(loginToken);

      if (result instanceof Error) {
        this.setState({ events: [], removeActionDialogue: false });
      } else {
        this.setState({ events: result.events, removeActionDialogue: false });
      }
    } else {
      const body = await response.json();
      this.setState({ message: body.message, open: true, type: "error" });
    }
  };
  onSchedule = async () => {
    const { loginToken } = this.props;

    const rruleObj = this.getRRule();
    const recurrences = [new RRule(rruleObj).toString()];
    const actions = [this.getAction()];

    const response = await scheduleAction(loginToken, recurrences, actions);

    if (response.status === 200) {
      this.setState({
        message: "Successfully scheduled actions!",
        open: true,
        type: "success"
      });
    } else {
      const body = await response.json();
      this.setState({ message: body.message, open: true, type: "error" });
    }
  };
  getAction = () => {
    const { action, plantId } = this.state;
    if (action === "Water") {
      return {
        name: "PLANT_WATER",
        plant_id: plantId,
        data: []
      };
    }
    return {
      name: "TAKE_PICTURE",
      plant_id: plantId,
      data: []
    };
  };
  getRRule = () => {
    const {
      repetitionQuantity,
      repetitionUnit,
      repetitionEnd,
      date,
      occurances,
      checkedMonday,
      checkedTuesday,
      checkedWednesday,
      checkedThursday,
      checkedFriday,
      checkedSaturday,
      checkedSunday
    } = this.state;

    let freq = null;
    if (repetitionUnit === "Second") {
      freq = RRule.SECONDLY;
    } else if (repetitionUnit === "Minute") {
      freq = RRule.MINUTELY;
    } else if (repetitionUnit === "Hour") {
      freq = RRule.HOURLY;
    } else if (repetitionUnit === "Day") {
      freq = RRule.DAILY;
    } else if (repetitionUnit === "Week") {
      freq = RRule.WEEKLY;
    } else if (repetitionUnit === "Month") {
      freq = RRule.MONTHLY;
    } else {
      freq = RRule.YEARLY;
    }

    const interval = repetitionQuantity;
    const dtend = date;
    const count = occurances;

    const byweekdays = [];
    if (checkedMonday) {
      byweekdays.push(RRule.MO);
    }
    if (checkedTuesday) {
      byweekdays.push(RRule.TU);
    }
    if (checkedWednesday) {
      byweekdays.push(RRule.WE);
    }
    if (checkedThursday) {
      byweekdays.push(RRule.TH);
    }
    if (checkedFriday) {
      byweekdays.push(RRule.FR);
    }
    if (checkedSaturday) {
      byweekdays.push(RRule.SA);
    }
    if (checkedSunday) {
      byweekdays.push(RRule.SU);
    }

    if (repetitionEnd === "never") {
      return {
        freq: freq,
        interval: interval,
        byweekday: byweekdays,
        dtstart: new Date()
      };
    } else if (repetitionEnd === "on") {
      return {
        freq: freq,
        interval: interval,
        byweekday: byweekdays,
        dtstart: new Date(),
        until: dtend
      };
    }
    return {
      freq: freq,
      interval: interval,
      count: count,
      byweekday: byweekdays,
      dtstart: new Date(),
      until: dtend
    };
  };
  createSchedulingList = () => {
    const { events } = this.state;
    const { classes } = this.props;

    return (
      <List
        className={classes.root}
        subheader={<ListSubheader component="div">Tasks</ListSubheader>}
      >
        {
          events.map((event, idx) => (
            <ListItem key={idx} alignItems="flex-start">
              <ListItemText
                className={classes.listItem}
                primary={<span>{event.summary}</span>}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Remove" onClick={()=>this.setState({removeActionDialogue: true, selectedEvent: events[idx]})}>
                  <RemoveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    );
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleOpenDialogue = dialogue => {
    this.setState({ [dialogue]: true });
  };
  handleCloseDialogue = dialogue => {
    this.setState({ [dialogue]: false });
  };
  createScheduleRobotDialogueActions = () => {
    return (
      <React.Fragment>
        <Button
          onClick={() => this.handleCloseDialogue("scheduleRobotDialogue")}
        >
          Close
        </Button>
        <Button onClick={this.onSchedule}>Schedule</Button>
      </React.Fragment>
    );
  };
  createTextField = (id, label, value, valueName) =>
    this.createTextFieldWithType(id, label, "string", value, valueName);
  createTextFieldWithType = (id, label, type, value, valueName) => {
    const { classes } = this.props;
    return (
      <TextField
        id={id}
        label={label}
        type={type}
        className={
          type === "number" ? classes.numberTextField : classes.textField
        }
        value={value}
        onChange={this.handleChange(valueName)}
        margin="normal"
      />
    );
  };
  createLetterCheckbox = (letter, state, value) => {
    return (
      <Checkbox
        icon={<LetterIcon letter={letter} color="#000000" />}
        checkedIcon={<LetterIcon letter={letter} color="#006600" />}
        checked={state}
        onChange={this.handleChecked(value)}
        value={value}
      />
    );
  };
  createScheduleRobotDialogueContent = () => {
    const { classes, reduxPlants } = this.props;

    const plantNames = reduxPlants.map(plant => <MenuItem value={plant.name}>{plant.name}</MenuItem>);

    const {
      checkedMonday,
      checkedTuesday,
      checkedWednesday,
      checkedThursday,
      checkedFriday,
      checkedSaturday,
      checkedSunday,
      repetitionQuantity,
      repetitionUnit,
      action,
      occurances,
      repetitionEnd,
      plantName
    } = this.state;
    const repetitionQuantityItems = [1, 2, 3, 4, 5, 6, 7].map(quantity => (
      <MenuItem value={quantity}>{quantity}</MenuItem>
    ));
    const repetitionUnitItems = [
      "Second",
      "Minute",
      "Hour",
      "Day",
      "Week",
      "Month",
      "Year"
    ].map(unit => <MenuItem value={unit}>{unit}</MenuItem>);
    const checkboxes = [
      { letter: "M", state: checkedMonday, value: "checkedMonday" },
      {
        letter: "T",
        state: checkedTuesday,
        value: "checkedTuesday"
      },
      { letter: "W", state: checkedWednesday, value: "checkedWednesday" },
      {
        letter: "T",
        state: checkedThursday,
        value: "checkedThursday"
      },
      { letter: "F", state: checkedFriday, value: "checkedFriday" },
      {
        letter: "S",
        state: checkedSaturday,
        value: "checkedSaturday"
      },
      { letter: "S", state: checkedSunday, value: "checkedSunday" }
    ].map(day => (
      <Grid item>
        {this.createLetterCheckbox(day.letter, day.state, day.value)}
      </Grid>
    ));
    const actions = ["Water", "Take Picture", "Water & Take Picture"].map(
      action => <MenuItem value={action}>{action}</MenuItem>
    );
    const occurancesField = this.createTextFieldWithType(
      "Occurances",
      "Occurances",
      "number",
      occurances,
      "occurances"
    );
    return (
      <React.Fragment>
        <Grid container>
          <Grid item>
            <InputLabel>Plant</InputLabel>
          </Grid>
          <Grid item>
            <Select
              value={plantName}
              onChange={event => this.setState({ plantName: event.target.value })}
              name="plantName"
              id="plantName"
              items={plantNames}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <InputLabel>Action</InputLabel>
          </Grid>
          <Grid item>
            <Select
              value={action}
              onChange={event => this.setState({ action: event.target.value })}
              name="action"
              id="action"
              items={actions}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <InputLabel>Repeat every</InputLabel>
          </Grid>
          <Grid item>
            <Select
              value={repetitionQuantity}
              onChange={event =>
                this.setState({ repetitionQuantity: event.target.value })
              }
              name="repetition_quantity"
              id="repetition_quantity"
              items={repetitionQuantityItems}
            />
          </Grid>
          <Grid item>
            <Select
              value={repetitionUnit}
              onChange={event =>
                this.setState({ repetitionUnit: event.target.value })
              }
              name="repetition_unit"
              id="repetition_unit"
              items={repetitionUnitItems}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <InputLabel>Repeat on</InputLabel>
          </Grid>
          {checkboxes}
        </Grid>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Ends</FormLabel>
          <RadioGroup
            aria-label="Ends"
            name="ends"
            className={classes.group}
            value={this.state.repetitionEnd}
            onChange={x => this.setState({ repetitionEnd: x.target.value })}
          >
            <FormControlLabel value="never" control={<Radio />} label="Never" />
            <FormControlLabel value="on" control={<Radio />} label="On" />
            <FormControlLabel value="after" control={<Radio />} label="After" />
          </RadioGroup>
          {repetitionEnd === "on" && (
            <DateTimePicker
              onChange={date => this.setState({ date })}
              value={this.state.date}
            />
          )}
          {repetitionEnd === "after" && occurancesField}
        </FormControl>
      </React.Fragment>
    );
  };
  createRemoveActionDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("removeActionDialogue")}>
          Close
        </Button>
        <Button onClick={this.onRemoveEvent}>Remove</Button>
      </React.Fragment>
    );
  };
  createRemoveActionDialogueContent = () => {
    return <React.Fragment />;
  };
  render() {
    const { classes } = this.props;
    const {
      scheduleRobotDialogue,
      removeActionDialogue,
      open,
      type,
      message,
      searchFilter
    } = this.state;
    const robotSearchCriteria = this.createTextField(
      "search-criteria",
      "Filter",
      searchFilter,
      "searchFilter"
    );
    const schedulingList = this.createSchedulingList();
    return (
      <main className={classes.main}>
        <Dialogue
          open={removeActionDialogue}
          close={() => this.handleCloseDialogue("removeActionDialogue")}
          title="Remove Action"
          contentText="Please confirm you would like to remove this action."
          content={this.createRemoveActionDialogueContent()}
          actions={this.createRemoveActionDialogueActions()}
        />
        <Dialogue
          open={scheduleRobotDialogue}
          close={() => this.handleCloseDialogue("scheduleRobotDialogue")}
          title="Schedule Action"
          contentText="Please fill in the form to schedule an action."
          content={this.createScheduleRobotDialogueContent()}
          actions={this.createScheduleRobotDialogueActions()}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant={type}
            message={message}
          />
        </Snackbar>
        <br />
        <Card className={classes.card}>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography gutterBottom variant="h5" component="h2">
                  Scheduler
                </Typography>
                <Typography component="p">Assign tasks to Growbot.</Typography>
                {robotSearchCriteria}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  aria-label="Add"
                  onClick={() => {
                    this.handleOpenDialogue("scheduleRobotDialogue");
                  }}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>

            {schedulingList}
          </CardContent>
        </Card>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { loginToken } = state.auth;
  const { selectedRobot } = state.robotState;
  const { plants } = state.plantState;
  return {
    loginToken,
    selectedRobot,
    reduxPlants: plants
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scheduler));
