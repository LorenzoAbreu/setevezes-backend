const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports = {
  sign: async (data) => {
    try {
      return await jwt.sign(data, secret, {
        expiresIn: "1h",
      });
    } catch {
      return false;
    }
  },
  verify: async (token) => {
    try {
      return await jwt.verify(token, secret);
    } catch {
      return false;
    }
  },
};
