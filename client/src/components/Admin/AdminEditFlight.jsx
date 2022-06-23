import PropTypes from "prop-types";
import React, { Component } from "react";

import AdminNav from "./AdminNav";

export default class AdminEditFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idFlightParam: window.location.pathname.split("/")[3],
      flightData: {},
      submittedEdit: false,
      submittedEditMessage: "",
    };
  }

  async componentDidMount() {
    console.log("Getting flight data");
    const idFlightParam = this.state.idFlightParam;

    const response = await fetch(`/api/get_flight/${idFlightParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerID: -1, // Redundant param as the API will return just flight data if this is -1
      }),
    });

    const body = await response.json();

    this.setState({ flightData: body });

    console.log(body);
  }

  handleSubmitEdit = async (e) => {
    e.preventDefault();
    const idFlightParam = this.state.idFlightParam;

    const response = await fetch(`/api/admin/edit_flight/${idFlightParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
  };

  render() {
    const flightData = this.state.flightData[0];

    if (flightData) {
      return (
        <>
          <AdminNav />
          <br />
          <div className="container mt-10">
            <form onSubmit={this.handleSubmitEdit}>
              <div className="row">
                {this.state.submittedEdit && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
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
                <a className="h4" href="/admin/show-flights">
                  Back to all flights
                </a>
                <h2>Edit flight</h2>
                <div className="col mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Flight Number
                  </label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    id="newFlightNumber"
                    defaultValue={flightData.flight_id}
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
                    defaultValue={flightData.plane_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <label
                    htmlFor="newFlightDepartureDate"
                    className="form-label"
                  >
                    Departure Date
                  </label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    id="newFlightDepartureDate"
                    defaultValue={flightData.departure_date}
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
                    defaultValue={flightData.destination}
                  >
                    <option value="Sydney">Sydney</option>
                    <option value="Rotorua">Rotorua</option>
                    <option value="Tuuta">Tuuta</option>
                    <option value="Claris">Claris</option>
                    <option value="Lake Tekapo">Lake Tekapo</option>
                  </select>
                </div>
                <div className="col mb-3">
                  <label htmlFor="newFlightTime" className="form-label">
                    Departure Time (eg. 8AM)
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="newFlightTime"
                    defaultValue={flightData.departure_time}
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
                      defaultValue={flightData.cost}
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
                      defaultValue={flightData.seats}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
              <br />
            </form>
          </div>
        </>
      );
    }
  }
}
