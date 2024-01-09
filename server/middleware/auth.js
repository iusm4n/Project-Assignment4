const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");
async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token Not Provided");
  try {
    let decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findOne({username: decodedToken.username});
  } catch (err) {
    return res.status(401).send(`Invalid Token , ${err.message}`);
  }
  next();
}
module.exports = auth;
