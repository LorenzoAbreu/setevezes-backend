const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const { isDev } = require("../../index");

async function sign(data) {
    try {
        return await jwt.sign(data, secret, {
            expiresIn: "1h",
        });
    } catch (e) {
        isDev && console.log(e);
        return false;
    }
}

async function verify(token) {
    try {
        return await jwt.verify(token, secret);
    } catch (e) {
        isDev && console.log(e);
        return false;
    }
}

module.exports = {
    sign,
    verify,
};
