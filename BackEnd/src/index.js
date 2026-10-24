import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import { Cuenta } from "./models/Cuenta.js";
import { Cliente } from "./models/Cliente.js";
import { Turno } from "./models/Turno.js";
import { Profesional } from "./models/Profesional.js";
import { Servicio } from "./models/Servicio.js";
import { ProfesionalServicio } from "./models/ProfesionalServicio.js";
import { DisponibilidadProfesional } from "./models/DisponibilidadProfesional.js";
import { servicioRouter } from "./routes/servicio.routes.js";
import { clienteRouter } from "./routes/cliente.routes.js";
import { cuentaRouter } from "./routes/cuenta.routes.js";
import { profesionalRouter } from "./routes/profesional.routes.js";
import { turnoRouter } from "./routes/turno.routes.js";

import "./models/associations.js";

const app = express();

try {
  // Permite que el FrontEnd (otro puerto) haga pedidos a esta API
  app.use(cors());
  app.use(express.json());

  app.use(cuentaRouter);
  app.use(clienteRouter);
  app.use(servicioRouter);
  app.use(profesionalRouter);
  app.use(turnoRouter);

  // Ruta no encontrada
  app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
  });

  // Manejador de errores: siempre responde JSON así el front puede leer "mensaje"
  app.use((error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }

    const status = error.status || 500;

    if (status >= 500) {
      console.error(error);
    }

    res.status(status).json({
      mensaje: status >= 500 ? "Error interno del servidor" : error.message,
    });
  });

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log("Servidor escuchando el puerto", PORT);
  });
} catch (error) {
  console.log("Hubo un error en la inicializacion.");
  console.log(error);
}
