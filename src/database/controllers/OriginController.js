const User = require("../../database/models/User");
const status = require("../../functions/status");

module.exports = class OriginController {
  async GetAll(owner) {
    const userData = await User.find({
      username: owner,
    });

    if (!owner || !userData) {
      return status.user_not_found;
    }

    return userData.allowedOrigins;
  }

  async Edit(owner, title, url) {
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

    const newAllowedOrigins = [...allowedOrigins, { title, url: formatedUrl }];

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

    let formatedUrl = new URL(url).origin.replace(/^(https?:\/\/)/, "");

    let allowedOrigins = userData.allowedOrigins || [];

    const checkTitle = allowedOrigins.find((o) => o.title === title);
    const checkUrl = allowedOrigins.find((o) => o.url === formatedUrl);

    if (checkTitle) return status.sitename_already_been_used_by_you;

    if (checkUrl) return status.url_already_been_created;

    const newAllowedOrigins = [...allowedOrigins, { title, url: formatedUrl }];

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
