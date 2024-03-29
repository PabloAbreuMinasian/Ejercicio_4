require("dotenv").config();
const path = require("path");
const express = require("express");

const routes = require("./routes");

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});

/**
 * Este último código se utilza para cerrar la conexión a la base de datos en
 * el momento en que se "apaga" el servidor de Express, es decir, cuando se
 * hace CTRL+C para "matar" al proceso.
 */
process.on("SIGINT", function () {
  const { mongoose } = require("./db");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection is disconnected due to application termination.\n");
    process.exit(0);
  });
});
