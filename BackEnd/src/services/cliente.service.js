import { Cliente } from "../models/Cliente.js";
import { Cuenta } from "../models/Cuenta.js";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt";

export const getClientes = async () => {
  return await Cliente.findAll({
    include: [{ model: Cuenta, attributes: ["id", "email"] }],
  });
};

export const getClienteById = async (id) => {
  return await Cliente.findByPk(id);
};

export const updateCliente = async (id, datos) => {
  const { email, password, ...datosCliente } = datos;

  return await sequelize.transaction(async (transaction) => {
    const cliente = await Cliente.findByPk(id, { transaction });

    if (!cliente) {
      return null;
    }

    await cliente.update(datosCliente, { transaction });

    if (email || password) {
      const cuenta = await Cuenta.findByPk(cliente.cuenta_id, { transaction });

      if (cuenta) {
        const datosCuenta = {};

        if (email) {
          datosCuenta.email = email;
        }
        if (password) {
          datosCuenta.password = await bcrypt.hash(password, 10);
        }

        await cuenta.update(datosCuenta, { transaction });
      }
    }

    return cliente;
  });
};

export const deleteCliente = async (id) => {
  return await sequelize.transaction(async (transaction) => {
    const cliente = await Cliente.findByPk(id, { transaction });

    if (!cliente) {
      return null;
    }

    const cuenta = await Cuenta.findByPk(cliente.cuenta_id, { transaction });

    if (cuenta) {
      await cuenta.destroy({ transaction });
    } else {
      await cliente.destroy({ transaction });
    }

    return cliente;
  });
};
