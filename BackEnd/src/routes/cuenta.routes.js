import { Router } from "express";
import { registrarClienteController, loginController } from "../controller/cuenta.controller.js";

export const cuentaRouter = Router();

cuentaRouter.post("/cuentas/registro", registrarClienteController);
cuentaRouter.post("/cuentas/login", loginController);
