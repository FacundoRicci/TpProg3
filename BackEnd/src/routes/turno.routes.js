import { Router } from "express";
import {
  cancelarTurnoController,
  crearTurnoController,
  obtenerTurnosPorCliente,
  obtenerTurnosPorProfesional,
} from "../controller/turno.controller.js";

export const turnoRouter = Router();

turnoRouter.post("/turnos", crearTurnoController);
turnoRouter.get("/turnos/cliente/:clienteId", obtenerTurnosPorCliente);
turnoRouter.get("/turnos/profesional/:profesionalId", obtenerTurnosPorProfesional);
turnoRouter.patch("/turnos/:id/cancelar", cancelarTurnoController);
