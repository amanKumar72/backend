const { getUser, verifyToken } = require("../service/auth");

const restrictUnauthenticated = (req, res, next) => {
  //   const uid = req.cookies.uid;
  //   if (!uid) {
  //     return res.redirect("/signin");
  //   }

  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/signin");
  }

  //   const user = getUser(uid);

  const user = verifyToken(token);
  if (!user) {
    return res.redirect("/signin");
  }

  //   req.user = user;
  next();
};

module.exports = { restrictUnauthenticated };
