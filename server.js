// var _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');


var passport = require("passport");

var app = express();
app.use(morgan('dev'));
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())

const db = require("./models");
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(
process.env.MONGODB_URI || "mongodb://localhost/intweet_db");

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});