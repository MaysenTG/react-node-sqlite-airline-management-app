/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idParam: window.location.pathname.split("/")[2],
      justUserData: null,
      flightsData: null,
      locationToICAO: {
        Sydney: "YSSY",
        Rotorua: "NZRO",
        Tuuta: "NZCI",
        Claris: "NZGB",
        "Lake Tekapo": "NZTL",
      },
      flightDataPresent: false,
    };
  }

  // Fetches the data for this page. Called in componentDidMount. Gets user data, and flights associated with the user via the user_flights junction table
  async componentDidMount() {
    const idParam = this.state.idParam;
    console.log(idParam + " here for get user flight data");

    const response = await fetch(`/api/get_user_flight_data/${idParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();

    //console.log(body[0]);

    this.setState({ flightDataPresent: true });
    this.setState({ flightsData: body });

    // Fetch number 2 for just user data
    const response_user_data = await fetch(`/api/get_user_data/${idParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body_user_data = await response_user_data.json();

    this.setState({ justUserData: body_user_data });
    // console.log("little fetch");
    // console.log(body_user_data);

    // //console.log(body);
  }

  cancelFlightBooking = async (e) => {
    e.preventDefault();
    const customerID = this.state.idParam;
    const flight_id = this.state.flightsData[0].flight_id;
    const bookingID = this.state.flightsData[0].booking_id;

    const response = await fetch(`/api/cancel_booking/${flight_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerID: customerID,
        bookingID: bookingID,
      }),
    });

    const body = await response.json();
    
    window.location.reload();
  };

  render() {
    const userData = this.state.flightsData;
    const justUserData = this.state.justUserData;

    if (justUserData) {
      return (
        <section className="vh-100">
          <div className="container h-100">
            <br />
            <div className="row-1 row-cols-1 row-cols-sm-1 row-cols-md-1">
              <div className="row h-100">
                <div className="w-100 col">
                  <div className="card" style={{ borderRadius: 15 + "px" }}>
                    <div className="card-body p-4">
                      <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder"
                            className="img-fluid"
                            style={{
                              width: 180 + "px",
                              borderRadius: 10 + "px",
                            }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h5 className="mb-1">
                            {justUserData[0].first_name}{" "}
                            {justUserData[0].last_name}
                          </h5>
                          <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                            Customer ID: <strong>{justUserData[0].id}</strong>
                          </p>
                          <div
                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                            style={{ backgroundColor: "#efefef" }}
                          >
                            <div>
                              <p className="small text-muted mb-1">
                                Number of booked flights
                              </p>
                              <p className="mb-0">
                                {this.state.flightDataPresent
                                  ? userData.length
                                  : 0}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex pt-1">
                            <button
                              type="button"
                              className="btn btn-outline-primary me-1 flex-grow-1"
                            >
                              Chat
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary flex-grow-1"
                            >
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              {this.state.flightDataPresent && <h3>Booked flights</h3>}
              <div className="row h-100">
                <div className="w-100 col">
                  {this.state.flightDataPresent &&
                    userData.map((flight) => (
                      <div
                        className="card mb-2"
                        style={{ borderRadius: 15 + "px" }}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                              <img
                                src={
                                  "http://www.gcmap.com/map?P=NZNE-" +
                                  this.state.locationToICAO[
                                    flight.destination
                                  ] +
                                  "&MS=wls&MR=200&PM=*"
                                }
                                alt="Generic placeholder map"
                                className="img-fluid"
                                style={{
                                  width: 50 + "vw",
                                  borderRadius: 10 + "px",
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column flex-grow-1 ms-3">
                              <h5 className="mb-1">
                                Flight from Dairy Flats to {flight.destination}
                              </h5>
                              <p
                                className="mb-2 pb-1"
                                style={{ color: "#2b2a2a" }}
                              >
                                Booking reference: <strong><a href={"/flights/"+flight.flight_id}>{flight.booking_id}</a></strong>
                              </p>
                              <p
                                className="mb-2 pb-1"
                                style={{ color: "#2b2a2a" }}
                              >
                                Plane: {flight.plane_name}
                              </p>
                              <p
                                className="mb-2 pb-1"
                                style={{ color: "#2b2a2a" }}
                              >
                                Departure date: {flight.departure_date}
                              </p>
                              <p
                                className="mb-2 pb-1"
                                style={{ color: "#2b2a2a" }}
                              >
                                Departure time: {flight.departure_time}
                              </p>
                              <form onSubmit={this.cancelFlightBooking}>
                                <button
                                  type="submit"
                                  className="w-100 align-items-end btn btn-danger"
                                >
                                  Cancel flight
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      <div>Loading...</div>;
    }
  }
}

export default Account;
