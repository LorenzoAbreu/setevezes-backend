const router = require("express").Router();
const User = require("../../../database/models/User");

router.route("/client/me").get(async (req, res) => {
  console.log(req._username);
  const userData = await User.findOne({
    username: req._username,
  }).select("username email approved admin apiKey allowedOrigins");

  console.log(userData);

  return res.json({
    status: 200,
    userData,
  });
});

module.exports = router;
