import { Router } from "express";
import {
  cancelarTurnoController,
  crearTurnoController,
  obtenerTurnosPorCliente,
} from "../controller/turno.controller.js";

export const turnoRouter = Router();

turnoRouter.post("/turnos", crearTurnoController);
turnoRouter.get("/turnos/cliente/:clienteId", obtenerTurnosPorCliente);
turnoRouter.patch("/turnos/:id/cancelar", cancelarTurnoController);
