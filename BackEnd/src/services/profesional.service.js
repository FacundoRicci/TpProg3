import { Profesional } from "../models/Profesional.js";

export const getProfesionales = async () => {
  return await Profesional.findAll();
};

export const getProfesionalById = async (id) => {
  return await Profesional.findByPk(id);
};

export const updateProfesional = async (id, datos) => {
  const profesional = await Profesional.findByPk(id);

  if (!profesional) {
    return null;
  }

  await profesional.update(datos);

  return profesional;
};

export const deleteProfesional = async (id) => {
  const profesional = await Profesional.findByPk(id);

  if (!profesional) {
    return null;
  }

  await profesional.destroy();

  return profesional;
};
