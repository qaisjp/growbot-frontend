import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Datetime from "react-datetime";
import {RRule} from "rrule/dist/esm/src/index";

import actions from "./scheduler_actions";
import {FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY} from "./scheduler_days";
import {AFTER, NEVER, ON} from "./scheduler_ends";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Dropdown from "../../components/Dropdown/Dropdown";
import Modal from "../../components/Modal/Modal";
import httpRemoveEvent from "../../http/remove_event";
import httpFetchEvents from "../../http/fetch_events";
import httpScheduleAction from "../../http/schedule_action";
import getRRule from "./scheduler_get_rrule";
import units from "./scheduler_time_units";
import NewEvent from "./NewEvent";

const Scheduler = props => {
    const {loginToken, reduxPlants, reduxRobots} = props;

    const [startDate, setStartDate] = useState(new Date());
    const [summary, setSummary] = useState("");
    const [eventToDelete, setEventToDelete] = useState(-1);
    const [events, setEvents] = useState([]);
    const [eventActions, setEventActions] = useState([]);
    const [deleteEventModalOpen, deleteEventModalVisible] = useState(false);
    const [schedulerModalOpen, schedulerModalVisible] = useState(false);
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

    const fetchEvents = async () => {
        const fetchEventResult = await httpFetchEvents(loginToken);
        if (!(fetchEventResult instanceof Error)) {
            const {events} = fetchEventResult;
            setEvents(events);
        }
    };

    const onRemoveEvent = async () => {
        const removeEventResult = await httpRemoveEvent(loginToken, eventToDelete);

        if(removeEventResult.status === 200) {
            fetchEvents();
        }

        deleteEventModalVisible(false);
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

    const createSchedulerModalContent = () => {
        const actionNames = actions.map(action => action.name);
        const reduxPlantNames = reduxPlants.map(plant => plant.name);
        const reduxRobotNames = reduxRobots.map(robot => robot.title);
        return (
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
                                selectRobot(reduxRobots[idx]);
                            }}
                        />
                        <div style={{marginTop: "10px"}}/>

                        <label>Plant</label>
                        <Dropdown
                            name="Plants"
                            style={{display: "inline", marginLeft: "10px"}}
                            items={reduxPlantNames}
                            click={plantName => {
                                const idx = reduxPlantNames.indexOf(plantName);
                                selectPlant(reduxPlants[idx]);
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
        );
    };

    const createDeleteEventModalContent = () => {
        return <p>Are you sure you want to remove this event?</p>;
    };

    const createDeleteEventModalActions = () => {
        return (
            <React.Fragment>
                <button
                    onClick={() => {
                        deleteEventModalVisible(false);
                    }}
                    className="btn btn-danger"
                >
                    Close
                </button>
                <button
                    onClick={onRemoveEvent}
                    className="btn btn-danger"
                >
                    Remove
                </button>
            </React.Fragment>
        );
    };

    return <>
        <Header location={props.location} />
        <div className="content">
            <NewEvent
                visible={schedulerModalOpen}
                onClose={() => schedulerModalVisible(false)}
                content={createSchedulerModalContent()}
                onSubmit={onSchedule}
            />
            <Modal
                open={deleteEventModalOpen}
                close={() => deleteEventModalVisible(false)}
                title="Delete Event"
                content={createDeleteEventModalContent()}
                footer={createDeleteEventModalActions()}
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
            <span>Events</span>
            <button
                onClick={() => schedulerModalVisible(true)}
                className="btn btn-primary"
            >
              Create Event
            </button>
          </span>
                }
                content={
                    <ul className="list-group">
                        {events
                            .filter(event => event !== undefined)
                            .map((event, idx) => (
                                <li key={idx} className="list-group-item" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <span>{event.summary}</span>
                                    <button
                                        onClick={() => {
                                            setEventToDelete(event.id);
                                            deleteEventModalVisible(true);
                                        }}
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                    >
                                        <i className="glyphicon glyphicon-trash" />
                                    </button>
                                </li>
                            ))}
                    </ul>
                }
            />
        </div>
    </>;
};

const mapStateToProps = props => {
    const {plants} = props.plantState;
    const {robots} = props.robotState;
    const {loginToken} = props.auth;
    return {
        loginToken,
        reduxRobots: robots,
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
