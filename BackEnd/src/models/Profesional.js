import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Profesional = sequelize.define("Profesional", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuenta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
