const express = require("express");
const { handleSignUpUser,handleSignInUser } = require("../controllers/user");
const router = express.Router();

router.post("/signup", handleSignUpUser);
router.post("/signin", handleSignInUser);

module.exports = router;