import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Cliente } from "./Cliente.js";

// id int, email string, password string, rol enum(cliente, profesional, administrador)
export const Cuenta = sequelize.define("Cuenta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("CLIENTE", "PROFESIONAL", "ADMINISTRADOR"),
    allowNull: false,
  },
});
