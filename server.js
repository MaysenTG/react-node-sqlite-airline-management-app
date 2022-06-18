import express from "express";
import bodyParser from "body-parser";

import sqlite3 from "sqlite3";
import { open } from "sqlite";

import path from 'path';
import {fileURLToPath} from 'url';



const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname)
;

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

app.post("/api/book_flight", async (req, res) => {
  console.log(req);
  const flightID = req.body.flightID;
  const db = await dbPromise;
  const responseText = { express: `Booked flight number: ${flightID}` };
  res.send(responseText);
});

app.post("/api/get_user_data/:customer_id", async (req, res) => {
  // Param ID from HTTP request
  let customer_id = req.params.customer_id;
  
  const db = await dbPromise;  
  const departures_by_plane_name = await db.all(
    `SELECT departures.flight_id, departures.plane_name, users.id, users.first_name, users.last_name, users.user_name, users.email FROM departures JOIN user_flights ON (user_flights.flight_id = departures.flight_id) JOIN users ON (users.id = user_flights.customer_id) WHERE users.id=${customer_id}`
  );
  
  res.send(departures_by_plane_name);
});

app.get("/api/get_flights/all", async (req, res) => {
  const db = await dbPromise;
  const all_departure_data = await db.all(`SELECT * FROM departures`);
  console.log(all_departure_data);
  res.send(all_departure_data);
});

app.post("/api/get_flight/:id", async (req, res) => {
  // Param ID from HTTP request
  let idParam = req.params.id;

  const db = await dbPromise;
  const flight_info_by_id = await db.all(
    `SELECT * FROM departures WHERE flight_id='${idParam}'`
  );

  res.send(flight_info_by_id);
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

const setup = async () => {
  const db = await dbPromise;
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

setup();
