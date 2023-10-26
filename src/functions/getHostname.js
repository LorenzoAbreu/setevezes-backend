module.exports = (url) => {
  try {
    let hostname = new URL(url).origin.replace(/^(https?:\/\/)/, "");
    return hostname;
  } catch {
    return false;
  }
};
