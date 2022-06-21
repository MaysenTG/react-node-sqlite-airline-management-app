import express from "express";
import bodyParser from "body-parser";

import sqlite3 from "sqlite3";
import { open } from "sqlite";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log("directory-name 👉️", __dirname);

const app = express();
const port = process.env.PORT || 3002;

const dbPromise = open({
  filename: "main.db",
  driver: sqlite3.Database,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/get_flights", async (req, res) => {
  const searchQuery = req.body.planeTitleInput;
  const db = await dbPromise;
  const departures_by_plane_name = await db.all(
    `SELECT * FROM departures WHERE plane_name LIKE '%${searchQuery}%'`
  );

  res.send(departures_by_plane_name);
});

app.post("/api/account/login", async (req, res) => {
  const loginFormEmail = req.body.userLoginInfo.email;
  const loginFormPassword = req.body.userLoginInfo.password;

  const db = await dbPromise;
  const user_login_query = await db.all(
    `SELECT * FROM users WHERE email='${loginFormEmail}' AND password='${loginFormPassword}'`
  );

  res.send(user_login_query);
});

app.post("/api/book_flight", async (req, res) => {
  const flightID = req.body.flightID;
  const customerID = req.body.userData.customer_id;

  const db = await dbPromise;

  const sql = "INSERT INTO user_flights(flight_id, customer_id) VALUES (?, ?)";

  if (flightID && customerID) {
    await db.run(sql, [flightID, customerID], (err) => {
      if (err) return console.error(err.message);
      console.log("Inserted a row into the departures table.");
    });
  } else {
    console.log("Error: Missing flightID or customerID");
  }

  const responseText = { express: `Booked flight number: ${flightID}` };
  res.send(responseText);
});

app.post("/api/cancel_booking/:flight_id", async (req, res) => {
  const flightID = req.params.flight_id;
  const customerID = req.body.customerID;

  const db = await dbPromise;

  await db.all(
    `DELETE FROM user_flights WHERE flight_id='${flightID}' AND customer_id='${customerID}'`
  );
  
  console.log("DELETED")

  const responseText = { express: `Booked flight number: ${flightID}` };
  res.send(responseText);
});

app.post("/api/get_user_flight_data/:customer_id", async (req, res) => {
  // Param ID from HTTP request
  let customer_id = req.params.customer_id;

  const db = await dbPromise;
  const departures_by_plane_name = await db.all(
    `SELECT * FROM user_flights JOIN users ON (users.id = ${customer_id}) JOIN departures ON (user_flights.flight_id = departures.flight_id)`
  );
  
  console.log(departures_by_plane_name)

  res.send(departures_by_plane_name);
});

app.post("/api/get_user_data/:customer_id", async (req, res) => {
  // Param ID from HTTP request
  let customer_id = req.params.customer_id;

  const db = await dbPromise;
  const only_user_data = await db.all(
    `SELECT * FROM users WHERE id=${customer_id}`
  );
  res.send(only_user_data);
});

app.post("/api/edit_user_data/:customer_id", async (req, res) => {
  // Param ID from HTTP request
  let customer_id = req.params.customer_id;
  const user_email = req.body.userData.email;
  const user_first_name = req.body.userData.first_name;
  const user_last_name = req.body.userData.last_name;
  const user_password = req.body.userData.password;

  const db = await dbPromise;
  await db.all(
    `UPDATE users SET first_name='${user_first_name}', last_name='${user_last_name}', email='${user_email}', password='${user_password}'  WHERE id=${customer_id}`
  );

  res.send({ express: "Finished setting data" });
});

app.get("/api/get_flights/all", async (req, res) => {
  const db = await dbPromise;
  const all_departure_data = await db.all(`SELECT * FROM departures`);
  res.send(all_departure_data);
});

// Gets the individual flight information
app.post("/api/get_flight/:id", async (req, res) => {
  // Param ID from HTTP request
  let idParam = req.params.id;

  const db = await dbPromise;
  
  //`SELECT * FROM departures WHERE departures.flight_id=${idParam}`
  
  const flight_info_by_id = await db.all(
    `SELECT departures.flight_id, departures.departure_time, departures.departure_date, departures.destination, departures.plane_name, users.id, users.first_name, users.last_name, users.user_name, users.email FROM departures JOIN user_flights ON (user_flights.flight_id = departures.flight_id) JOIN users ON (users.id = user_flights.customer_id) WHERE departures.flight_id=${idParam}`
  );
  
  if(flight_info_by_id.length == 0) {
    console.log("Customer hasn't booked flight");
  } else {
    res.send(flight_info_by_id);
  }
  
  const flight_info_by_id_simple = await db.all(
    `SELECT * FROM departures WHERE departures.flight_id=${idParam}`
  );
  
  console.log(flight_info_by_id_simple)

  res.send(flight_info_by_id_simple);
});

const setup = async () => {
  const db = await dbPromise;
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

setup();
