import { Router } from "express";
import {
  eliminarCuenta,
  loginController,
  obtenerCuenta,
  obtenerCuentaPorId,
  registrarClienteController,
  registrarProfesionalController,
} from "../controller/cuenta.controller.js";

export const cuentaRouter = Router();

cuentaRouter.post("/cuentas/registroCliente", registrarClienteController);

cuentaRouter.post(
  "/cuentas/registroProfesional",
  registrarProfesionalController,
);

cuentaRouter.post("/cuentas/login", loginController);

cuentaRouter.get("/cuentas", obtenerCuenta);
cuentaRouter.get("/cuentas/:id", obtenerCuentaPorId);
cuentaRouter.delete("/cuentas/:id", eliminarCuenta);
