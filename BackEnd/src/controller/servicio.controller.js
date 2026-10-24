import {
  getServicios,
  createServicio,
  getServicioById,
  getProfesionalesPorServicio,
  updateServicio,
  deleteServicio,
} from "../services/servicio.service.js";

import { recursoInexistente } from "../utils/respuestas.js";

export const obtenerServicios = async (req, res) => {
  const servicios = await getServicios();

  res.json(servicios);
};

export const crearServicio = async (req, res) => {
  const servicio = await createServicio(req.body);

  res.status(201).json(servicio);
};

export const obtenerServicioPorId = async (req, res) => {
  const servicio = await getServicioById(req.params.id);

  if (!servicio) {
    return recursoInexistente(res, "Servicio");
  }

  res.json(servicio);
};

export const obtenerProfesionalesPorServicio = async (req, res) => {
  const servicio = await getProfesionalesPorServicio(req.params.id);

  if (!servicio) {
    return recursoInexistente(res, "Servicio");
  }

  res.json(servicio.Profesionals);
};

export const actualizarServicio = async (req, res) => {
  const servicio = await updateServicio(req.params.id, req.body);

  if (!servicio) {
    return recursoInexistente(res, "Servicio");
  }

  res.json(servicio);
};

export const eliminarServicio = async (req, res) => {
  const servicio = await deleteServicio(req.params.id);

  if (!servicio) {
    return recursoInexistente(res, "Servicio");
  }

  res.json({
    mensaje: "Servicio eliminado correctamente",
  });
};
