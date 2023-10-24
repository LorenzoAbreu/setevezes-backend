const { s3 } = require(".");
const fs = require("fs");

async function uploadImage(filePath, fileName) {
  return new Promise(async (resolve, reject) => {
    // Key: `${Math.floor(
    //   Math.random() * 999999999
    // )}_${file.originalname.replace(fileExt, "")}_${fileExt}`.replaceAll(
    //   " ",
    //   "_"
    // ),

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: await fs.readFileSync(filePath),
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Erro ao fazer upload para o Amazon S3:", err);
        reject(err); // Rejeita a promise em caso de erro
      } else {
        console.log("Upload para o Amazon S3 realizado com sucesso:", data);
        resolve(data.Location); // Resolve a promise com os dados em caso de sucesso
      }
    });
  });
}

module.exports = uploadImage;
