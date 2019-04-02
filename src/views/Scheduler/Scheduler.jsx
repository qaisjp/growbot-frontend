import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import httpRemoveEvent from "../../http/remove_event";
import httpFetchEvents from "../../http/fetch_events";
import NewEvent from "./NewEvent";

const Scheduler = props => {
    const { loginToken } = props;

    const [eventToDelete, setEventToDelete] = useState(-1);
    const [events, setEvents] = useState([]);
    const [deleteEventModalOpen, deleteEventModalVisible] = useState(false);
    const [schedulerModalOpen, schedulerModalVisible] = useState(false);

    const fetchEvents = async () => {
        const fetchEventResult = await httpFetchEvents(loginToken);
        if (!(fetchEventResult instanceof Error)) {
            const { events } = fetchEventResult;
            setEvents(events);
        }
    };

    const onRemoveEvent = async () => {
        const removeEventResult = await httpRemoveEvent(loginToken, eventToDelete);

        if (removeEventResult.status === 200) {
            fetchEvents();
        }

        deleteEventModalVisible(false);
    };

    const onSchedule = () => {
        fetchEvents();
        schedulerModalVisible(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return <>
        <Header location={props.location} />
        <div className="content">
            <NewEvent
                visible={schedulerModalOpen}
                onClose={() => schedulerModalVisible(false)}
                onSubmit={onSchedule}
            />
            <Modal
                open={deleteEventModalOpen}
                close={() => deleteEventModalVisible(false)}
                title="Delete Event"
                content={<p>Are you sure you want to remove this event?</p>}
                footer={
                    <>
                        <button onClick={() => deleteEventModalVisible(false)} className="btn btn-danger">Close</button>
                        <button onClick={onRemoveEvent} className="btn btn-danger">Remove</button>
                    </>
                }
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
                                <li key={idx} className="list-group-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
    const { plants } = props.plantState;
    const { robots } = props.robotState;
    const { loginToken } = props.auth;
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
