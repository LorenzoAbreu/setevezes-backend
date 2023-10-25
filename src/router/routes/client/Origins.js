const router = require("express").Router();
const OriginController = require("../../../database/controllers/OriginController");
const status = require("../../../functions/status");
const Origin = new OriginController();

router
  .route("/client/origins")
  .get(async (req, res) => {
    try {
      console.log(req._username);
      const result = await Origin.GetAll(req._username);
      return res.json({
        status: 200,
        data: result || [],
      });
    } catch {
      return res.json(status.server_error);
    }
  })
  .post(async (req, res) => {
    const { title, url } = req.body;

    console.log(req.body);

    if (!req._username) return res.json(status.user_not_found);

    Origin.Create(req._username, title, url)
      .then((result) => {
        return res.json(result);
      })
      .catch((e) => {
        console.log("ERRO:", e);
        return res.json(status.server_error);
      });
  })
  .put((req, res) => {})
  .delete((req, res) => {
    const { url } = req.query;
    const username = req._username;

    console.log(req.query);

    Origin.Delete(username, url)
      .then((r) => {
        console.log(r);
        return res.json(r);
      })
      .catch((e) => {
        console.log(e);
        return res.json(status.server_error);
      });
  });

module.exports = router;
