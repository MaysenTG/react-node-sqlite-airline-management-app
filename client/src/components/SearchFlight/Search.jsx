import React from "react";
import { Link } from "react-router-dom";

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
      allFlightData: [
        {
          flight_id: 1,
          plane_name: "Airbus",
          departure_date: "Tomorrow",
        },
      ],
      showResultTitle: false,
      inputDestination: "",
      staticSearchQuery: "",
    };
  }

  // Get flights when the component loads
  async componentDidMount() {
    fetch("/api/get_flights/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ flightData: json, allFlightData: json });
      });
  }

  // Reset form to show all items
  handleShowAll = (e) => {
    e.preventDefault();
    document.querySelector("form[id='search-form']").reset();
    this.setState({ flightData: this.state.allFlightData });
  };

  // Submit the form to search for flights
  handleSubmit = async (e) => {
    e.preventDefault();
    const inputDestination = e.target.inputDestination.value;
    const inputDate = e.target.inputDate.value;
    let formattedDate = "";

    // Reset the form similar to above if the inputs are empty
    if (!inputDate && inputDestination === "default") {
      document.querySelector("form[id='search-form']").reset();
      this.setState({ flightData: this.state.allFlightData });
      return;
    }

    if (inputDate !== "default") {
      let inputDateNew = inputDate.split("-");

      // Splits the date into the appropriate format for the database
      formattedDate =
        inputDateNew[0] + "-" + inputDateNew[1] + "-" + inputDateNew[2];
    }

    document
      .getElementById("inputDestination")
      .classList.remove("border", "border-danger");

    const response = await fetch("/api/get_flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputDestination: inputDestination,
        inputDate: formattedDate,
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
            id="search-form"
            className="p-3 bg-light"
            method="POST"
            onSubmit={this.handleSubmit}
          >
            <div className="row">
              <div className="col">
                <label htmlFor="inputEmail4" className="form-label">
                  Destination
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="inputDestination"
                  defaultValue="default"
                >
                  <option value="default">Select a destination</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Rotorua">Rotorua</option>
                  <option value="Tuuta">Tuuta</option>
                  <option value="Claris">Claris</option>
                  <option value="Lake Tekapo">Lake Tekapo</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="inputEmail4" className="form-label">
                  Departure Date
                </label>
                <input
                  type="date"
                  name="inputDate"
                  className="form-control"
                  placeholder="Last name"
                  aria-label="Last name"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
            &nbsp;
            <button
              onClick={this.handleShowAll}
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
            <h3>Found {this.state.flightData.length} results</h3>
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
              <tr key={departure.flight_id}>
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
