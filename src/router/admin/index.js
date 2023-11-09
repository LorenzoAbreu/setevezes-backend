const router = require("express").Router();
const AuthController = require("../../database/controllers/AuthController");
const auth = new AuthController();
const UserAuthentication = require("../../middlewares/UserAuthentication");
const ApikeyAuthentication = require("../../middlewares/ApikeyAuthentication");
const AdminAuthentication = require("../../middlewares/AdminAuthentication");

router.all("/", (req, res) => {
    res.send("Oi");
});

const importRoute = (FileName) => {
    let fileName = FileName;

    if (fileName.startsWith("/")) {
        fileName = fileName.replace("/", "");
    }

    fileName = fileName.replace(".js", "");

    return require("./routes/" + fileName + ".js");
};

router.all(
    "/admin/users/:username",
    AdminAuthentication,
    importRoute("Users.js")
);

module.exports = router;
