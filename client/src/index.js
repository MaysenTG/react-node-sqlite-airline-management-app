/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Account from "./components/Account/Account";
import SearchFlight from "./components/SearchFlight/Search";
import Login from "./components/Login/Login";
import EditAccount from "./components/Account/Edit";
import Home from "./components/Homepage/Home";
import AdminAddFlight from "./components/Admin/AdminAddFlight";
import AdminShowFlights from "./components/Admin/AdminShowFlights";
import AdminEditFlight from "./components/Admin/AdminEditFlight";

import ReactDOM from "react-dom/client";
import ShowFlight from "./components/Flight/ShowFlight";
import Admin from "./components/Admin/Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));

const userLoginInfo = JSON.parse(window.localStorage.getItem("userLoginInfo"));

console.log("Here:");
console.log(userLoginInfo);

root.render(
  <Router basename="/">
    <Nav />

    {userLoginInfo ? (
      <Routes>
        <Route path="my-account/:id/edit" element={<EditAccount />} />
        <Route path="my-account/:customer_id" element={<Account />} />
        <Route path="/" element={<SearchFlight />} />
        <Route path="flights/:flightId" element={<ShowFlight />} />

        <Route path="admin" element={<Admin />} />
        <Route path="/admin/add-flight" element={<AdminAddFlight />} />
        <Route path="/admin/show-flights" element={<AdminShowFlights />} />
        <Route
          path="/admin/edit-flight/:flight_id"
          element={<AdminEditFlight />}
        />
      </Routes>
    ) : (
      <Login />
    )}
  </Router>
);
