import { sequelize } from "../db.js";
import { Servicio } from "../models/Servicio.js";
import { Profesional } from "../models/Profesional.js";
import { Turno } from "../models/Turno.js";
import { ProfesionalServicio } from "../models/ProfesionalServicio.js";

export const getServicios = async () => {
  return await Servicio.findAll();
};

export const createServicio = async (datos) => {
  return await Servicio.create(datos);
};

export const getServicioById = async (id) => {
  return await Servicio.findByPk(id);
};

// Profesionales que tienen asignado ese servicio
export const getProfesionalesPorServicio = async (id) => {
  return await Servicio.findByPk(id, {
    include: [
      {
        model: Profesional,
        attributes: ["id", "nombre", "apellido"],
        through: { attributes: [] },
      },
    ],
  });
};

export const updateServicio = async (id, datos) => {
  const servicio = await Servicio.findByPk(id);

  if (!servicio) {
    return null;
  }

  await servicio.update(datos);

  return servicio;
};

export const deleteServicio = async (id) => {
  return await sequelize.transaction(async (transaction) => {
    const servicio = await Servicio.findByPk(id, { transaction });

    if (!servicio) {
      return null;
    }

    // Se eliminan todos los turnos del servicio, sin importar su estado,
    // y las relaciones del servicio con los profesionales.
    await Turno.destroy({
      where: { servicio_id: id },
      transaction,
    });

    await ProfesionalServicio.destroy({
      where: { servicio_id: id },
      transaction,
    });

    await servicio.destroy({ transaction });

    return servicio;
  });
};
