import React, {useState} from "react";
import {connect} from "react-redux";

import Card from "../../components/Card/Card";
import changePassword from "../../http/change_password";

const Settings = props => {
    const {loginToken} = props;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [alertVisible, showAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertType, setAlertType] = useState("");

    const onChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            showAlert(true);
            setAlertMessage(
                "Make sure New Password and Confirm Password are identical!"
            );
            setAlertType("error");
            return;
        }

        const response = await changePassword(
            loginToken,
            currentPassword,
            newPassword,
            confirmNewPassword
        );
        showAlert(true);

        if (response.status === 200) {
            setAlertMessage("Successfully changed password!");
            setAlertType("success");
        } else {
            const body = await response.json();
            setAlertMessage(body.message);
            setAlertType("error");
        }
    };

    return (
        <div className="content">
            <Card
                title="Change Password"
                content={
                    <div>
                        <div
                            style={!alertVisible ? {display: "none"} : {display: "block"}}
                            className={
                                alertType === "success"
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {alertMessage}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>

                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                                onChange={event => setCurrentPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNewPassword">New Password</label>

                            <input
                                type="password"
                                className="form-control"
                                id="inputNewPassword"
                                placeholder="NewPassword"
                                onChange={event => setNewPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputConfirmPassword">Confirm Password</label>

                            <input
                                type="password"
                                className="form-control"
                                id="inputConfirmPassword"
                                placeholder="ConfirmPassword"
                                onChange={event => setConfirmNewPassword(event.target.value)}
                            />
                        </div>
                        <button
                            onClick={onChangePassword}
                            type="button"
                            className="btn btn-sm btn-danger"
                        >
                            Change Password
                        </button>
                    </div>
                }
            />
        </div>
    );
};

const mapStateToProps = state => {
    const {loginToken} = state.auth;
    return {
        loginToken
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
