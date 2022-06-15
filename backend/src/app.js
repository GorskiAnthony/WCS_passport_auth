require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const passport = require("passport");

const config = require("./passport/config");
const authRouter = require("./routes/authRouter");

app.use(logger("dev"));

app.use(passport.initialize());

app.use("/auth", authRouter);

/**
 * Nous allons faire une route 404 qui renvoie une erreur 404
 */
app.use("/*", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

module.exports = app;
