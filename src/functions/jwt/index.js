const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const { isDev } = require("../../../index");

module.exports = {
  sign: async (data) => {
    try {
      return await jwt.sign(data, secret, {
        expiresIn: "1h",
      });
    } catch (e) {
      isDev && console.log(e);
      return false;
    }
  },
  verify: async (token) => {
    try {
      return await jwt.verify(token, secret);
    } catch (e) {
      isDev && console.log(e);
      return false;
    }
  },
};
