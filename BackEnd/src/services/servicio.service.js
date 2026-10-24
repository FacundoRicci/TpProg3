import { Servicio } from "../models/Servicio.js";
import { Profesional } from "../models/Profesional.js";

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
  const servicio = await Servicio.findByPk(id);

  if (!servicio) {
    return null;
  }

  await servicio.destroy();

  return servicio;
};
