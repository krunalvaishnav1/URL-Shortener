const { getUser } = require("../services/auth");

async function restrictToUsrLoggin(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/signup");
  const user = await getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = await getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToUsrLoggin,
  checkAuth,
};
