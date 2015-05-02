process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require("./config/mongoose");
var express = require("./config/express");

var db = mongoose();

var app = express();
app.listen(9000);


console.log("Sever listening at http://localhost:9000");

module.exports = app;
