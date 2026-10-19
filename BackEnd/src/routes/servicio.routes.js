import { Router } from "express";
import {
  obtenerServicios,
  crearServicio,
} from "../controller/servicio.controller.js";

export const servicioRouter = Router();

servicioRouter.get("/servicios", obtenerServicios);

servicioRouter.post("/servicios", crearServicio);
