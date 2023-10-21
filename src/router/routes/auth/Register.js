const router = require("express").Router();
const UserController = require("../../../database/controllers/UserController");
const User = new UserController();

router.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await User.Create(username, email, password);
    console.log(result);

    if (result.status == 20) {
      res.json(result);
    } else {
      const { username, email, password } = req.body.data;
      const newResult = await User.Create(username, email, password);
      res.json(newResult);
    }
  } catch {
    res.json({
      status: 500,
      error: "Erro no servidor!",
    });
  }
});

module.exports = router;
