/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledLink = styled(Link)`
  text-decoration: none;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    const userLoginInfo = JSON.parse(
      window.sessionStorage.getItem("userLoginInfo")
    );

    if (userLoginInfo) {
      this.setState({ loggedIn: true });
    }
  }

  handleLogout() {
    console.log("logging out...");
    //window.sessionStorage.removeItem("userLoginInfo");
    //window.location.reload();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Airline Management
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <li className="nav-item">
                  <StyledLink className="nav-link" to="/search-flight">
                    Search flight
                  </StyledLink>
                </li>
              </li>
              <li className="nav-item">
                <li className="nav-item">
                  <StyledLink className="nav-link" to="/book-flight">
                    Book a flight
                  </StyledLink>
                </li>
              </li>
              <li className="nav-item">
                <StyledLink className="nav-link" to="/my-account">
                  Account
                </StyledLink>
              </li>
              <li className="nav-item">
                <StyledLink className="nav-link" to="/booked-flights">
                  Booked flights
                </StyledLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      {this.state.loggedIn ? (
                        <a onClick={this.handleLogout}>Logout</a>
                      ) : (
                        <>Login</>
                      )}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
