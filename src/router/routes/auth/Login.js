const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const User = new UserController();
const status = require("../../../functions/status");

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const result = await User.Login(username, password);

    if (result.status == 200) {
      return res.json(result);
    } else {
      const { username, password } = req.body.data;
      const newResult = await User.Login(username, password);
      return res.json(newResult);
    }
  } catch {
    res.json(status.server_error);
  }
});

module.exports = router;
