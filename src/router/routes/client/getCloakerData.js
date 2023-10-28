const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const getHostname = require("../../../functions/getHostname");

router.get("/client/getCloakerData", (req, res) => {
    const { key } = req.query;
    const url = req.get("Referer") || req.headers.referer || "";
    const hostname = getHostname(url);
    const user = new UserController();
    user.getCloakerData(key, hostname);
});

module.exports = router;
