import {
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} from "../services/cliente.service.js";

import { recursoInexistente } from "../utils/respuestas.js";

export const obtenerCliente = async (req, res) => {
  const clientes = await getClientes();

  res.json(clientes);
};

export const obtenerClientePorId = async (req, res) => {
  const cliente = await getClienteById(req.params.id);

  if (!cliente) {
    return recursoInexistente(res, "Cliente");
  }

  res.json(cliente);
};

export const actualizarCliente = async (req, res) => {
  const cliente = await updateCliente(req.params.id, req.body);

  if (!cliente) {
    return recursoInexistente(res, "Cliente");
  }

  res.json(cliente);
};

export const eliminarCliente = async (req, res) => {
  const cliente = await deleteCliente(req.params.id);

  if (!cliente) {
    return recursoInexistente(res, "Cliente");
  }

  res.json({
    mensaje: "Cliente eliminado correctamente",
  });
};
