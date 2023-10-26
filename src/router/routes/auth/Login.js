const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const User = new UserController();
const status = require("../../../functions/status");

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const result = await User.Login(username, password);

    return res.json(result);
  } catch (e) {
    console.log(e);
    res.json(status.server_error);
  }
});

module.exports = router;
