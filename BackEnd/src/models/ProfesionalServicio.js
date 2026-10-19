import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ProfesionalServicio = sequelize.define("ProfesionalServicio", {
  profesional_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});
