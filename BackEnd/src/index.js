import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import { Cuenta } from "./models/Cuenta.js";
import { Cliente } from "./models/Cliente.js";
import { Turno } from "./models/Turno.js";
import { Profesional } from "./models/Profesional.js";
import { Servicio } from "./models/Servicio.js";
import { ProfesionalServicio } from "./models/ProfesionalServicio.js";
import { DisponibilidadProfesional } from "./models/DisponibilidadProfesional.js";
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
