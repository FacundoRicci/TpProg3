import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const DisponibilidadProfesional = sequelize.define(
  "DisponiblidadProfesional",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dia_semana: {
      type: DataTypes.ENUM("LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"),
      allowNull: false,
    },
    hora_desde: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_hasta: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    profesional_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
);
