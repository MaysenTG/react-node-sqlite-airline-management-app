import sqlite3 from "sqlite3";

// DB table scheme below

// TABLE users {
//   id int [pk, increment]
//   first_name varchar
//   last_name varchar
//   email varchar
//   created_at timestamp
// }

// TABLE departures {
//   flight_id int [pk, increment]
//   plane_name varchar
//   departure_date timestamp
// }

// TABLE users_flights {
//   flight_id int [ref: > departures.flight_id]
//   customer_id int [ref: > users.id]
// }

const db = new sqlite3.Database("./main.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Connection successful!");
});

// db.run(
//   "CREATE TABLE user_flights(flight_id, customer_id)"
// );

// const sql = (
//   'INSERT INTO users(first_name, last_name, user_name, password, email, id) VALUES (?, ?, ?, ?, ?, ?)'
// )

// db.run(
//   'UPDATE users SET id=2 WHERE first_name="John"'
// )

// const sql = (
//   'INSERT INTO user_flights(flight_id, customer_id) VALUES (?, ?)'
// )

// db.run(sql, [2, 1], (err) => {
//   if (err) return console.error(err.message);

//   console.log("Inserted a row into the departures table.");
// });


// Query the database
// Example query below showing use of junction table
// db.all("SELECT departures.flight_id, departures.plane_name, users.id, users.first_name FROM departures JOIN user_flights ON (user_flights.flight_id = departures.flight_id) JOIN users ON (users.id = user_flights.customer_id)", (err, rows) => {
// db.all("SELECT departures.flight_id, departures.plane_name, users.id, users.first_name FROM departures JOIN user_flights ON (user_flights.flight_id = departures.flight_id) JOIN users ON (users.id = user_flights.customer_id)", (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });


db.close((err) => {
  if (err) return console.error(err.message);
});
