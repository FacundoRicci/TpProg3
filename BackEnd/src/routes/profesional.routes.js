import { Router } from "express";

import {
  obtenerProfesional,
  obtenerProfesionalPorId,
  actualizarProfesional,
  eliminarProfesional,
} from "../controller/profesional.controller.js";

export const profesionalRouter = Router();

profesionalRouter.get("/profesionales", obtenerProfesional);
profesionalRouter.get("/profesionales/:id", obtenerProfesionalPorId);
profesionalRouter.put("/profesionales/:id", actualizarProfesional);
profesionalRouter.delete("/profesionales/:id", eliminarProfesional);
