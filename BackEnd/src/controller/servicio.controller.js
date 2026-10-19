import {
  getServicios,
  createServicio,
  getServicioById,
  updateServicio,
  deleteServicio,
} from "../services/servicio.service.js";

const servicioInexistente = (res) => {
  return res.status(404).json({
    mensaje: "Servicio no encontrado",
  });
};

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
    servicioInexistente(res);
  }

  res.json(servicio);
};

export const actualizarServicio = async (req, res) => {
  const servicio = await updateServicio(req.params.id, req.body);

  if (!servicio) {
    servicioInexistente(res);
  }

  res.json(servicio);
};

export const eliminarServicio = async (req, res) => {
  const servicio = await deleteServicio(req.params.id);

  if (!servicio) {
    servicioInexistente(res);
  }

  res.json({
    mensaje: "Servicio eliminado correctamente",
  });
};
