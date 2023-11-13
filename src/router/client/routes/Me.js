const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const User = require("../../../database/models/User");

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
        userData,
    });
});

module.exports = router;
