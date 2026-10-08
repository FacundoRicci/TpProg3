import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import { Cuenta } from "./models/Cuenta.js";
import { Cliente } from "./models/Cliente.js";
import "./models/associations.js";

const app = express();

try {
  app.use(express.json());

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log("Servidor escuchando el puerto", PORT);
  });
} catch (error) {
  console.log("Hubo un error en la inicializacion.");
  console.log(error);
}
