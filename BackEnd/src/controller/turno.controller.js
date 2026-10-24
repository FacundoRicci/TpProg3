import {
  cancelarTurno,
  crearTurno,
  getTurnosPorCliente,
} from "../services/turno.service.js";
import { recursoInexistente } from "../utils/respuestas.js";

export const crearTurnoController = async (req, res) => {
  const turno = await crearTurno(req.body);

  res.status(201).json(turno);
};

export const obtenerTurnosPorCliente = async (req, res) => {
  const turnos = await getTurnosPorCliente(req.params.clienteId);

  res.json(turnos);
};

export const cancelarTurnoController = async (req, res) => {
  const turno = await cancelarTurno(req.params.id);

  if (!turno) {
    return recursoInexistente(res, "Turno");
  }

  res.json(turno);
};
