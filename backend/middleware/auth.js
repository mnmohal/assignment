const { MIDDLEWARE_AUTH_CONSTANTS } = require("../config/constant.js");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../models/user");

function identityManager(allowedRoleArray, allowedScopeObj) {
  return async (req, res, next) => {
    if (!config.get("requiresAuth")) return next();

    let reqUserId = "";
    req.apiId = mongoose.Types.ObjectId();
    req.startTimeMilli = Math.round(new Date());
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).send({ apiId: req.apiId, statusCode: 401, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED } });

    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.jwtData = decoded;

      if (!allowedRoleArray.includes(decoded.role)) {
        return res.status(403).send({ apiId: req.apiId, statusCode: 403, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN } });
      }

      switch (decoded.role) {
        case "user":
          let user = await User.findOne({ _id: mongoose.Types.ObjectId(decoded.userId) });
          if (!user || (user && user.accessToken !== token))
            return res.status(401).send({ apiId: req.apiId, statusCode: 401, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED } });
          req.userData = user;
          console.log("user datat :", req.userData)
          req.reqUserId = decoded.userId;
          let permissions = await User.findOne({ role: req.userData.role });
          if (!permissions) {
            return res.status(403).send({ apiId: req.apiId, statusCode: 403, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN } });
          }
          let isAllowed = checkScope(allowedScopeObj, permissions.permissions);
          if (!isAllowed) {
            return res.status(403).send({ apiId: req.apiId, statusCode: 403, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN } });
          }
          break;
        default:
          return res.status(401).send({ apiId: req.apiId, statusCode: 401, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED } });
          break
      }
      next();
    } catch (ex) {
      console.log(ex)
      res.status(401).send({ apiId: req.apiId, statusCode: 401, message: "Failure", data: { message: MIDDLEWARE_AUTH_CONSTANTS.INVALID_AUTH_TOKEN } });
    }
  }
}

function checkScope(allowedScopeObj, userPermissionObj) {
  console.log(userPermissionObj)
  for (const [key, value] of Object.entries(allowedScopeObj)) {
    let userPermissionValue = userPermissionObj[key];
    console.log("Key: ", key, " userPermissionValue: ", userPermissionValue, " allowedScopeValue: ", value)
    if (!userPermissionValue) {
      return false;
    }
    if (value == "W" && userPermissionValue != "W") {
      return false;
    }
    if (value == "R" && userPermissionValue == "H") {
      return false;
    }
  }
  return true
}

module.exports.identityManager = identityManager;
