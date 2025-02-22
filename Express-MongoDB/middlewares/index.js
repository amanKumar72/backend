const fs = require("fs");
const Users = require("../models/users");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n ${ (new Date(Date.now())).toLocaleString()} => ${req.ip} ${req.method} ${req.url}\n`,
      (err,data) => {
        next();
      }
    );
  };
}

const findUserById = async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).send("User not available");
  req.user = user;
  next();
};

module.exports = {
  logReqRes,
  findUserById,
};
