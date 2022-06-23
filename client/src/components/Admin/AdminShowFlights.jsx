import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdminNav from "./AdminNav";

class AdminShowFlights extends React.Component {
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
      inputDestination: "",
      staticSearchQuery: "",
      submittedEdit: false,
      submittedEditMessage: "",
    };
  }

  async componentDidMount() {
    fetch("/api/get_flights/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ flightData: json });
      });
  }

  handleDeleteFlight = async (e) => {
    e.preventDefault();

    const targetFlightID = e.target.flight_id.value;
    console.log(targetFlightID);

    const response = await fetch(`/api/admin/delete_flight/${targetFlightID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();

    window.location.reload();
  };

  render() {
    const users = this.state.flightData;
    return (
      <>
        <AdminNav />
        <div className="container w-70">
          <br />
          <br />
          <a href="/admin/add-flight" className="btn btn-primary">Add new flight</a>
          <table className="mt-2 table table-responsive">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Plane Name</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((departure) => (
                <tr>
                  <td>{departure.flight_id}</td>
                  <td>{departure.plane_name}</td>
                  <td>{departure.origin}</td>
                  <th>{departure.destination}</th>
                  <th>
                    <Link
                      to={`/admin/edit-flight/${departure.flight_id}`}
                      className="btn btn-secondary"
                    >
                      Edit flight
                    </Link>
                  </th>
                  <th>
                    <form onSubmit={this.handleDeleteFlight}>
                      <input
                        name="flight_id"
                        type="hidden"
                        value={departure.flight_id}
                      />
                      <button type="submit" className="btn btn-danger">
                        Delete flight
                      </button>
                    </form>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default AdminShowFlights;
