const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const PhoneNumber = require('libphonenumber-js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: null
  },
  Gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
    default: "Male",
  },
  dob: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date().now,
  },
  token: {
    type: String,
    default: null
  },
  card: {
    type: [String],
    default: []
  },
  publishedbooks: {
    type: [String],
    default: []
  }
}, { collection: 'authusers', versionKey: false });

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

var User = mongoose.model("User", userSchema);

module.exports.User = User;