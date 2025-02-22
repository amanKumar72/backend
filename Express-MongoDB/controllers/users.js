const Users = require("../models/users");

const getAllUsers = async (req, res) => {
  const users = await Users.find({});
  return res.status(200).json(users);
};

const addUser = async (req, res) => {
  if (
    !req.body ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.mobileNumber ||
    !req.body.email ||
    !req.body.gender
  ) {
    return res.status(400).send("all fields are mandatory");
  }
  const user = await Users.create(req.body);
  return res.status(201).json({ status: "successful", id: user._id });
};

const getUserById = (req, res) => {
  return res.status(200).json(req.user);
};

const updateUserById = async (req, res) => {
  const user = req.user;
  const updated = await Users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        email: req.body.email || user.email,
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        mobileNumber: req.body.mobileNumber || user.mobileNumber,
        gender: req.body.gender || user.gender,
      },
    }
  );
  return res.status(200).json({ message: "user updated" });
};

const deleteUserById = async (req, res) => {
  const deleted = await Users.deleteOne({ _id: req.params.id });
  return res.status(200).json(deleted);
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
