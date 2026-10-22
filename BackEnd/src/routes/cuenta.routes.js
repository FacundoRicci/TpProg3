import { Router } from "express";
import { registrarClienteController } from "../controller/cuenta.controller.js";

export const cuentaRouter = Router();

cuentaRouter.post("/cuentas/registro", registrarClienteController);
