const express = require("express");
const app = express();
const logger = require("morgan");

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
