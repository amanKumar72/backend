const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllers/users");
const { findUserById } = require("../middlewares/index");

//Rest api which returns json
router.route("/").get(getAllUsers).post(addUser);

//dynamic route which returns json
router
  .route("/:id")
  .get(findUserById, getUserById)
  .patch(findUserById, updateUserById)
  .delete(findUserById, deleteUserById);

module.exports = router;
