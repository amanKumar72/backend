const { getUser } = require("../service/auth");

const restrictUnauthenticated = (req, res, next) => {
  const uid = req.cookies.uid;
  if (!uid) {
    return res.redirect("/signin");
  }
  const user = getUser(uid);
  if (!user) {
    return res.redirect("/signin");
  }
  req.user = user;
  next();
};

module.exports = { restrictUnauthenticated };
