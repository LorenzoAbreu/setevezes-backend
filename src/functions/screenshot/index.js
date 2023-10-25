const path = require("path");
const fs = require("fs");
const axios = require("axios");

module.exports = async (url) => {
  let formatedUrl = new URL(url).origin.replace(/^(https?:\/\/)/, "");
  const fileName =
    formatedUrl + "_" + Math.floor(Math.random() * 99999) + ".png";
  const filePath = path.join(__dirname, "screenshots", fileName);

  const response = await axios({
    method: "post",
    url: `https://api.apiflash.com/v1/urltoimage?access_key=889741cbb58048c8bb396f3ac6e481c1&wait_until=page_loaded&url=${url}`,
    responseType: "arraybuffer", // to handle binary data
  });

  const data = response.data;

  // Write the image data to a file
  fs.writeFileSync(filePath, data);

  // Now you can read the image and convert it to base64 if needed
  const image = fs.readFileSync(filePath).toString("base64");

  try {
    if (image.length > 5) {
      return { fileName, filePath };
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
