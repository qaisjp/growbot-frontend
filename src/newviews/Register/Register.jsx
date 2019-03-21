import React, { useState } from "react";
import { connect } from "react-redux";

import "../../assets/css/register.css";
import backgroundImage from "../../assets/img/background.jpg";
import Card from "../../components/Card/Card.jsx";
import login from "../../actions/login";
import register from "../../http/register";

const Register = props => {
  const { login } = props;

  const [alertVisible, showAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegister = async () => {
    if (alertVisible) {
      showAlert(false);
      setAlertMessage("");
    }

    if (password !== confirmPassword) {
      showAlert(true);
      setAlertMessage(
        "Make sure New Password and Confirm Password are identical!"
      );
      return;
    }

    const response = await register(email, password, forename, surname);
    if (response.status === 200) {
      login(email, password);
    } else {
      const body = await response.json();
      setAlertMessage(body.message);
      showAlert(true);
    }
  };

  return (
    <div className="background">
      <img className="background-img" src={backgroundImage} alt="background" />
      <div className="register-div">
        <Card
          className="register-card"
          title="Register"
          content={
            <div>
              <div
                style={
                  !alertVisible ? { display: "none" } : { display: "block" }
                }
                className="alert alert-danger"
                role="alert"
              >
                {alertMessage}
              </div>
              <div className="form-group">
                <label htmlFor="inputForename">Forename</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputForename"
                  placeholder="Forename"
                  onChange={event => setForename(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputSurname">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSurname"
                  placeholder="Surname"
                  onChange={event => setSurname(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  onChange={event => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>

                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={event => setPassword(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputConfirmPassword">Confirm Password</label>

                <input
                  type="password"
                  className="form-control"
                  id="inputConfirmPassword"
                  placeholder="Confirm Password"
                  onChange={event => setConfirmPassword(event.target.value)}
                />
              </div>

              <button onClick={onRegister} className="btn btn-primary">
                Register
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
