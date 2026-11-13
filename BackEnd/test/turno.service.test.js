// Pruebas unitarias de las reglas de negocio para reservar un turno.
// Se ejecutan con el test runner nativo de Node: npm test (desde BackEnd)
//
// Todos los casos fallan en la validación, antes de consultar la base de datos,
// por eso no hace falta tener la base cargada para correrlos.
import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Base en memoria: si una validación dejara pasar datos inválidos, el turno
// nunca se guarda en salon_belleza.db. Se define antes de importar el servicio.
process.env.DB_STORAGE = ":memory:";
const { crearTurno } = await import("../src/services/turno.service.js");

// Devuelve la próxima fecha (YYYY-MM-DD) que cae en el día de la semana pedido
// (0 = domingo ... 6 = sábado), siempre al menos un día después de hoy.
const proximaFecha = (diaSemana) => {
  const fecha = new Date();
  fecha.setUTCDate(fecha.getUTCDate() + 1);
  while (fecha.getUTCDay() !== diaSemana) {
    fecha.setUTCDate(fecha.getUTCDate() + 1);
  }
  return fecha.toISOString().slice(0, 10);
};

const turnoBase = () => ({
  cliente_id: 1,
  profesional_id: 1,
  servicio_id: 1,
  fecha: proximaFecha(1), // próximo lunes
  hora: "10:00",
});

// Verifica que crearTurno rechace los datos con el mensaje y el código HTTP esperados.
const debeRechazar = (datos, mensaje, status = 400) =>
  assert.rejects(crearTurno(datos), (error) => {
    assert.equal(error.message, mensaje);
    assert.equal(error.status, status);
    return true;
  });

describe("crearTurno - validaciones", () => {
  test("rechaza el turno si falta algún campo obligatorio", async () => {
    await debeRechazar({ ...turnoBase(), servicio_id: "" }, "Todos los campos son obligatorios");
  });

  test("rechaza una fecha con formato inválido", async () => {
    await debeRechazar({ ...turnoBase(), fecha: "10/11/2026" }, "La fecha no es válida");
  });

  test("rechaza una hora con formato inválido", async () => {
    await debeRechazar({ ...turnoBase(), hora: "10hs" }, "La hora no es válida");
  });

  test("rechaza fechas pasadas", async () => {
    await debeRechazar(
      { ...turnoBase(), fecha: "2020-01-06" },
      "No se pueden reservar turnos en fechas pasadas",
    );
  });

  test("rechaza turnos en sábado y domingo", async () => {
    for (const dia of [6, 0]) {
      await debeRechazar(
        { ...turnoBase(), fecha: proximaFecha(dia) },
        "Solo se pueden reservar turnos de lunes a viernes",
      );
    }
  });

  test("rechaza horarios fuera de 10:00 a 19:00 o que no sean en punto", async () => {
    const mensaje =
      "Los turnos deben ser de lunes a viernes, entre las 10:00 y las 19:00, en punto";

    for (const hora of ["09:00", "20:00", "10:30"]) {
      await debeRechazar({ ...turnoBase(), hora }, mensaje);
    }
  });
});
