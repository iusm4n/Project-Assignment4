const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('config');
const authenticateUserRouter = require("./routes/api/users");
const booksRouter = require('./routes/api/books');

const app = express();
app.use(bodyParser.json());

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

app.get('/', (req, res) => {
  res.send("WELCOME TO THE LIBRARY API");
});

app.use('/api/users', authenticateUserRouter);
app.use('/api/books', booksRouter);

mongoose
  .connect(config.get('db'))
  .then(() => console.log("Connected to Mongo..."))
  .catch((error) => console.log("Mongo disconnected"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
