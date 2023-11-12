const router = require("express").Router();

router.all("/", (req, res) => {
    res.json({ port: process.env.PORT });
});

router.use(require("./auth/index"));
router.use(require("./client/index"));
router.use(require("./admin/index"));

router.all("*", (req, res) => {
    res.send({
        status: 404,
    });
});

module.exports = {
    router,
};
