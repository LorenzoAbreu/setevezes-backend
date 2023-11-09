const router = require("express").Router();

router.all("/auth/login", require("./routes/Login"));
router.all("/auth/register", require("./routes/Register"));

module.exports = router;
