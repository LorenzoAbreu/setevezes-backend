const axios = require("axios");

module.exports = async (url) => {
  let formatedUrl = new URL(url).origin.replace(/^(https?:\/\/)/, "");
  const fileName =
    formatedUrl + "_" + Math.floor(Math.random() * 99999) + ".png";

  const response = await axios({
    method: "post",
    url: `https://api.apiflash.com/v1/urltoimage?access_key=889741cbb58048c8bb396f3ac6e481c1&wait_until=page_loaded&url=${url}`,
    responseType: "arraybuffer", // to handle binary data
  });

  const data = response.data;

  return { image: data, name: fileName };
};
