import React, { useState } from "react";
import { connect } from "react-redux";

import DateTimePicker from "react-datetime-picker";

import actions from "./scheduler_actions";
import {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY
} from "./scheduler_days";
import { AFTER, ON, NEVER } from "./scheduler_ends";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";
import units from "./scheduler_time_units";

const Scheduler = props => {
  const { reduxPlants } = props;
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
  })

  const createRepeatOnCheckbox = day => {
    return (
      <React.Fragment>
        <label style={{ marginRight: "5px" }}>{day}</label>
        <input
          style={{ marginRight: "10px" }}
          type="checkbox"
          checked={daySelected[day]}
          onClick={() => setDaySelected({day: !day})}
        />
      </React.Fragment>
    );
  };

  const createScheduleEventModalContent = () => {
    const reduxPlantNames = reduxPlants.map(plant => plant.name);
    const actionNames = actions.map(action => action.name);
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
              onChange={() => console.log("lol")}
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
            <DateTimePicker onChange={setDate} value={date} />
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
        <button onClick={() => {}} className="btn btn-danger">
          Schedule
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className="content">
      <button onClick={() => scheduleEventModalVisible(true)}>Schedule</button>
      <Modal
        open={scheduleEventModalOpen}
        close={() => scheduleEventModalVisible(false)}
        title="Schedule Event"
        content={createScheduleEventModalContent()}
        actions={createScheduleEventModalActions()}
      />
    </div>
  );
};

const mapStateToProps = props => {
  const { plants } = props.plantState;
  const { loginToken } = props.auth;
  return {
    loginToken,
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
