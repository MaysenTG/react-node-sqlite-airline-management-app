const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./main.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Connection successful!");
});

// db.run(
//   "CREATE TABLE users(first_name, last_name, user_name, password, email, id)"
// );

// const sql = (
//   'INSERT INTO users (first_name, last_name, user_name, password, email, id) VALUES (?, ?, ?, ?, ?, ?)'
// )

// db.run(sql, ['John', 'Doe', 'jdoe', 'password1', 'john.doe@gmail.com', 1], (err) => {
//   if (err) return console.error(err.message);

//   console.log("Inserted a row into the users table.");
// });

// Query the database
export default function getUsers() {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

db.close((err) => {
  if (err) return console.error(err.message);
});
