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
    .put(async (req, res) => {
        const { url, title, options } = req.body;
        const origin = new OriginController();

        if (!url || !title || !options) return res.json(status.fill_all_fields);

        const result = await origin.edit(
            req._username,
            id,
            title,
            url,
            options
        );
        return res.json(result);
    });

router.route("/client/origins/:id").delete(async (req, res) => {
    const { id } = req.params;
    const origin = new OriginController();

    const request = await origin.delete(req._username, id);
    return res.json(request);
});

module.exports = router;
