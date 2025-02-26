const User = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { setUser, generateToken } = require("../service/auth");

const handleSignUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  if (user) {
    res.redirect("/signin");
  }
};

const handleSignInUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("signin", { error: "Invalid user email or password" });
  }
  //   let sessionId = uuidV4();
  //   setUser(sessionId, user);

  const token = generateToken(user._id, email);
  res.cookie('token',token);
  res.cookie('id',user._id);
  return res.redirect("/home");
};

module.exports = { handleSignUpUser, handleSignInUser };
