const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const status = require("../../../functions/status");

router.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const user = new UserController();

    console.log("/auth/login");

    if (!username || !password) {
        console.log(status.fill_all_fields, { body: req.body });
        return res.json(status.fill_all_fields);
    }

    console.log("/auth/login", { body: req.body });
    try {
        const result = await user.login(username, password);
        console.log(result);
        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.json(status.server_error);
    }
});

module.exports = router;
