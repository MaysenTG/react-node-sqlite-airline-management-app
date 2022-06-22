import PropTypes from "prop-types";
import React, { Component } from "react";
import BackgroundImage from "../../media/dairynz_home_og.jpg";

export default class Home extends Component {
  render() {
    return (
      <div
        className="container w-100"
        style={{
          width: 100 + "vw",
          height: 100 + "vh",
        }}
      >
        <div className="row h-100 d-flex justify-content-center align-items-center">
          <div
            id="advanced-search-form"
            className="border border-primary rounded"
            style={{ backgroundColor: "#0099ff" }}
          >
            <form onSubmit={this.handleSearch}>
              <div className="p-2 row">
                <div className="col">
                  <label for="inputEmail4" className="form-label">
                    Destination
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select a destination</option>
                    <option value="YSSY">Sydney</option>
                    <option value="2">Rotorua</option>
                    <option value="3">Tuuta</option>
                    <option value="3">Claris</option>
                    <option value="3">Lake Tekapo</option>
                  </select>
                </div>
                <div className="col">
                  <label for="inputEmail4" className="form-label">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                  />
                </div>
                <div className="col">
                  <label for="inputEmail4" className="form-label">
                    &nbsp;
                  </label>
                  <button
                    type="submit"
                    className="form-control btn btn-success"
                  >
                    Search flights
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
