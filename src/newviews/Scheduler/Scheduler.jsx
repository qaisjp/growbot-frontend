import React, { useState } from "react";
import { connect } from "react-redux";

import DateTimePicker from "react-datetime-picker";

import actions from "./scheduler_actions";
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

  const createScheduleEventModalContent = () => {
    const reduxPlantNames = reduxPlants.map(plant => plant.name);
    const actionNames = actions.map(action => action.name);
    const unitNames = units.map(unit => unit.name);
    const timeUnits = [...Array(repeatEveryUnit.units + 1).keys()];
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <label>Plant</label>
            <Dropdown
              name="Plants"
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
              items={actionNames}
              click={actionName => {
                const idx = actionNames.indexOf(actionName);
                selectAction(actions[idx]);
              }}
            />
            <div style={{ marginTop: "10px" }} />
            <label>Repeat every</label>
            <Dropdown
              name="Number"
              items={timeUnits}
              click={() => console.log("lol")}
            />
            <Dropdown
              name="Time"
              items={unitNames}
              click={unitName => {
                const idx = unitNames.indexOf(unitName);
                setRepeatEveryUnit(units[idx]);
              }}
            />
          </div>
          <div className="col-md-6">
            <label>Ends</label>
            <div style={{ marginTop: "10px" }} />
            <div className="input-group">
              <label style={{ marginRight: "10px" }}>Never</label>
              <input
                type="radio"
                checked={ends === NEVER}
                onClick={() => setEnds(NEVER)}
              />
            </div>
            <div style={{ marginTop: "10px" }} />

            <div className="input-group">
              <label style={{ marginRight: "10px" }}>On</label>
              <span className="input-group-addon">
                <input
                  type="radio"
                  checked={ends === ON}
                  onClick={() => setEnds(ON)}
                />
              </span>
              <DateTimePicker onChange={setDate} value={date} />
            </div>
            <div style={{ marginTop: "10px" }} />
            <div className="input-group">
              <label style={{ marginRight: "10px" }}>After</label>
              <span className="input-group-addon">
                <input
                  type="radio"
                  checked={ends === AFTER}
                  onClick={() => setEnds(AFTER)}
                />
              </span>
              <input
                type="text"
                className="form-control"
                onChange={event => setAfterOccurances(event.target.value)}
              />
            </div>
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

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduler);
