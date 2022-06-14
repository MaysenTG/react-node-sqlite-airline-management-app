/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";

import Account from "./components/Account/Account";
import SearchFlight from "./components/SearchFlight/Search";

import ReactDOM from "react-dom/client";
import App from "./App";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
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
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
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
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="my-account" element={<Account />} />
      <Route path="search-flight" element={<SearchFlight />} />
    </Routes>
  </Router>
);
