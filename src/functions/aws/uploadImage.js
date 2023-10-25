const { s3 } = require(".");

async function uploadImage(image, name) {
  return new Promise(async (resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: name,
      Body: image,
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
