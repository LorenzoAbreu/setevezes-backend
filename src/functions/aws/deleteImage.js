const { s3 } = require(".");

function extractKeyFromUrl(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
}

function deleteImage(url) {
  if (!url.includes("http")) {
    console.log("deleteImaeg: url invalida");
    return;
  }
  const key = extractKeyFromUrl(url);
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET, // Substitua pelo nome do seu bucket no S3
      Key: key,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error("Erro ao excluir imagem do Amazon S3:", err);
        reject(err); // Rejeita a promise em caso de erro
      } else {
        console.log("Imagem excluída do Amazon S3 com sucesso:", data);
        resolve(data); // Resolve a promise com os dados em caso de sucesso
      }
    });
  });
}

module.exports = deleteImage;
