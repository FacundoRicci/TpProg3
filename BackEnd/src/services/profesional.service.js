import { Profesional } from "../models/Profesional.js";
import { Cuenta } from "../models/Cuenta.js";
import { Turno } from "../models/Turno.js";
import { ProfesionalServicio } from "../models/ProfesionalServicio.js";
import { DisponibilidadProfesional } from "../models/DisponibilidadProfesional.js";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt";

const errorDeNegocio = (mensaje, status = 400) => {
  const error = new Error(mensaje);
  error.status = status;
  return error;
};

// Elimina un profesional y todos sus datos asociados.
// Solo se permite si no tiene turnos pendientes.
const eliminarDependenciasProfesional = async (profesional, transaction) => {
  const turnosPendientes = await Turno.count({
    where: { profesional_id: profesional.id, estado: "PENDIENTE" },
    transaction,
  });

  if (turnosPendientes > 0) {
    throw errorDeNegocio(
      "No se puede eliminar el profesional porque tiene turnos pendientes. Cancelá esos turnos primero.",
      409,
    );
  }

  await Turno.destroy({
    where: { profesional_id: profesional.id },
    transaction,
  });

  await DisponibilidadProfesional.destroy({
    where: { profesional_id: profesional.id },
    transaction,
  });

  await ProfesionalServicio.destroy({
    where: { profesional_id: profesional.id },
    transaction,
  });

  await profesional.destroy({ transaction });
};

export const getProfesionales = async () => {
  return await Profesional.findAll({
    include: [{ model: Cuenta, attributes: ["id", "email"] }],
  });
};

export const getProfesionalById = async (id) => {
  return await Profesional.findByPk(id);
};

export const updateProfesional = async (id, datos) => {
  const { email, password, ...datosProfesional } = datos;

  return await sequelize.transaction(async (transaction) => {
    const profesional = await Profesional.findByPk(id, { transaction });

    if (!profesional) {
      return null;
    }

    await profesional.update(datosProfesional, { transaction });

    if (email || password) {
      const cuenta = await Cuenta.findByPk(profesional.cuenta_id, { transaction });

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

    return profesional;
  });
};

export const deleteProfesional = async (id) => {
  return await sequelize.transaction(async (transaction) => {
    const profesional = await Profesional.findByPk(id, { transaction });

    if (!profesional) {
      return null;
    }

    await eliminarDependenciasProfesional(profesional, transaction);

    const cuenta = await Cuenta.findByPk(profesional.cuenta_id, {
      transaction,
    });

    if (cuenta) {
      await cuenta.destroy({ transaction });
    }

    return profesional;
  });
};

// Variante usada desde la cuenta: el administrador elimina por cuenta_id.
export const deleteProfesionalPorCuenta = async (cuentaId) => {
  return await sequelize.transaction(async (transaction) => {
    const cuenta = await Cuenta.findByPk(cuentaId, { transaction });

    if (!cuenta) {
      return null;
    }

    if (cuenta.rol !== "PROFESIONAL") {
      throw errorDeNegocio("La cuenta no pertenece a un profesional");
    }

    const profesional = await Profesional.findOne({
      where: { cuenta_id: cuentaId },
      transaction,
    });

    if (profesional) {
      await eliminarDependenciasProfesional(profesional, transaction);
    }

    await cuenta.destroy({ transaction });

    return cuenta;
  });
};
