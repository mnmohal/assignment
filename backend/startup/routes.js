const express = require("express");
const users = require("../routes/users");
const reqLogger = require("../startup/logger");
const error = require("../middleware/error");
const { connection } = require("mongoose");

module.exports = function (app) {
  app.use(express.json());
  app.use(reqLogger);
  app.use("/api/user", users);
  app.use(error);
};
