const isOnline = require("is-reachable");
const validUrl = require("valid-url");
const status = require("./status");
const getHostname = require("./getHostname");

module.exports = async (url) => {
  if (url.length < 4) {
    return {
      status: status.invalid_email.status,
      error: "URL inválida!",
    };
  }

  let hostname = getHostname(url);

  if (!hostname) {
    return {
      status: status.invalid_email.status,
      error: "URL inválida!",
    };
  }

  const checkUrlStatus = await isOnline(url);
  if (!checkUrlStatus) {
    return {
      status: status.invalid_email.status,
      error: "URL indisponível!",
    };
  }

  return true;
};
