const User = require("../../database/models/User");
const screenshot = require("../../functions/screenshot");
const status = require("../../functions/status");
const isOnline = require("is-reachable");
const validUrl = require("valid-url");
const fs = require("fs");

const uploadImage = require("../../functions/aws/uploadImage");

module.exports = class OriginController {
  async GetAll(owner) {
    const userData = await User.findOne({
      username: owner,
    });

    if (!owner || !userData) {
      return status.user_not_found;
    }

    console.log(userData);
    return userData.allowedOrigins;
  }

  async Edit(owner, title, url, status) {
    const userData = await User.findOne({
      username: owner,
    });

    if (!owner || !userData) {
      return status.user_not_found;
    }

    if (!title || !url) {
      return status.fill_all_fields;
    }

    let formatedUrl = new URL(url).origin.replace(/^(https?:\/\/)/, "");

    let allowedOrigins = userData.allowedOrigins || [];

    const checkTitle = allowedOrigins.find((o) => o.title === title);
    const checkUrl = allowedOrigins.find((o) => o.url === formatedUrl);

    if (checkTitle) return status.sitename_already_been_used_by_you;

    if (checkUrl) return status.url_already_been_created;

    const newAllowedOrigins = [
      ...allowedOrigins,
      { title, url: formatedUrl, status },
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
        message: "Origem editada com sucesso!",
        db: result,
      };
    } else return status.server_error;
  }

  async Create(owner, title, url) {
    const userData = await User.findOne({
      username: owner,
    });

    if (!userData) {
      return status.user_not_found;
    }

    if (!title || !url) {
      return status.fill_all_fields;
    }

    if (url.length < 4) {
      return {
        status: status.invalid_email.status,
        error: "URL inválida!",
      };
    }

    let formatedUrl;

    try {
      formatedUrl = new URL(url).origin.replace(/^(https?:\/\/)/, "");
    } catch {
      return {
        status: status.invalid_email.status,
        error: "URL inválida!",
      };
    }

    const checkUrlStatus = await isOnline(formatedUrl);
    if (!checkUrlStatus) {
      return {
        status: status.invalid_email.status,
        error: "URL indisponível!",
      };
    }

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

    const printUrl = await uploadImage(print.filePath, print.fileName);

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
      { title, url, baseUrl: formatedUrl, status: true, screenshot: printUrl },
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
  }
};
