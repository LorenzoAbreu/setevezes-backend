const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");

router.get("/admin/users", async (req, res) => {
    const user = new UserController();
    const users = await user.getAll();
    return res.json(users);
});

module.exports = router;
