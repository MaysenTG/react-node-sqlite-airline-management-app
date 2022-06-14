import React from "react";

class SearchFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      planeTitleInput: ""
    };
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/get_flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planeTitleInput: this.state.planeTitleInput }),
    });
    const body = await response.text();
    
    console.log(body);
  };

  render() {
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
              onChange={e => this.setState({ planeTitleInput: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SearchFlight;
