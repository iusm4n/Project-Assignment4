const express = require("express");
let router = express.Router();
let { User } = require("../../models/user");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/signup", async (req, res) => {
  let oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) return res.status(400).send("User with given Email already exists");

  let existingUsername = await User.findOne({ username: req.body.username });
  if (existingUsername) return res.status(400).send("Username already used");

  const { name, username, email, phone, dob, Gender , password } = req.body;
  let user = new User({
    name,
    username,
    email,
    phone,
    dob,
    Gender,
    password
  });
  await user.generateHashedPassword();
  await user.save();
  res.status(200).json(_.pick(user, ["name", "email", "username", "phone", "dob", "registeredDate"]));
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign({ username: user.username }, config.get("jwtPrivateKey"));
  user.token = token;
  await user.save();

  res.send({ message: "Login Successfull", username: user.username, Token: user.token });
});


router.post("/forgetpassword", async (req, res) => {
  let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
  if (!user) return res.status(400).send("User Not Registered");
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  res.send("Password reset successfully");
});

router.get("/getprofile/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send("User not found");
  res.send(_.pick(user, ["name", "email", "username", "phone", "dob", "Gender" ,"registeredDate", "token"]));
});

router.put("/updateprofile/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.dob = req.body.dob || user.dob;
  if (req.body.username) {
    let existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).send("Username already used");
    }
    user.username = req.body.username;
  }
  await user.save();
  res.send(_.pick(user, ["name", "email", "username", "phone", "dob", "Gender" , "registeredDate", "token"]));
});

router.post("/card/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send("User not found");
  if (user.card.includes(req.body.card)) {
    return res.send({ message: "Book already added to card" });
  }
  user.card.push(req.body.card);
  await user.save();
  res.send({ message: "Book added to card successfully" });
});

router.get("/card/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send("User not found");
  res.send(user.card);
});
router.get("/publishedbooks/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send("User not found");
  res.send(user.publishedbooks);
});

router.post("/publishedbooks/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).send("User not found");
  user.publishedbooks.push(req.body.publishedbooks);
  await user.save();
  res.send({ message: "Book published successfully" });
});
module.exports = router;
