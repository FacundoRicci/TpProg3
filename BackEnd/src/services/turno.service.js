import { Cliente } from "../models/Cliente.js";
import { Profesional } from "../models/Profesional.js";
import { Servicio } from "../models/Servicio.js";
import { ProfesionalServicio } from "../models/ProfesionalServicio.js";
import { Turno } from "../models/Turno.js";

// Error con codigo HTTP para que el controlador sepa como responder
const errorDeNegocio = (mensaje, status = 400) => {
  const error = new Error(mensaje);
  error.status = status;
  return error;
};

const normalizarHora = (hora) => (hora.length === 5 ? `${hora}:00` : hora);

export const crearTurno = async (datos) => {
  const { cliente_id, profesional_id, servicio_id, fecha, hora } = datos;

  if (!cliente_id || !profesional_id || !servicio_id || !fecha || !hora) {
    throw errorDeNegocio("Todos los campos son obligatorios");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha))) {
    throw errorDeNegocio("La fecha no es válida");
  }

  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(hora)) {
    throw errorDeNegocio("La hora no es válida");
  }

  if (fecha < new Date().toISOString().slice(0, 10)) {
    throw errorDeNegocio("No se pueden reservar turnos en fechas pasadas");
  }

  // VALIDACIONES reserva de turno lunes a viernes / reserva cada una hora en punto --------------------

  // Aceptar solo de lunes a viernes
  const diaDeLaSemana = new Date(`${fecha}T00:00:00Z`).getUTCDay();

  if (diaDeLaSemana < 1 || diaDeLaSemana > 5) {
    throw errorDeNegocio("Solo se pueden reservar turnos de lunes a viernes");
  }

  // Aceptar turnos cada una hora en punto, entre las 10:00 y las 19:00
  const [horas, minutos, segundos = 0] = hora.split(":").map(Number);

  if (horas < 10 || horas >= 20 || minutos !== 0 || segundos !== 0) {
    throw errorDeNegocio(
      "Los turnos deben ser de lunes a viernes, entre las 10:00 y las 19:00, en punto"
    );
  }
  // --------------------------------------------------------------------------------------------------
  
  const [cliente, profesional, servicio] = await Promise.all([
    Cliente.findByPk(cliente_id),
    Profesional.findByPk(profesional_id),
    Servicio.findByPk(servicio_id),
  ]);

  if (!cliente) throw errorDeNegocio("Cliente no encontrado", 404);
  if (!profesional) throw errorDeNegocio("Profesional no encontrado", 404);
  if (!servicio) throw errorDeNegocio("Servicio no encontrado", 404);

  const ofreceServicio = await ProfesionalServicio.findOne({
    where: { profesional_id, servicio_id },
  });

  if (!ofreceServicio) {
    throw errorDeNegocio("El profesional no ofrece ese servicio");
  }

  const horaNormalizada = normalizarHora(hora);

  const ocupado = await Turno.findOne({
    where: {
      profesional_id,
      fecha,
      hora: horaNormalizada,
      estado: "PENDIENTE",
    },
  });

  if (ocupado) {
    throw errorDeNegocio("Ese horario ya está ocupado", 409);
  }

  return await Turno.create({
    cliente_id,
    profesional_id,
    servicio_id,
    fecha,
    hora: horaNormalizada,
  });
};

export const getTurnosPorCliente = async (clienteId) => {
  return await Turno.findAll({
    where: { cliente_id: clienteId },
    include: [
      { model: Profesional, attributes: ["id", "nombre", "apellido"] },
      { model: Servicio, attributes: ["id", "nombre", "precio"] },
    ],
    order: [
      ["fecha", "ASC"],
      ["hora", "ASC"],
    ],
  });
};

export const cancelarTurno = async (id) => {
  const turno = await Turno.findByPk(id);

  if (!turno) {
    return null;
  }

  if (turno.estado !== "PENDIENTE") {
    throw errorDeNegocio("Solo se pueden cancelar turnos pendientes", 409);
  }

  turno.estado = "CANCELADO";
  await turno.save();

  return turno;
};
