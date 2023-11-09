const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const status = require("../../../functions/status");

router.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.json(status.fill_all_fields);

    const user = new UserController();
    console.log("/auth/login", { body: req.body });
    try {
        const result = await user.login(username, password);
        return res.json(result);
    } catch (e) {
        console.log(e);
        res.json(status.server_error);
    }
});

module.exports = router;
