import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Cuenta } from "./Cuenta.js";

// id int, email string, password string, rol enum(cliente, profesional, administrador)
export const Cliente = sequelize.define("Cliente", {
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
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cuenta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
