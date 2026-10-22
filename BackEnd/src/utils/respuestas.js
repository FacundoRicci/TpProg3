export const recursoInexistente = (res, recurso) => {
  return res.status(404).json({
    mensaje: `${recurso} no encontrado`,
  });
};
