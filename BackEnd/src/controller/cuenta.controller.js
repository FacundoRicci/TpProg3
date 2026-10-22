import { registrarCliente } from "../services/cuenta.service.js";

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
