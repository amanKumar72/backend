const jwt = require("jsonwebtoken");
const secret = "hello@sf%csdh&";

const sessionIdMap = new Map();

const getUser = (id) => {
  return sessionIdMap.get(id);
};

const setUser = (id, user) => {
  sessionIdMap.set(id, user);
};

const generateToken = (id, email) => {
  try {
    return jwt.sign({ id, email }, secret);
  } catch (err) {
    return null;
  }
};

const verifyToken = (token) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = { setUser, getUser, generateToken, verifyToken };
