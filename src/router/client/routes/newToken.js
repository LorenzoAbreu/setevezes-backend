const router = require("express").Router();
const User = require("../../../database/models/User");
const jwt = require("../../../functions/jwt");

router.route("/client/newToken").get(async (req, res) => {
    console.log(req._username);
    const userData = await User.findOne({
        username: req._username,
    }).select("username email approved admin apiKey allowedOrigins");

    const { username, email, approved, admin, apiKey, allowedOrigins } =
        userData;

    const data = {
        username,
        email,
        approved,
        admin,
        apiKey,
        allowedOrigins,
    };

    const newToken = await jwt.sign(data);
    console.log(newToken);

    return res.json({
        status: 200,
        token: newToken,
    });
});

module.exports = router;
