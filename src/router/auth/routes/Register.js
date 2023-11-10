const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const status = require("../../../functions/status");
const User = new UserController();

router.post("/auth/register", async (req, res) => {
    const { username, email, password } = req.body;

    console.log("/auth/register");

    if (!username || !email || !password) {
        console.log(status.fill_all_fields);
        return res.json(status.fill_all_fields);
    }

    try {
        const result = await User.create(username, email, password);
        console.log(result);

        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.json({
            status: 500,
            error: "Erro no servidor!",
        });
    }
});

module.exports = router;
