import { sequelize } from "../db.js";
import { Cuenta } from "../models/Cuenta.js";
import { Cliente } from "../models/Cliente.js";
import bcrypt from "bcrypt";

export const registrarCliente = async (datos) => {
  const { nombre, apellido, dni, telefono, email, password } = datos;

  if (!nombre || !apellido || !dni || !telefono || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await sequelize.transaction(async (transaction) => {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const passwordHash = await bcrypt.hash(password, salt);

    const cuenta = await Cuenta.create(
      {
        email,
        password: passwordHash,
        rol: "CLIENTE",
      },
      { transaction },
    );

    const cliente = await Cliente.create(
      {
        nombre,
        apellido,
        dni,
        telefono,
        cuenta_id: cuenta.id,
      },
      { transaction },
    );

    return {
      id: cuenta.id,
      email: cuenta.email,
      rol: cuenta.rol,
      cliente,
    };
  });
};
