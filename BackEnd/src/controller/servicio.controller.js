import { getServicios, createServicio } from "../services/servicio.service.js";

export const obtenerServicios = async (req, res) => {
  const servicios = await getServicios();

  res.json(servicios);
};

export const crearServicio = async (req, res) => {
  const servicio = await createServicio(req.body);

  res.status(201).json(servicio);
};
