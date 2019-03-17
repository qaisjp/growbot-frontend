import React from "react";

import Card from "../../components/Card/Card.jsx";

import "./login.css";

const Login = () => {
  return (
    <div className="login_div">
      <Card
        className="login_card"
        title="Login"
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

            <div className="checkbox">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        }
      />
    </div>
  );
};

export default Login;
