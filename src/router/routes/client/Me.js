const router = require("express").Router();
const User = require("../../../database/models/User");

router.route("/client/me").get(async (req, res) => {
    const userData = await User.findOne({
        username: req._username,
    }).select("username email approved admin apiKey allowedOrigins -_id");

    console.log(userData);

    return res.json({
        status: 200,
        userData,
    });
});

module.exports = router;
