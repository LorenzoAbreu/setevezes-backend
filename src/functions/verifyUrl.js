const isOnline = require("is-reachable");
const validUrl = require("valid-url");
const status = require("./status");
const getHostname = require("./getHostname");

module.exports = async (url) => {
  const error = () => {
    return {
      status: status.invalid_email.status,
      error: "URL inválida!",
    };
  };

  try {
    if (url.length < 4) return error();
  } catch {
    return error();
  }

  let hostname = getHostname(url);

  if (!hostname) return error();

  let checkUrlString;

  try {
    checkUrlString = await validUrl.isUri(url);
    if (!checkUrlString) {
      console.log("!validUrl");
      return error();
    }
  } catch (e) {
    console.log(e);
    return error();
  }

  let checkUrlStatus;

  try {
    checkUrlStatus = await isOnline(url);
    if (!checkUrlStatus) {
      console.log("!isOnline");
      return error();
    }
  } catch (e) {
    console.log(e);
    return error();
  }

  return true;
};
