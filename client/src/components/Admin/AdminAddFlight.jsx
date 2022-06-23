import PropTypes from "prop-types";
import React, { Component } from "react";

import AdminNav from "./AdminNav";

export default class AdminAddFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedEdit: false,
      submittedEditMessage: "",
    };
  }

  handleSubmitNewFlight = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/admin/add_flight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newFlightID: e.target.newFlightID.value,
        newFlightPlaneName: e.target.newFlightPlaneName.value,
        newFlightDepartureDate: e.target.newFlightDepartureDate.value,
        newFlightDestination: e.target.newFlightDestination.value,
        newFlightTime: e.target.newFlightTime.value,
        newFlightPrice: e.target.newFlightPrice.value,
        newFlightNumberSeats: e.target.newFlightNumberSeats.value,
      }),
    });

    const body = await response.json();

    this.setState({ submittedEdit: true, submittedEditMessage: body });

    e.target.reset();
  };

  render() {
    return (
      <>
        <AdminNav />
        <br />
        <div className="container mt-10">
          {this.state.submittedEdit && (
            <div
              className={
                "alert-dismissible fade show " +
                this.state.submittedEditMessage.error
                  ? "alert alert-danger"
                  : "alert alert-success"
              }
              role="alert"
            >
              {this.state.submittedEditMessage.express}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <form onSubmit={this.handleSubmitNewFlight}>
            <div className="row">
              <h2>Add a new flight</h2>
              <div className="col mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Flight Number
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="newFlightID"
                />
              </div>
              <div className="col mb-3">
                <label htmlFor="newFlightPlaneName" className="form-label">
                  Plane Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="newFlightPlaneName"
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="newFlightDepartureDate" className="form-label">
                  Departure Date
                </label>
                <input
                  required
                  type="date"
                  className="form-control"
                  id="newFlightDepartureDate"
                />
              </div>
              <div className="col mb-3">
                <label htmlFor="newFlightDestination" className="form-label">
                  Destination
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="newFlightDestination"
                >
                  <option selected>Select a destination</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Rotorua">Rotorua</option>
                  <option value="Tuuta">Tuuta</option>
                  <option value="Claris">Claris</option>
                  <option value="Lake Tekapo">Lake Tekapo</option>
                  <option value="Dairy Flat">Dairy Flat</option>
                </select>
              </div>
              <div className="col mb-3">
                <label htmlFor="newFlightTime" className="form-label">
                  Departure Time
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="newFlightTime"
                />
              </div>
              <div className="mt-5 row">
                <h3>Flight Meta Data</h3>
                <div className="col mb-3">
                  <label htmlFor="newFlightPrice" className="form-label">
                    Cost per seat
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="newFlightPrice"
                  />
                </div>
                <div className="col mb-3">
                  <label htmlFor="newFlightPrice" className="form-label">
                    Number of seats
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="newFlightNumberSeats"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add flight
            </button>
            <br />
          </form>
        </div>
      </>
    );
  }
}
