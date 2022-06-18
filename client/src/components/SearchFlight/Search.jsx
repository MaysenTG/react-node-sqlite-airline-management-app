import React from "react";
import { Link, Route, Routes } from "react-router-dom";

class SearchFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightData: [
        {
          flight_id: 1,
          plane_name: "Airbus",
          departure_date: "Tomorrow",
        },
      ],
      showResultTitle: false,
      planeTitleInput: "",
      staticSearchQuery: "",
    };
  }

  async componentDidMount() {
    fetch("/api/get_flights/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ flightData: json });
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.planeTitleInput === "" &&
      document.querySelectorAll("button")[2].name !== "show-all"
    ) {
      document
        .getElementById("inputPlaneTitle")
        .classList.add("border", "border-danger");
      return;
    }

    document
      .getElementById("inputPlaneTitle")
      .classList.remove("border", "border-danger");

    const response = await fetch("/api/get_flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planeTitleInput: this.state.planeTitleInput,
        source: document.querySelectorAll("button")[2].name,
      }),
    });

    const body = await response.json();
    this.setState({
      flightData: body,
      showResultTitle: true,
      staticSearchQuery: this.state.planeTitleInput,
    });
  };

  render() {
    const users = this.state.flightData;
    return (
      <div className="container w-70">
        <br />
        <div className="container bg-light">
          <form
            className="p-3 bg-light"
            method="POST"
            onSubmit={this.handleSubmit}
          >
            <div id="plane-title-input" className="mb-3">
              <label htmlFor="inputPlaneTitle" className="h3 form-label">
                Plane title
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPlaneTitle"
                name="planeTitle"
                value={this.state.planeTitleInput}
                onChange={(e) =>
                  this.setState({
                    planeTitleInput: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
            &nbsp;
            <button
              onClick={this.handleSubmit}
              name="show-all"
              className="btn btn-secondary"
            >
              Show all
            </button>
          </form>
        </div>
        <br />
        {this.state.showResultTitle ? (
          <div>
            <h3>
              Found {this.state.flightData.length} results for "
              {this.state.staticSearchQuery}"
            </h3>
          </div>
        ) : (
          <div>
            <h3>Showing all results</h3>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Plane Name</th>
              <th scope="col">Departure date</th>
              <th scope="col">Departure time</th>
              <th scope="col">Destination</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((departure) => (
              <tr>
                <td>{departure.flight_id}</td>
                <td>{departure.plane_name}</td>
                <td>{departure.departure_date}</td>
                <th>{departure.departure_time}</th>
                <th>{departure.destination}</th>
                <th>
                  <Link
                    to={`/flights/${departure.flight_id}`}
                    className="btn btn-primary"
                  >
                    Read more
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchFlight;
