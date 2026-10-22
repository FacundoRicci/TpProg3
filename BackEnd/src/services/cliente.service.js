import { Cliente } from "../models/Cliente.js";

export const getClientes = async () => {
  return await Cliente.findAll();
};

export const getClienteById = async (id) => {
  return await Cliente.findByPk(id);
};

export const updateCliente = async (id, datos) => {
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    return null;
  }

  await cliente.update(datos);

  return cliente;
};

export const deleteCliente = async (id) => {
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    return null;
  }

  await cliente.destroy();

  return cliente;
};
