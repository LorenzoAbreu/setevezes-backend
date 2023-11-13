const router = require("express").Router();
const OriginController = require("../../../database/controllers/OriginController");
const status = require("../../../functions/status");
const json = require("../../../functions/json");

router
    .route("/client/origins")
    .get(async (req, res) => {
        const origin = new OriginController();
        const result = await origin.getAll(req._username);
        return res.json(result);
    })
    .post(async (req, res) => {
        const { url, title, options } = req.body;
        const origin = new OriginController();

        if (!url || !title || !options) return res.json(status.fill_all_fields);

        const result = await origin.create(req._username, title, url, options);
        return res.json(result);
    })
    .put((req, res) => {})
    .delete((req, res) => {});

module.exports = router;
