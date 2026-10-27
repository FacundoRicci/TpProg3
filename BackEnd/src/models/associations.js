import { Cuenta } from "./Cuenta.js";
import { Cliente } from "./Cliente.js";
import { Turno } from "./Turno.js";
import { Profesional } from "./Profesional.js";
import { Servicio } from "./Servicio.js";
import { ProfesionalServicio } from "./ProfesionalServicio.js";
import { DisponibilidadProfesional } from "./DisponibilidadProfesional.js";

Cliente.belongsTo(Cuenta, {
  foreignKey: "cuenta_id",
  onDelete: "CASCADE",
});

Cuenta.hasOne(Cliente, {
  foreignKey: "cuenta_id",
  onDelete: "CASCADE",
});

Turno.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});

Turno.belongsTo(Profesional, {
  foreignKey: "profesional_id",
  onDelete: "CASCADE",
});

Turno.belongsTo(Servicio, {
  foreignKey: "servicio_id",
});

Servicio.hasMany(Turno, {
  foreignKey: "servicio_id",
});

Profesional.hasMany(Turno, {
  foreignKey: "profesional_id",
  onDelete: "CASCADE",
});

Cliente.hasMany(Turno, {
  foreignKey: "cliente_id",
});

Profesional.belongsTo(Cuenta, {
  foreignKey: "cuenta_id",
  onDelete: "CASCADE",
});

Cuenta.hasOne(Profesional, {
  foreignKey: "cuenta_id",
  onDelete: "CASCADE",
});

Profesional.belongsToMany(Servicio, {
  through: ProfesionalServicio,
  foreignKey: "profesional_id",
  otherKey: "servicio_id",
  onDelete: "CASCADE",
});

Servicio.belongsToMany(Profesional, {
  through: ProfesionalServicio,
  foreignKey: "servicio_id",
  otherKey: "profesional_id",
  onDelete: "CASCADE",
});

Profesional.hasMany(ProfesionalServicio, {
  foreignKey: "profesional_id",
  onDelete: "CASCADE",
});

Servicio.hasMany(ProfesionalServicio, {
  foreignKey: "servicio_id",
});

DisponibilidadProfesional.belongsTo(Profesional, {
  foreignKey: "profesional_id",
  onDelete: "CASCADE",
});

Profesional.hasMany(DisponibilidadProfesional, {
  foreignKey: "profesional_id",
  onDelete: "CASCADE",
});
