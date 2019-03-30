import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import DateTimePicker from "react-datetime-picker";
import Datetime from "react-datetime";
import { RRule } from "rrule/dist/esm/src/index";

import actions from "./scheduler_actions";
import {
  FRIDAY,
  MONDAY,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY
} from "./scheduler_days";
import { AFTER, NEVER, ON } from "./scheduler_ends";
import Card from "../../components/Card/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";
import httpFetchEvents from "../../http/fetch_events";
import httpScheduleAction from "../../http/schedule_action";
import getRRule from "./scheduler_get_rrule";
import units from "./scheduler_time_units";

const Scheduler = props => {
  const { loginToken, reduxPlants } = props;
  const [summary, setSummary] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsToAdd, setEventsToAdd] = useState([]);
  const [schedulerModalOpen, schedulerModalVisible] = useState(false);
  const [scheduleEventModalOpen, scheduleEventModalVisible] = useState(false);
  const [plant, selectPlant] = useState("");
  const [action, selectAction] = useState("");
  const [repeatEveryNumber, setRepeatEveryNumber] = useState(1);
  const [repeatEveryUnit, setRepeatEveryUnit] = useState(units[0]);
  const [ends, setEnds] = useState(NEVER);
  const [afterOccurances, setAfterOccurances] = useState("");
  const [date, setDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState({
    MONDAY: false,
    TUESDAY: false,
    WEDNESDAY: false,
    THURSDAY: false,
    FRIDAY: false,
    SATURDAY: false,
    SUNDAY: false
  });

  const fetchEvents = async () => {
    const fetchEventResult = await httpFetchEvents(loginToken);
    if (!(fetchEventResult instanceof Error)) {
      const { events } = fetchEventResult;
      setEvents(events);
    }
  };

  const onSchedule = async () => {
    const { selectedRobot } = props;
    const rruleObj = getRRule(
      repeatEveryNumber,
      repeatEveryUnit,
      date,
      afterOccurances,
      daySelected[MONDAY],
      daySelected[TUESDAY],
      daySelected[WEDNESDAY],
      daySelected[THURSDAY],
      daySelected[FRIDAY],
      daySelected[SATURDAY],
      daySelected[SUNDAY]
    );

    const recurrences = [new RRule(rruleObj).toString()];
    const actions = eventsToAdd.map(event => ({
      name: event.action.typeStr,
      data: {},
      robot_id: selectedRobot.id,
      plant_id: plant.id
    }));
    const response = await httpScheduleAction(
      loginToken,
      summary,
      recurrences,
      actions
    );

    if (response.ok) {
      fetchEvents();
    }

    schedulerModalVisible(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createRepeatOnCheckbox = day => {
    return (
      <React.Fragment>
        <label style={{ marginRight: "5px" }}>{day}</label>
        <input
          style={{ marginRight: "10px" }}
          type="checkbox"
          checked={daySelected[day]}
          onClick={() => setDaySelected({ day: !day })}
        />
      </React.Fragment>
    );
  };

  const createSchedulerModalContent = () => {
    const reduxPlantNames = reduxPlants.map(plant => plant.name);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <label>Plant</label>
            <Dropdown
              name="Plants"
              style={{ display: "inline", marginLeft: "10px" }}
              items={reduxPlantNames}
              click={plantName => {
                const idx = reduxPlantNames.indexOf(plantName);
                selectPlant(reduxPlants[idx]);
              }}
            />
            <div style={{ marginTop: "10px" }} />
            <label>Summary</label>
            <input
              onChange={event => setSummary(event.target.value)}
              style={{ marginRight: "10px" }}
              type="text"
            />
            <div style={{ marginTop: "10px" }} />
            <label style={{ display: eventsToAdd.length ? "block" : "none" }}>
              Actions
            </label>
            <div style={{ marginTop: "10px" }} />
            <ul className="list-group">
              {eventsToAdd.map((event, idx) => (
                <li className="list-group-item">
                  {idx + 1 + ". " + event.action.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <label style={{ display: "block" }}>Repeat on</label>
            <div style={{ marginTop: "10px" }} />
            {createRepeatOnCheckbox(MONDAY)}
            {createRepeatOnCheckbox(TUESDAY)}
            {createRepeatOnCheckbox(WEDNESDAY)}
            {createRepeatOnCheckbox(THURSDAY)}
            {createRepeatOnCheckbox(FRIDAY)}
            {createRepeatOnCheckbox(SATURDAY)}
            {createRepeatOnCheckbox(SUNDAY)}
            <div style={{ marginTop: "10px" }} />
            <label style={{ display: "block" }}>Ends</label>
            <div style={{ marginTop: "10px" }} />
            <label style={{ marginRight: "10px" }}>Never</label>
            <input
              type="radio"
              checked={ends === NEVER}
              onClick={() => setEnds(NEVER)}
            />
            <div style={{ marginTop: "10px" }} />

            <label style={{ marginRight: "10px" }}>On</label>
            <input
              type="radio"
              style={{ marginRight: "10px" }}
              checked={ends === ON}
              onClick={() => setEnds(ON)}
            />
            <Datetime onChange={setDate} value={date} />
            <div style={{ marginTop: "10px" }} />
            <label style={{ marginRight: "10px" }}>After</label>
            <input
              type="radio"
              style={{ marginRight: "10px" }}
              checked={ends === AFTER}
              onClick={() => setEnds(AFTER)}
            />
            <input
              style={{ width: "30%", height: "29px", display: "inline-block" }}
              type="number"
              className="form-control"
              onChange={event => setAfterOccurances(event.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const createSchedulerModalActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            schedulerModalVisible(false);
          }}
          className="btn btn-danger"
        >
          Close
        </button>
        <button
          onClick={() => scheduleEventModalVisible(true)}
          className="btn btn-danger"
        >
          Add New Action
        </button>
        <button onClick={onSchedule} className="btn btn-danger">
          Schedule
        </button>
      </React.Fragment>
    );
  };

  const createScheduleEventModalContent = () => {
    const actionNames = actions.map(action => action.name);
    return (
      <React.Fragment>
        <label>Action</label>
        <Dropdown
          name="Actions"
          style={{ display: "inline", marginLeft: "10px" }}
          items={actionNames}
          click={actionName => {
            const idx = actionNames.indexOf(actionName);
            selectAction(actions[idx]);
          }}
        />
        <div style={{ marginTop: "10px" }} />
        <label>Repeat</label>
        <input
          style={{
            marginLeft: "10px",
            width: "30%",
            height: "29px",
            display: "inline-block"
          }}
          type="number"
          className="form-control"
          onChange={event => setRepeatEveryNumber(event.target.value)}
        />
        <Dropdown
          name="Time"
          style={{ display: "inline", marginLeft: "10px" }}
          items={units}
          click={unit => {
            const idx = units.indexOf(unit);
            setRepeatEveryUnit(units[idx]);
          }}
        />
      </React.Fragment>
    );
  };

  const createScheduleEventModalActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            scheduleEventModalVisible(false);
          }}
          className="btn btn-danger"
        >
          Close
        </button>
        <button
          onClick={() => {
            const eventsToAddRef = eventsToAdd;
            eventsToAddRef.push({
              action,
              repeatEveryNumber,
              repeatEveryUnit
            });
            setEventsToAdd(eventsToAddRef);
            scheduleEventModalVisible(false);
          }}
          className="btn btn-danger"
        >
          Add
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className="content">
      <Modal
        open={schedulerModalOpen}
        close={() => schedulerModalVisible(false)}
        title="Scheduler"
        content={createSchedulerModalContent()}
        footer={createSchedulerModalActions()}
      />
      <Modal
        open={scheduleEventModalOpen}
        close={() => scheduleEventModalVisible(false)}
        title="Schedule Event"
        content={createScheduleEventModalContent()}
        footer={createScheduleEventModalActions()}
      />
      <Card
        title={
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Your Scheduled Actions</span>
            <button
              onClick={() => schedulerModalVisible(true)}
              className="btn btn-sm btn-danger"
            >
              Schedule New Action
            </button>
          </span>
        }
        content={
          <ul className="list-group">
            {events
              .filter(event => event !== undefined)
              .map((event, idx) => (
                <li key={idx} className="list-group-item">
                  {event.summary}
                </li>
              ))}
          </ul>
        }
      />
    </div>
  );
};

const mapStateToProps = props => {
  const { plants } = props.plantState;
  const { selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    loginToken,
    selectedRobot,
    reduxPlants: plants
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduler);
