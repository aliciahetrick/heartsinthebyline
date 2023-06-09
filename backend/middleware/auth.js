const jwt = require("jsonwebtoken");

// checks to see if a user / token is valid
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access denied, not authenticated");
  }
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const user = jwt.verify(token, secretKey);

    req.user = user;

    next();
  } catch (ex) {
    return res.status(400).send("Access denied, invalid auth token");
  }
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("Access denied, not authorized");
    }
  });
};

module.exports = { auth, isAdmin };
