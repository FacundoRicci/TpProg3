import { Router } from "express";
import {
  registrarClienteController,
  registrarProfesionalController,
} from "../controller/cuenta.controller.js";

export const cuentaRouter = Router();

cuentaRouter.post("/cuentas/registroCliente", registrarClienteController);

cuentaRouter.post(
  "/cuentas/registroProfesional",
  registrarProfesionalController,
);
