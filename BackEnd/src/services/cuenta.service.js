import { sequelize } from "../db.js";
import { Cuenta } from "../models/Cuenta.js";
import { Cliente } from "../models/Cliente.js";
import { Profesional } from "../models/Profesional.js";
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

export const registrarProfesional = async (datos) => {
  const { nombre, apellido, telefono, email, password } = datos;

  if (!nombre || !apellido || !telefono || !email || !password) {
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
        rol: "PROFESIONAL",
      },
      { transaction },
    );

    const profesional = await Profesional.create(
      {
        nombre,
        apellido,
        telefono,
        cuenta_id: cuenta.id,
      },
      { transaction },
    );

    return {
      id: cuenta.id,
      email: cuenta.email,
      rol: cuenta.rol,
      profesional,
    };
  });
};

export const getCuentas = async () => {
  return await Cuenta.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const getCuentaById = async (id) => {
  return await Cuenta.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

// Devuelve null si el email no existe o la contraseña no coincide
export const loginCuenta = async (datos) => {
  const { email, password } = datos;

  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const cuenta = await Cuenta.findOne({
    where: { email },
    include: [Cliente, Profesional],
  });

  if (!cuenta) {
    return null;
  }

  const passwordValida = await bcrypt.compare(password, cuenta.password);

  if (!passwordValida) {
    return null;
  }

  const persona = cuenta.Cliente ?? cuenta.Profesional;

  return {
    id: cuenta.id,
    email: cuenta.email,
    rol: cuenta.rol,
    nombre: persona ? persona.nombre : cuenta.email,
    cliente_id: cuenta.Cliente ? cuenta.Cliente.id : null,
    profesional_id: cuenta.Profesional ? cuenta.Profesional.id : null,
  };
};
