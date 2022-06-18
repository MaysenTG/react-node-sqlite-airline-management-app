import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userLoginInfo = JSON.parse(
      window.sessionStorage.getItem("userLoginInfo")
    );
    console.log(userLoginInfo);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target.loginAirpointsID.value);

    const userLoginInfo = {
      email: e.target.loginEmail.value,
      airpoints_id: e.target.loginAirpointsID.value,
      password: e.target.loginPassword.value,
    };

    window.sessionStorage.setItem(
      "userLoginInfo",
      JSON.stringify(userLoginInfo)
    );

    window.location.reload();
  };

  render() {
    return (
      <div className="container w-75 mt-2">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
            <input
              type="email"
              id="loginEmail"
              name="login_email"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Airpoints ID
            </label>
            <input
              type="number"
              id="loginAirpointsID"
              name="login_airpoints_id"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              name="login_password"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
