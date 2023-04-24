const JWT = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = JWT.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;
