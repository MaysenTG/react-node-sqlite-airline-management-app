import React from "react";

class SearchFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [
        {
          first_name: "John",
          last_name: "Doe",
          user_name: "jdoe",
          password: "password1",
          email: "",
          id: 1,
        },
      ],
      planeTitleInput: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/get_flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planeTitleInput: this.state.planeTitleInput }),
    });
    const body = await response.text();

    this.setState({ response: body });
  };

  render() {
    const users = this.state.response;
    return (
      <div className="container w-70">
        <form method="POST" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Plane title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="planeTitle"
              value={this.state.planeTitleInput}
              onChange={(e) =>
                this.setState({ planeTitleInput: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First name</th>
              <th scope="col">Last</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{ user.id }</td>
                <td>{ user.first_name }</td>
                <td>{ user.last_name }</td>
                <td>{ user.user_name }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchFlight;
