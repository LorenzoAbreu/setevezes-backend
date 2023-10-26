const verifyUrl = require("../../../functions/verifyUrl");
const status = require("../../../functions/status");
const User = require("../../models/User");
const screenshot = require("../../../functions/screenshot");
const getHostname = require("../../../functions/getHostname");

const uploadImage = require("../../../functions/aws/uploadImage");
const deleteImage = require("../../../functions/aws/deleteImage");

module.exports = async (owner, url, title, newUrl, options) => {
  const userData = await User.findOne({
    username: owner,
  });

  if (!userData) {
    return status.user_not_found;
  }

  if (!title || !url) {
    return status.fill_all_fields;
  }

  let allowedOrigins = userData.allowedOrigins || [];

  const checkOrigin = allowedOrigins.find((o) => o.url === url);

  if (!checkOrigin)
    return {
      status: 404,
      error: "Origem não encontrada!",
    };

  const urlStatus = await verifyUrl(url);

  if (urlStatus !== true) {
    return urlStatus;
  }

  let hostname = new URL(url).origin.replace(/^(https?:\/\/)/, "");
  let printUrl = checkOrigin.screenshot;

  if (title != checkOrigin.title) {
    const checkTitle = allowedOrigins.find((o) => o.title === title);
    if (checkTitle && checkTitle.title != checkOrigin.title)
      return status.sitename_already_been_used_by_you;
  }

  if (url != newUrl) {
    console.log("é diferente!");
    const checkUrl = allowedOrigins.find((o) => o.url === newUrl);
    if (checkUrl) return status.url_already_been_created;

    const print = await screenshot(newUrl);

    if (!print) {
      console.log("Erro na print");
      return status.server_error;
    }

    printUrl = await uploadImage(print.image, print.name);

    if (!printUrl) {
      console.log("!printUrl");
      return status.server_error;
    }

    await deleteImage(checkOrigin.screenshot);
  }

  allowedOrigins = allowedOrigins.filter((o) => o.url !== url);

  const newAllowedOrigins = [
    ...allowedOrigins,
    {
      title,
      url: newUrl,
      hostname,
      status: true,
      screenshot: printUrl,
      options,
    },
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
