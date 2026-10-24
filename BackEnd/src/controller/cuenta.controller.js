import {
  deleteCuenta,
  getCuentaById,
  getCuentas,
  loginCuenta,
  registrarCliente,
  registrarProfesional,
} from "../services/cuenta.service.js";
import { recursoInexistente } from "../utils/respuestas.js";

export const registrarClienteController = async (req, res) => {
  try {
    const resultado = await registrarCliente(req.body);

    return res.status(201).json(resultado);
  } catch (error) {
    if (error.message === "Todos los campos son obligatorios") {
      return res.status(400).json({
        mensaje: error.message,
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "El email o DNI ya se encuentra registrado",
      });
    }

    console.error(error);

    return res.status(500).json({
      mensaje: "Error al registrar el cliente",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const usuario = await loginCuenta(req.body);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    return res.json(usuario);
  } catch (error) {
    if (error.message === "Todos los campos son obligatorios") {
      return res.status(400).json({
        mensaje: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};

export const registrarProfesionalController = async (req, res) => {
  try {
    const resultado = await registrarProfesional(req.body);

    return res.status(201).json(resultado);
  } catch (error) {
    if (error.message === "Todos los campos son obligatorios") {
      return res.status(400).json({
        mensaje: error.message,
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "El email o DNI ya se encuentra registrado",
      });
    }

    console.error(error);

    return res.status(500).json({
      mensaje: "Error al registrar el profesional",
    });
  }
};

export const obtenerCuenta = async (req, res) => {
  const cuenta = await getCuentas();

  res.json(cuenta);
};

export const obtenerCuentaPorId = async (req, res) => {
  const cuenta = await getCuentaById(req.params.id);

  if (!cuenta) {
    recursoInexistente(res, "Cuenta");
  }

  res.json(cuenta);
};

export const eliminarCuenta = async (req, res) => {
  const cuenta = await deleteCuenta(req.params.id);

  if (!cuenta) {
    recursoInexistente(res, "Cuenta");
  }

  res.json({
    mensaje: "Cuenta eliminada correctamente",
  });
};
