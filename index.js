require("dotenv").config();

const isDev = process.argv.includes("--dev") ? true : false;

console.log("É DEV?", isDev);

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const { connect } = require("./src/database/mongoose");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(require("./src/router/index"));

connect.then(() => {
  console.log("Banco de dados conectado com sucesso!");

  app.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log("Rodando na porta", port);
  });
});

module.exports = {
  isDev,
};
