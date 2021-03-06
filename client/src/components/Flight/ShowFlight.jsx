import React from "react";
import { Link, Route, Routes } from "react-router-dom";

// URL format for Map of flight path
// http://www.gcmap.com/map?P={Origin}-{Destination}&MS=wls&MR=200&PM=*

class ShowFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseFromBook: [],
      flightData: null,
      idFlightParam: window.location.pathname.split("/")[2],
      flightMapImgUrl: "",
      locationToICAO: {
        Sydney: "YSSY",
        Rotorua: "NZRO",
        Tuuta: "NZCI",
        Claris: "NZGB",
        "Lake Tekapo": "NZTL",
        "Dairy Flat": "NZNE",
      },
      booked: false,
      userLoginInfo: {},
    };
  }

  async componentDidMount() {
    const userLoginInfo = JSON.parse(
      window.localStorage.getItem("userLoginInfo")
    );

    const idFlightParam = this.state.idFlightParam;
    const customerID = userLoginInfo.customer_id;

    const response_user_data = await fetch(`/api/get_user_data/${customerID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body_user_data = await response_user_data.json();

    this.setState({ userLoginInfo: body_user_data });

    const response = await fetch(`/api/get_flight/${idFlightParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerID: customerID,
      }),
    });

    const body = await response.json();

    this.setState({ flightData: body, userLoginInfo: userLoginInfo });

    console.log(body);
  }

  handleBookFlight = async (e) => {
    // Scroll to the form for the user to fill out
    e.preventDefault();
    const userLoginInfo = JSON.parse(
      window.localStorage.getItem("userLoginInfo")
    );

    const customerID = userLoginInfo.customer_id;

    const unique_booking_id =
      Math.floor(Math.random() * 10000000000) * customerID + customerID;

    const response = await fetch("/api/book_flight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightID: this.state.idFlightParam,
        bookingID: unique_booking_id,
        userData: {
          email: e.target.email.value,
          customerID: customerID,
          flight_id: this.state.flightData.id,
        },
      }),
    });

    window.location.reload();

    const body = await response.json();
  };

  cancelFlightBooking = async (e) => {
    e.preventDefault();
    const flightID = this.state.idFlightParam;
    const bookingID = this.state.flightData[0].booking_id;

    const userLoginInfo = JSON.parse(
      window.localStorage.getItem("userLoginInfo")
    );
    const customerID = userLoginInfo.customer_id;

    const response = await fetch(`/api/cancel_booking/${flightID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerID: customerID,
        bookingID: bookingID,
      }),
    });
    window.location.reload();
  };

  render() {
    let data = this.state.flightData;

    if (data) {
      const ICAOTranslation = this.state.locationToICAO;
      const destination = data[0].destination;
      const destinationIcao = ICAOTranslation[destination];
      const originIcao = ICAOTranslation[data[0].origin];
      this.setState({
        flightMapImgUrl: `http://www.gcmap.com/map?P=${originIcao}-${destinationIcao}&MS=wls&MR=200&PM=*`,
      });
      return (
        <div className="container">
          <br />
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="d-flex flex-column card-body h-100">
                  <h5 className="card-title">
                    Flight from <strong>{data[0].origin}</strong> to{" "}
                    <strong>{data[0].destination}</strong>
                  </h5>
                  <p className="card-text">Beautiful trip with scenic views</p>
                  <hr></hr>
                  <p className="card-text">
                    <strong>Flight ID:</strong> {data[0].flight_id}
                  </p>
                  <p className="card-text">
                    <strong>Plane Name:</strong> {data[0].plane_name}
                  </p>

                  <hr></hr>
                  <p className="card-text">
                    <strong>Departure Date:</strong> {data[0].departure_date}
                  </p>
                  <p className="card-text">
                    <strong>Departure Time:</strong> {data[0].departure_time}
                  </p>

                  <hr></hr>

                  <p className="card-text">
                    <strong>Cost per ticket:</strong> ${data[0].cost}
                  </p>
                  <p className="card-text">
                    <strong>Number of seats:</strong> {data[0].seats}
                  </p>

                  <div
                    style={{ alignItems: "flex-end" }}
                    className="d-flex h-100"
                  >
                    {data[0].customer_id ? (
                      <div className="d-flex flex-column w-100">
                        <button
                          style={{ maxHeight: "40px" }}
                          className="btn btn-primary w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#formBookFlightModal"
                          disabled
                        >
                          You're all booked, have fun!
                        </button>
                        <br />
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#bookInvoiceModal"
                          className="btn btn-secondary"
                        >
                          View invoice
                        </button>
                        <span className="text-center">or</span>
                        <form onSubmit={this.cancelFlightBooking}>
                          <div className="dropdown-center">
                            <button
                              style={{ maxHeight: "40px" }}
                              className="btn btn-danger w-100"
                              data-toggle="confirmation"
                              id="dropdownCenterBtn"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Cancel flight
                            </button>
                            <ul
                              className="w-100 dropdown-menu"
                              aria-labelledby="dropdownCenterBtn"
                            >
                              <li>
                                <button type="submit" className="dropdown-item">
                                  Confirm cancelation
                                </button>
                              </li>
                            </ul>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <button
                        style={{ maxHeight: "40px" }}
                        className="btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#formBookFlightModal"
                      >
                        <>Book flight now</>
                      </button>
                    )}
                  </div>
                  {this.state.responseFromBook ? (
                    <div>{this.state.responseFromBook.express}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={this.state.flightMapImgUrl}
                  className="h-auto img-fluid rounded-start"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <br />
          <div
            className="modal fade"
            id="formBookFlightModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Booking flight from Dairy Flats to {data[0].destination}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    method="POST"
                    onSubmit={this.handleBookFlight}
                    className="row g-3"
                    validate="true"
                    id="bookFlightForm"
                  >
                    <div className="col-md-4">
                      <label
                        htmlhtmlFor="validationCustom01"
                        className="form-label"
                      >
                        First name
                      </label>
                      <input
                        defaultValue={this.state.userLoginInfo.first_name}
                        name="first_name"
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlhtmlFor="validationCustom02"
                        className="form-label"
                      >
                        Last name
                      </label>
                      <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        defaultValue={this.state.userLoginInfo.last_name}
                        id="validationCustom02"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlhtmlFor="validationCustomUsername"
                        className="form-label"
                      >
                        Customer ID
                      </label>
                      <div className="input-group">
                        <input
                          disabled="true"
                          name="customer_id"
                          type="text"
                          className="form-control"
                          defaultValue={this.state.userLoginInfo.customer_id}
                          id="validationCustomUsername"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label
                        htmlhtmlFor="validationCustom05"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        defaultValue={this.state.userLoginInfo.email}
                        id="validationCustom05"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="invalidCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlhtmlFor="invalidCheck"
                        >
                          Agree to terms and conditions
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="mt-2 modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="bookFlightForm"
                      className="btn btn-primary"
                    >
                      Book flight
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="bookInvoiceModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Customer invoice
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Total cost of flight: ${data[0].cost} (GST included)
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      <div>Loading...</div>;
    }
  }
}

export default ShowFlight;
