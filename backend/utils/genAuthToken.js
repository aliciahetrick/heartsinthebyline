const JWT = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = JWT.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;
