const router = require("express").Router();
const FakeController = require("../../../database/controllers/FakeController");

router
    .route("/client/fakes")
    .post(async (req, res) => {
        const { id, options } = req.body;
        const fake = new FakeController();
        console.log(req.body);
        const result = await fake.registerUser(req._username, id, options);
        return res.json(result);
    })
    .get(async (req, res) => {
        const fake = new FakeController();
        return res.json(await fake.getAll());
    });

module.exports = router;
