/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import React, { Component } from "react";
import AdminNav from "./AdminNav";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {
        flightNumber: "",
        departure: "",
        arrival: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        seats: "",
        description: "",
        image: "",
      },
      authenticated: false,
      hasSubmitted: false,
      errors: {},
    };
  }

  onAuthenticateAdmin = (e) => {
    e.preventDefault();
    this.setState({ hasSubmitted: true });
    if (e.target.adminPassword.value === "root") {
      this.setState({ authenticated: true });
    }
  };

  render() {
    if (this.state.authenticated) {
      return (
        <>
          <AdminNav />
        </>
      );
    } else {
      return (
        <div className="h-100" style={{ height: 100 + "%", width: 100 + "%" }}>
          <div className="d-flex justify-content-center mt-10">
            <div>
              <h2>Please enter the admin password</h2>
              {this.state.hasSubmitted && (
                <div style={{ color: "red" }}>
                  Incorrect password, please try again
                </div>
              )}
              <form onSubmit={this.onAuthenticateAdmin}>
                <div className="row">
                  <input
                    className="form-control"
                    required
                    type="text"
                    id="adminPassword"
                  />
                  <button className="mt-1 btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
