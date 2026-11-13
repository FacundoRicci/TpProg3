import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  // Las pruebas usan DB_STORAGE=":memory:" para no tocar la base real
  storage: process.env.DB_STORAGE || "./salon_belleza.db",
  logging: false,
});
