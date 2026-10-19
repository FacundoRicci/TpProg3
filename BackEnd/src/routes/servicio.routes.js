import { Router } from "express";
import {
  obtenerServicios,
  crearServicio,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
} from "../controller/servicio.controller.js";

export const servicioRouter = Router();

servicioRouter.get("/servicios", obtenerServicios);

servicioRouter.post("/servicios", crearServicio);

servicioRouter.get("/servicios/:id", obtenerServicioPorId);

servicioRouter.put("/servicios/:id", actualizarServicio);

servicioRouter.delete("/servicios/:id", eliminarServicio);
