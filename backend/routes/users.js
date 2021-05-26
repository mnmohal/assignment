const { USER_CONSTANTS, AUTH_CONSTANTS } = require("../config/constant.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const {
  User,
  validateLogin,
} = require("../models/user");
const { identityManager } = require("../middleware/auth");

mongoose.set("debug", true);

//login
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: error.details[0].message } });

  let criteria = {};
  if (req.body.email && req.body.email != "") criteria.email = req.body.email.toLowerCase();

  let user = await User.findOne(criteria);
  if (!user) {
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: AUTH_CONSTANTS.INVALID_CREDENTIALS } });
  }

  if (user.status != "active")
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: AUTH_CONSTANTS.INACTIVE_ACCOUNT }, status: user.status });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: AUTH_CONSTANTS.INVALID_CREDENTIALS } });

  const token = user.generateAuthToken();
  user.accessToken = token;
  user.deviceToken = req.body.deviceToken;
  if (req.body.deviceToken) await User.updateMany({ deviceToken: req.body.deviceToken, email: { $ne: user.email } }, { $set: { deviceToken: "" } });

  await user.save();
  user.userId = user._id;
  user.role = "user";

  let response = _.pick(user, ["userId", "role", "name", "mobile", "email", "status", "profilePic", "userType", "insertDate"]);
  return res.header("Authorization", token).send({ apiId: req.apiId, statusCode: 200, message: "Success", data: response });
});
//Logout Api
router.put("/logout", identityManager(["user"], {}), async (req, res) => {
  let result;
  if (req.jwtData.role == "user") {
    result = await User.updateOne({ _id: req.jwtData.userId }, { $unset: { accessToken: "", deviceToken: "" } });
  }
  if (result.n) {
    res.status(200).send({ statusCode: 200, status: "Success", data: { message: USER_CONSTANTS.LOGGED_OUT } });
  } else {
    return res.status(400).send({ statusCode: 400, status: "Failure", data: { message: USER_CONSTANTS.INVALID_USER } });
  }
});
module.exports = router;
