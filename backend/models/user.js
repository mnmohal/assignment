const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserSchema = new mongoose.Schema({
  userType: { type: String, enum: ["app", "facebook", "google", "apple"] },
  name: { type: String, default: "" },
  mobile: { type: String, default: "", required: true, unique: true },
  email: { type: String, default: "-", required: true },
  password: { type: String, default: "" },
  deviceToken: { type: String, default: "" },
  facebookId: { type: String, default: "" },
  googleId: { type: String, default: "" },
  appleId: { type: String, default: "" },
  accessToken: { type: String, default: "" },
  status: { type: String, enum: ["active", "inactive", "blocked", "suspended"] },
  profilePic: { type: String, default: "" },
  totalBooking: { type: Number, default: 0 },
  setting: { type: Object },
  creationDate: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  insertDate: {
    type: Number,
    default: () => {
      return Math.round(new Date() / 1000);
    },
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      role: "user",
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
UserSchema.index({ locationPoint: "2dsphere" });
UserSchema.index({ userType: 1, email: 1 }, { unique: true });
const User = mongoose.model("User", UserSchema);

function validateLogin(admin) {
  const schema = {
    email: Joi.string().min(8).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
      .error(() => {
        return { message: "Password length must be at least 8 characters long" };
      }),
    deviceToken: Joi.string().min(1).max(200),
  };

  return Joi.validate(admin, schema);
}

function userProjection() {
  return {
    _id: 0,
    userId: "$_id",
    name: 1,
    email: 1,
    mobile: 1,
    status: 1,
    profilePic: 1,
    userType: 1,
    totalBookings: 1,
    insertDate: 1,
  };
}

module.exports.User = User;
module.exports.validateLogin = validateLogin;
module.exports.userProjection = userProjection;