/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledLink = styled(Link)`
  text-decoration: none;
`;

class AdminNav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ADMIN
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/admin/add-flight"
                >
                  Add new flight
                </a>
              </li>
              <li className="nav-item">
                <li className="nav-item">
                  <a className="nav-link" href="/admin/show-flights">
                    Show flights
                  </a>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default AdminNav;
