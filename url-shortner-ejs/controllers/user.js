const User = require("../models/user");
const {v4:uuidV4} =require('uuid')
const {setUser} =require('../service/auth')

const handleSignUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  if (user) {
    res.redirect("/home");
  }
};

const handleSignInUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("signin", { error: "Invalid user email or password" });
  }
  let sessionId = uuidV4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/home");
};

module.exports = { handleSignUpUser, handleSignInUser };