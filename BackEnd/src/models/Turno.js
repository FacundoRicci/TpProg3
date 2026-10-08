import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Turno = sequelize.define("Turno", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("PENDIENTE", "CANCELADO", "FINALIZADO"),
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profesional_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servicio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
