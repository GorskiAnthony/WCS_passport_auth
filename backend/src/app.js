require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");

const config = require("./passport/config");
const authRouter = require("./routes/authRouter");

const { SECRET_KEY } = process.env;

app.use(logger("dev"));

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
