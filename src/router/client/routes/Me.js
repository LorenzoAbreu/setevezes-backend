const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const User = require("../../../database/models/User");
const jwt = require("../../../functions/jwt");

router.get("/client/me/fakes", async (req, res) => {
    const user = new UserController();
    const result = await user.getMyFakes();
    return res.json(result);
});

router.route("/client/me").get(async (req, res) => {
    const userData = await User.findOne({
        username: req._username,
    }).select("username email approved admin apiKey -_id");

    console.log(userData);

    return res.json({
        status: 200,
        token: await jwt.sign({
            username: userData.user,
            email: userData.email,
            approved: userData.approved,
            admin: userData.admin,
            apiKey: userData.apiKey,
        }),
        userData,
    });
});

module.exports = router;
