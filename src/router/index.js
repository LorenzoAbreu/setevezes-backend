const router = require("express").Router();

router.all("/", (req, res) => {
    res.json({ port: process.env.PORT });
});

router.use(require("./auth/index"));
router.use(require("./client/index"));
router.use(require("./admin/index"));

function importRoute(FileName) {
    let fileName = FileName;

    if (fileName.startsWith("/")) {
        fileName = fileName.replace("/", "");
    }

    fileName = fileName.replace(".js", "");

    return require("./routes/" + fileName + ".js");
}

module.exports = {
    router,
    importRoute,
};
