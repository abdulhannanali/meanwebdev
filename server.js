process.env.NODE_ENV = 'development';

var mongoose = require("./config/mongoose");
var express = require("./config/express");
var passport = require("./config/passport");

var db = mongoose();
var app = express();
var passport = passport();

app.listen(9000);


console.log("Sever listening at http://localhost:9000");

module.exports = app;
