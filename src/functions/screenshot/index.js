const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

module.exports = async (url) => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: path.join(__dirname, "src", "chromedriver.exe"),
  });
  const page = await browser.newPage();

  await page.goto(url);

  let formatedUrl = new URL(url).origin.replace(/^(https?:\/\/)/, "");
  const fileName =
    formatedUrl + "_" + Math.floor(Math.random() * 99999) + ".png";

  const filePath = path.join(__dirname, "screenshots", fileName);

  try {
    await page.screenshot({
      path: filePath,
    });
  } catch {
    return false;
  }

  await browser.close();

  const image = await fs.readFileSync(filePath).toString("base64");

  // try {
  //   fs.unlinkSync(filePath);
  // } catch {}

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
