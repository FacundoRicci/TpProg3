import { Profesional } from "../models/Profesional.js";
import { Cuenta } from "../models/Cuenta.js";
import { sequelize } from "../db.js";
import bcrypt from "bcrypt";

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
  const profesional = await Profesional.findByPk(id);

  if (!profesional) {
    return null;
  }

  await profesional.destroy();

  return profesional;
};
