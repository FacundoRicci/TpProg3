import { Servicio } from "../models/Servicio.js";

export const getServicios = async () => {
  return await Servicio.findAll();
};

export const createServicio = async (datos) => {
  return await Servicio.create(datos);
};
