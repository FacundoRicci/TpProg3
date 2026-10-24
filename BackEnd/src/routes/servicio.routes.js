import { Router } from "express";
import {
  obtenerServicios,
  crearServicio,
  obtenerServicioPorId,
  obtenerProfesionalesPorServicio,
  actualizarServicio,
  eliminarServicio,
} from "../controller/servicio.controller.js";

export const servicioRouter = Router();

servicioRouter.get("/servicios", obtenerServicios);

servicioRouter.post("/servicios", crearServicio);

servicioRouter.get("/servicios/:id", obtenerServicioPorId);

servicioRouter.get(
  "/servicios/:id/profesionales",
  obtenerProfesionalesPorServicio,
);

servicioRouter.put("/servicios/:id", actualizarServicio);

servicioRouter.delete("/servicios/:id", eliminarServicio);
