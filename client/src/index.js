/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Account from "./components/Account/Account";
import SearchFlight from "./components/SearchFlight/Search";
import Login from "./components/Login/Login";
import EditAccount from "./components/Account/Edit";

import ReactDOM from "react-dom/client";
import ShowFlight from "./components/Flight/ShowFlight";

const root = ReactDOM.createRoot(document.getElementById("root"));

const userLoginInfo = JSON.parse(
  window.sessionStorage.getItem("userLoginInfo")
);

root.render(
  <Router basename="/">
    <Nav />

    {userLoginInfo ? (
      <Routes>
        <Route path="my-account/:id/edit" element={<EditAccount />} />
        <Route path="my-account/:customer_id" element={<Account />} />
        <Route path="search-flight" element={<SearchFlight />} />
        <Route path="flights/:flightId" element={<ShowFlight />} />
      </Routes>
    ) : (
      <Login />
    )}
  </Router>
);
