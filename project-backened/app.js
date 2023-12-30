const express = require("express");
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
var usersRouter = require('./routes/api/users');
const config = require('config');

var app = express();
app.use(bodyparser.json());

const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };
  app.use(allowCrossDomain);
  app.get('/',function(req,res) {
    res.send("My home page");
  });

  //setting api users
  app.use('/api/users', usersRouter);

mongoose
  .connect(config.get('db'))
  .then(() => console.log("Connected to Mongo..."))
  .catch((error) => console.log("mongo disconnected")); 
port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});