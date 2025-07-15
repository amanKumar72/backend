const User = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { setUser, generateToken } = require("../service/auth");

const handleSignUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({email});
    console.log(existingUser);
    if(existingUser){
        throw new Error("User already exists with this email address!Sign in instead!")
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.redirect("/signin");
    }
  } catch (error) {
    res.render("signup", { error:error || "Something went wrong while signing up. Please try again later!" });
  }
};

const handleSignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const token = generateToken(user._id, email);
    res.cookie("token", token);
    res.cookie("id", user._id);
    return res.redirect("/home");
  } catch (error) {
    res.render("signin", { error });
  }
  //   let sessionId = uuidV4();
  //   setUser(sessionId, user);
};

module.exports = { handleSignUpUser, handleSignInUser };
