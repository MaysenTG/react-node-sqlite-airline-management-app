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
      idParam: window.location.pathname.split("/")[2],
      flightMapImgUrl: "",
      locationToICAO: {
        Sydney: "YSSY",
        Rotorua: "NZRO",
        Tuuta: "NZCI",
        Claris: "NZGB",
        "Lake Tekapo": "NZTL",
      },
      loading: false,
      userLoginInfo: {},
    };
  }

  async componentDidMount() {
    const idParam = this.state.idParam;

    const response = await fetch(`/api/get_flight/${idParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();

    this.setState({
      flightData: body,
      userLoginInfo: JSON.parse(window.sessionStorage.getItem("userLoginInfo")),
    });

    console.log(body);
  }

  handleBookFlight = async (e) => {
    // Scroll to the form for the user to fill out
    e.preventDefault();

    const response = await fetch("/api/book_flight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightID: this.state.idParam,
        userData: {
          email: e.target.email.value,
          customer_id: e.target.customer_id.value,
          flight_id: this.state.flightData.id,
        },
      }),
    });

    const body = await response.json();
  };

  render() {
    let data = this.state.flightData;

    if (data) {
      const ICAOTranslation = this.state.locationToICAO;
      const destinationIcao = ICAOTranslation[data[0].destination];

      this.setState({
        flightMapImgUrl: `http://www.gcmap.com/map?P=NZNE-${destinationIcao}&MS=wls&MR=200&PM=*`,
      });
      return (
        <div className="container">
          <br />
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="d-flex flex-column card-body h-100">
                  <h5 className="card-title">
                    Flight from <strong>Dairy Flat</strong> to{" "}
                    <strong>{data[0].destination}</strong>
                  </h5>
                  <p className="card-text">Lorem Ipsum</p>
                  <div
                    style={{ alignItems: "flex-end" }}
                    className="d-flex h-100"
                  >
                    {data[0].customer_id ? (
                      <button
                        style={{ maxHeight: "40px" }}
                        className="btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#formBookFlightModal"
                        disabled
                      >
                        Already booked!
                      </button>
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
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        First name
                      </label>
                      <input
                        value={this.state.userLoginInfo.first_name}
                        name="first_name"
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor="validationCustom02"
                        className="form-label"
                      >
                        Last name
                      </label>
                      <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        value={this.state.userLoginInfo.first_name}
                        id="validationCustom02"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor="validationCustomUsername"
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
                          value={this.state.userLoginInfo.id}
                          id="validationCustomUsername"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label
                        htmlFor="validationCustom05"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        value={this.state.userLoginInfo.email}
                        id="validationCustom05"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck"
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
        </div>
      );
    } else {
      <div>Loading...</div>;
    }
  }
}

export default ShowFlight;
