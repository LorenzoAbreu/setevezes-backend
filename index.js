require("dotenv").config();

const isDev = process.argv.includes("--dev") ? true : false;

console.log("É DEV?", isDev);

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const { connect } = require("./src/database/mongoose");
const { options } = require("./src/router/index");

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

var swaggerDefinition = {
  info: {
    title: "7API",
    version: "1.0.0",
    description: "Ez 7",
  },
  components: {
    schemas: require("./schemas.json"),
  },
};

var swaggerOptions = {
  swaggerDefinition,
  apis: [
    "./router/routes/*.js",
    "./router/routes/admin/*.js",
    "./router/routes/auth/*.js",
    "./router/routes/client/*.js",
  ],
};

var swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
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
