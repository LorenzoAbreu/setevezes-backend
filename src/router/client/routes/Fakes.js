const router = require("express").Router();
const FakeController = require("../../../database/controllers/FakeController");

router
    .route("/client/fakes")
    .post(async (req, res) => {
        const {} = req.body;
    })
    .get(async (req, res) => {
        const fake = new FakeController();
        return res.json(await fake.getAll());
    });

module.exports = router;
