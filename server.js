import express from 'express';
import bodyParser from 'body-parser';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = process.env.PORT || 3002;

const dbPromise = open({
  filename: 'main.db',
  driver: sqlite3.Database,
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/get_flights', async (req, res) => {
  console.log(req.body.planeTitleInput);
  const searchQuery = req.body.planeTitleInput;
  
  const db = await dbPromise;
  const users = await db.all(`SELECT * FROM users WHERE first_name='${searchQuery}'`);
  
  console.log(users);
  
  res.send(
    `I received your POST request. This is the DB users table: ${users}`,
  );
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

const setup = async() => {
  const db = await dbPromise;
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

setup();