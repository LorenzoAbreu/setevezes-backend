const router = require("express").Router();
const VictimController = require("../../../database/controllers/VictimController");
const victim = new VictimController();
const AuthController = require("../../../database/controllers/AuthController");
const Auth = new AuthController();
const status = require("../../../functions/status");

router
  .route("/client/victims")
  .post(async (req, res) => {
    const body = req.body;

    try {
      const result = await victim.Create(req._username, body);
      res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(status.server_error);
    }
  })
  .get(async (req, res) => {
    try {
      const result = await victim.GetAll(req._username);
      res.json(result);
    } catch {
      return res.json(status.server_error);
    }
  });

module.exports = router;
