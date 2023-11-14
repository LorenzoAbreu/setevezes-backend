const router = require("express").Router();
const UserAuthentication = require("../../middlewares/UserAuthentication");
const ApikeyAuthentication = require("../../middlewares/ApikeyAuthentication");

router.all("/client/fakes", UserAuthentication, require("./routes/Fakes"));
router.all("/client/fakes/:id", UserAuthentication, require("./routes/Fakes"));
router.all("/client/origins", UserAuthentication, require("./routes/Origins"));
router.all(
    "/client/origins/:id",
    UserAuthentication,
    require("./routes/Origins")
);
router.all("/client/me", UserAuthentication, require("./routes/Me"));
router.all("/client/me/fakes", UserAuthentication, require("./routes/Me"));
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

module.exports = router;
