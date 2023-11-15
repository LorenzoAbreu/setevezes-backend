const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const status = require("../../../functions/status");

router.post("/auth/login", async (req, res) => {
    const { username, password, userIp } = req.body;
    const user = new UserController();

    console.log("/auth/login");

    if (!username || !password) {
        console.log(status.fill_all_fields, { body: req.body });
        return res.json(status.fill_all_fields);
    }

    if (!userIp) {
        console.log("!userIp");
        return res.json({
            status: 403,
            error: "Não foi possível verificar sua identidade, por favor tente novamente mais tarde.",
        });
    }

    console.log("/auth/login", { body: req.body });
    try {
        const result = await user.login(username, password, userIp);
        console.log(result);
        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.json(status.server_error);
    }
});

module.exports = router;
