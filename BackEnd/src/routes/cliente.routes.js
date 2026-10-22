import { Router } from "express";

import {
  obtenerCliente,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
} from "../controller/cliente.controller.js";

export const clienteRouter = Router();

clienteRouter.get("/clientes", obtenerCliente);
clienteRouter.get("/clientes/:id", obtenerClientePorId);
clienteRouter.put("/clientes/:id", actualizarCliente);
clienteRouter.delete("/clientes/:id", eliminarCliente);
