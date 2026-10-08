import { Cuenta } from "./Cuenta.js";
import { Cliente } from "./Cliente.js";
import { Turno } from "./Turno.js";
import { Profesional } from "./Profesional.js";
import { Servicio } from "./Servicio.js";
import { ProfesionalServicio } from "./ProfesionalServicio.js";
import { DisponibilidadProfesional } from "./DisponibilidadProfesional.js";

Cliente.belongsTo(Cuenta, {
  foreignKey: "cuenta_id",
});

Cuenta.hasOne(Cliente, {
  foreignKey: "cuenta_id",
});

Turno.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});

Turno.belongsTo(Profesional, {
  foreignKey: "profesional_id",
});

Turno.belongsTo(Servicio, {
  foreignKey: "servicio_id",
});

Servicio.hasMany(Turno, {
  foreignKey: "servicio_id",
});

Profesional.hasMany(Turno, {
  foreignKey: "profesional_id",
});

Cliente.hasMany(Turno, {
  foreignKey: "cliente_id",
});

Profesional.belongsTo(Cuenta, {
  foreignKey: "cuenta_id",
});

Cuenta.hasOne(Profesional, {
  foreignKey: "cuenta_id",
});

Profesional.belongsToMany(Servicio, {
  through: ProfesionalServicio,
  foreignKey: "servicio_id",
  otherKey: "servicio_id",
});

Servicio.belongsToMany(Profesional, {
  through: ProfesionalServicio,
  foreignKey: "profesional_id",
  otherKey: "profesional_id",
});

Profesional.hasMany(ProfesionalServicio, {
  foreignKey: "profesional_id",
});

Servicio.hasMany(ProfesionalServicio, {
  foreignKey: "servicio_id",
});

DisponibilidadProfesional.belongsTo(Profesional, {
  foreignKey: "profesional_id",
});

Profesional.hasMany(DisponibilidadProfesional, {
  foreignKey: "profesional_id",
});
