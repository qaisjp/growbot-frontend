import React from "react";

import Card from "../../components/Card/Card.jsx";

import "./register.css";
import backgroundImage from "../../assets/img/background.png";

const Register = () => {
  return (
    <div className="background">
      <img className="background-img" src={backgroundImage} alt="background" />
      <div className="register-div">
        <Card
          className="register-card"
          title="Register"
          content={
            <form>
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>

                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputConfirmPassword">Confirm Password</label>

                <input
                  type="password"
                  className="form-control"
                  id="inputConfirmPassword"
                  placeholder="Confirm Password"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          }
        />
      </div>
    </div>
  );
};

export default Register;
