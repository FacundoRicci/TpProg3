import {
  getProfesionales,
  getProfesionalById,
  updateProfesional,
  deleteProfesional,
} from "../services/profesional.service.js";

import { recursoInexistente } from "../utils/respuestas.js";

export const obtenerProfesional = async (req, res) => {
  const profesionales = await getProfesionales();

  res.json(profesionales);
};

export const obtenerProfesionalPorId = async (req, res) => {
  const profesionales = await getProfesionalById(req.params.id);

  if (!profesionales) {
    return recursoInexistente(res, "Profesional");
  }

  res.json(profesionales);
};

export const actualizarProfesional = async (req, res) => {
  const profesional = await updateProfesional(req.params.id, req.body);

  if (!profesional) {
    return recursoInexistente(res, "Profesional");
  }

  res.json(profesional);
};

export const eliminarProfesional = async (req, res) => {
  const profesional = await deleteProfesional(req.params.id);

  if (!profesional) {
    return recursoInexistente(res, "Profesional");
  }

  res.json({
    mensaje: "Profesional eliminado correctamente",
  });
};
