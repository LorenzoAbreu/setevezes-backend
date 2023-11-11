const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const status = require("../../../functions/status");

router.post("/auth/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = new UserController();

    console.log("/auth/register");

    if (!username || !email || !password) {
        console.log(status.fill_all_fields);
        return res.json(status.fill_all_fields);
    }

    console.log("/auth/register", { body: req.body });
    try {
        const result = await user.create(username, email, password);
        console.log(result);
        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.json(status.server_error);
    }
});

module.exports = router;
