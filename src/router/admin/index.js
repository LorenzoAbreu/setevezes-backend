const router = require("express").Router();
const AdminAuthentication = require("../../middlewares/AdminAuthentication");

router.all(
    "/admin/users/:id",
    AdminAuthentication,
    require("./routes/Users.js")
);
router.all("/admin/users", AdminAuthentication, require("./routes/Users.js"));

module.exports = router;
