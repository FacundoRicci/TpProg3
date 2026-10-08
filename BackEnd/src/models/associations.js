import { Cuenta } from "./Cuenta.js";
import { Cliente } from "./Cliente.js";

Cliente.belongsTo(Cuenta, {
  foreignKey: "cuenta_id",
});

Cuenta.hasOne(Cliente, {
  foreignKey: "cuenta_id",
});
