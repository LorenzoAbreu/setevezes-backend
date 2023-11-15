const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const AdminController = require("../../../database/controllers/AdminController");

router.route("/admin/users/:id").get(async (req, res) => {
    const { id } = req.params;
    const admin = new AdminController();
    console.log("/admin/users/:id=" + id);

    if (!id) {
        return {
            status: 401,
            error: "ID do usuário não especificado.",
        };
    }

    const userData = await admin.getUserById(id);
    return res.json(userData);
});

router.get("/admin/users", async (req, res) => {
    const user = new UserController();
    const users = await user.getAll();
    return res.json(users);
});

module.exports = router;
