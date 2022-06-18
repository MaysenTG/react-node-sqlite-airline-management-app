/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Account from "./components/Account/Account";
import SearchFlight from "./components/SearchFlight/Search";
import Login from "./components/Login/Login";

import ReactDOM from "react-dom/client";
import App from "./App";
import ShowFlight from "./components/Flight/ShowFlight";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const root = ReactDOM.createRoot(document.getElementById("root"));

const userLoginInfo = JSON.parse(
  window.sessionStorage.getItem("userLoginInfo")
);

root.render(
  <Router basename="/">
    <Nav />

    {userLoginInfo ? (
      <Routes>
        <Route path="account/:customer_id" element={<Account />} />
        <Route path="search-flight" element={<SearchFlight />} />
        <Route path="flights/:flightId" element={<ShowFlight />} />
      </Routes>
    ) : (
      <Login />
    )}
  </Router>
);
