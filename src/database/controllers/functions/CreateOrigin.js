const verifyUrl = require("../../../functions/verifyUrl");
const status = require("../../../functions/status");
const User = require("../../models/User");
const screenshot = require("../../../functions/screenshot");
const getHostname = require("../../../functions/getHostname");

const uploadImage = require("../../../functions/aws/uploadImage");

module.exports = async (owner, title, url, options) => {
  const userData = await User.findOne({
    username: owner,
  });

  if (!userData) {
    return status.user_not_found;
  }

  if (!title || !url) {
    return status.fill_all_fields;
  }

  const urlStatus = await verifyUrl(url);

  if (urlStatus !== true) {
    return urlStatus;
  }

  let hostname = getHostname(url);

  let allowedOrigins = userData.allowedOrigins || [];

  const checkTitle = allowedOrigins.find((o) => o.title === title);
  if (checkTitle) return status.sitename_already_been_used_by_you;

  const checkUrl = allowedOrigins.find((o) => o.url === url);
  if (checkUrl) return status.url_already_been_created;

  const print = await screenshot(url);

  if (!print) {
    console.log("Erro na print");
    return status.server_error;
  }

  const printUrl = await uploadImage(print.image, print.name);

  try {
    fs.unlinkSync(print.filePath);
  } catch {
    console.log("Erro ao deletar print");
  }

  if (!printUrl) {
    console.log("!printUrl");
    return status.server_error;
  }

  const newAllowedOrigins = [
    ...allowedOrigins,
    { title, url, hostname, status: true, screenshot: printUrl, options },
  ];

  const result = await User.updateOne(
    {
      username: owner,
    },
    {
      allowedOrigins: newAllowedOrigins,
    }
  );

  if (result.modifiedCount > 0) {
    return {
      status: 200,
      message: "Origem criada com sucesso!",
      db: result,
    };
  } else return status.server_error;
};
