// var _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

var passport = require("passport");

var app = express();
app.use(morgan('dev')); // log every request to the console
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())
app.use(routes);


app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});