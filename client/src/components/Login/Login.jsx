import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
    };
  }

  componentDidMount() {
    const userLoginInfo = JSON.parse(
      window.sessionStorage.getItem("userLoginInfo")
    );
    console.log(userLoginInfo);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userLoginInfo: {
          email: e.target.loginEmail.value,
          password: e.target.loginPassword.value,
        },
      }),
    });

    const body = await response.json();

    if (body.length > 0) {
      window.sessionStorage.setItem(
        "userLoginInfo",
        JSON.stringify(body[0])
      );
      this.setState({
        authenticated: true,
      });
      window.location.reload();
    } else {
      this.setState({
        authenticated: false,
      });
    }
    //console.log(body);
  };

  render() {
    return (
      <div className="container w-75 mt-2">
        <h2>Login</h2>
        {this.state.authenticated === false && (
          <div style={{ color: "red" }}>
            Login credentials incorrect, please try again
          </div>
        )}
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
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button> &nbsp;
          <a href="/account/create">Don't have an account? Create one here</a>
        </form>
      </div>
    );
  }
}
