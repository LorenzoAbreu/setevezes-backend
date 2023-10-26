const User = require("../../models/User");
const status = require("../../../functions/status");

module.exports = async (owner, url) => {
  const userData = await User.findOne({
    username: owner,
  });

  console.log("URL: " + url);

  if (!userData) {
    return status.user_not_found;
  }

  let allowedOrigins = userData.allowedOrigins || [];
  const checkOrigin = allowedOrigins.find((o) => o.url === url);

  if (!checkOrigin) {
    console.log("Origem não encontrado");
    return status.server_error;
  }

  allowedOrigins = allowedOrigins.filter((o) => o.url !== url);

  const result = await User.updateOne(
    {
      username: owner,
    },
    {
      allowedOrigins,
    }
  );

  if (result.modifiedCount > 0) {
    return {
      status: 200,
      message: "Origem deletada com sucesso!",
      db: result,
      newAllowedOrigins: allowedOrigins,
    };
  } else {
    console.log(result);
    return status.server_error;
  }
};
