const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const getHostname = require("../../../functions/getHostname");

router.get("/client/getCloakerData", async (req, res) => {
    const { key } = req.query;
    const url = req.get("Referer") || req.headers.referer || "";
    const hostname = getHostname(url);
    const user = new UserController();
    const cloakerData = await user.getCloakerData(key, hostname);
    res.json(cloakerData);
});

module.exports = router;
