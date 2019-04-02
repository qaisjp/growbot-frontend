import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import Modal from "../../components/Modal/Modal";

import Datetime from "react-datetime";
import {RRule} from "rrule/dist/esm/src/index";

import actions from "./scheduler_actions";
import {FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY} from "./scheduler_days";
import {AFTER, NEVER, ON} from "./scheduler_ends";
import Dropdown from "../../components/Dropdown/Dropdown";
import httpScheduleAction from "../../http/schedule_action";
import getRRule from "./scheduler_get_rrule";
import units from "./scheduler_time_units";

const Content = ({loginToken, plants, robots, onClose, onSubmit, ...props}) => {
    const actionNames = actions.map(action => action.name);
    const plantNames = plants.map(plant => plant.name);
    const reduxRobotNames = robots.map(robot => robot.title);

    const [startDate, setStartDate] = useState(new Date());
    const [summary, setSummary] = useState("");
    const [eventActions, setEventActions] = useState([]);
    const [robot, selectRobot] = useState("");
    const [plant, selectPlant] = useState("");
    const [, selectAction] = useState("");
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

    const createRepeatOnCheckbox = day => {
        return (
            <React.Fragment>
                <label style={{marginRight: "5px"}}>{day}</label>
                <input
                    style={{marginRight: "10px"}}
                    type="checkbox"
                    checked={daySelected[day]}
                    onClick={() => {
                        const daysSelectedRef = daySelected;
                        daysSelectedRef[day] = !daysSelectedRef[day];
                        setDaySelected(daysSelectedRef)
                    }}
                />
            </React.Fragment>
        );
    };

    const onSchedule = async () => {
        const rruleObj = getRRule(
            startDate._d,
            repeatEveryNumber,
            repeatEveryUnit,
            date._d,
            afterOccurances,
            daySelected[MONDAY],
            daySelected[TUESDAY],
            daySelected[WEDNESDAY],
            daySelected[THURSDAY],
            daySelected[FRIDAY],
            daySelected[SATURDAY],
            daySelected[SUNDAY]
        );

        console.log(rruleObj);

        const recurrences = [new RRule(rruleObj).toString()];
        const actions = eventActions.map(action => ({
            name: action.type,
            data: {},
            robot_id: action.robot_id,
            plant_id: action.plant_id
        }));
        const response = await httpScheduleAction(
            loginToken,
            summary,
            recurrences,
            actions
        );

        console.log({summary, recurrences, actions});

        onSubmit();
    }


    return (<>
        <div className="modal-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label>Summary</label>
                        <input
                            onChange={event => setSummary(event.target.value)}
                            style={{marginLeft: "10px"}}
                            type="text"
                        />
                        <div style={{marginTop: "10px"}}/>
                        <label style={{marginRight: "10px"}}>Start date</label>
                        <Datetime onChange={setStartDate} value={startDate}/>
                        <div style={{marginTop: "10px"}}/>
                        <div style={{display: "inline"}}>
                        <label>Robots</label>
                        <Dropdown
                            name="Robots"
                            style={{display: "inline", marginLeft: "10px"}}
                            items={reduxRobotNames}
                            click={robotName => {
                                const idx = reduxRobotNames.indexOf(robotName);
                                selectRobot(robots[idx]);
                            }}
                        />
                        <div style={{marginTop: "10px"}}/>

                        <label>Plant</label>
                        <Dropdown
                            name="Plants"
                            style={{display: "inline", marginLeft: "10px"}}
                            items={plantNames}
                            click={plantName => {
                                const idx = plantNames.indexOf(plantName);
                                selectPlant(plants[idx]);
                            }}
                        />
                        <div style={{marginTop: "10px"}}/>
                        <label>
                            Action
                        </label>
                        <Dropdown
                            name="Actions"
                            style={{
                                display: "inline", marginLeft: "10px"
                            }}
                            items={actionNames}
                            click={actionName => {
                                if(plant && robot) {
                                    const idx = actionNames.indexOf(actionName);
                                    eventActions.push({
                                        name: actions[idx].name, type: actions[idx].type, robot_id: robot.id, plant_id: plant.id
                                    });
                                    selectAction(actions[idx]);
                                }
                            }}
                        />
                        </div>
                        <div style={{marginTop: "10px"}}/>
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
                            style={{display: "inline", marginLeft: "10px"}}
                            items={units}
                            click={unit => {
                                const idx = units.indexOf(unit);
                                setRepeatEveryUnit(units[idx]);
                            }}
                        />
                        <div style={{marginTop: "10px"}}/>
                        <label style={{display: eventActions.length ? "block" : "none"}}>
                            Actions
                        </label>
                        <div style={{marginTop: "10px"}}/>
                        <ul
                            style={{display: eventActions.length ? "inline" : "none"}}
                            className="list-group"
                        >
                            {eventActions.map((action, idx) => (

                                <li className="list-group-item">
                                    {idx + 1 + ". " + action.name}

                                    <button
                                        onClick={() => {
                                            const updatedEventActions = eventActions.filter((action, selectedIdx) => selectedIdx !== idx);
                                            setEventActions(updatedEventActions);
                                        }}
                                        style={{marginLeft:"10px"}}
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                    >
                                        <i className="glyphicon glyphicon-trash" />
                                    </button>
                                </li>


                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <label style={{display: "block"}}>Repeat on</label>
                        <div style={{marginTop: "10px"}}/>
                        {createRepeatOnCheckbox(MONDAY)}
                        {createRepeatOnCheckbox(TUESDAY)}
                        {createRepeatOnCheckbox(WEDNESDAY)}
                        {createRepeatOnCheckbox(THURSDAY)}
                        {createRepeatOnCheckbox(FRIDAY)}
                        {createRepeatOnCheckbox(SATURDAY)}
                        {createRepeatOnCheckbox(SUNDAY)}
                        <div style={{marginTop: "10px"}}/>
                        <label style={{display: "block"}}>Ends</label>
                        <div style={{marginTop: "10px"}}/>
                        <label style={{marginRight: "10px"}}>Never</label>
                        <input
                            type="radio"
                            checked={ends === NEVER}
                            onClick={() => setEnds(NEVER)}
                        />
                        <div style={{marginTop: "10px"}}/>

                        <label style={{marginRight: "10px"}}>On</label>
                        <input
                            type="radio"
                            style={{marginRight: "10px"}}
                            checked={ends === ON}
                            onClick={() => setEnds(ON)}
                        />
                        <Datetime onChange={setDate} value={date}/>
                        <div style={{marginTop: "10px"}}/>
                        <label style={{marginRight: "10px"}}>After</label>
                        <input
                            type="radio"
                            style={{marginRight: "10px"}}
                            checked={ends === AFTER}
                            onClick={() => setEnds(AFTER)}
                        />
                        <input
                            style={{width: "30%", height: "29px", display: "inline-block"}}
                            type="number"
                            className="form-control"
                            onChange={event => setAfterOccurances(event.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="modal-footer">
            <button onClick={onClose} className="btn btn-secondary">
                Close
            </button>
            <button onClick={onSchedule()} className="btn btn-primary">
                Schedule
            </button>
        </div>

    </>);
}

const NewEvent = ({visible, onClose, onSubmit, ...props}) => {
    return (
        <Modal
                open={visible}
                close={onClose}
                title="Scheduler"
                full={true}
                content={<Content onClose={onClose} onSubmit={onSubmit} {...props} />}
                footer={null}
            />
    )
}


const mapStateToProps = props => {
    const {plants} = props.plantState;
    const {robots} = props.robotState;
    const {loginToken} = props.auth;
    return {
        loginToken, robots, plants
    };
};

export default connect(mapStateToProps)(NewEvent);
