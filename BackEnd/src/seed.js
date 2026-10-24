// Carga los servicios iniciales en la base.
// Uso: node src/seed.js (desde la carpeta BackEnd)
import { sequelize } from "./db.js";
import { Servicio } from "./models/Servicio.js";
import "./models/associations.js";

const servicios = [
  { nombre: "Limpieza Facial Profunda", descripcion: "Higienización completa.", precio: 18000 },
  { nombre: "Peeling Químico", descripcion: "Renovación celular e hidratación.", precio: 22000 },
  { nombre: "Dermapen", descripcion: "Estimulación de colágeno.", precio: 28000 },
  { nombre: "Drenaje Linfático", descripcion: "Masaje desintoxicante facial.", precio: 15000 },
  { nombre: "Perfilado de Cejas", descripcion: "Diseño y depilación de cejas.", precio: 12000 },
  { nombre: "Lifting de Pestañas", descripcion: "Curvado natural con tinte.", precio: 14000 },
];

const cargar = async () => {
  await sequelize.sync();

  for (const servicio of servicios) {
    await Servicio.findOrCreate({
      where: { nombre: servicio.nombre },
      defaults: servicio,
    });
  }

  console.log(`Servicios cargados: ${servicios.length}`);
  await sequelize.close();
};

cargar().catch((error) => {
  console.error("Error al cargar los servicios:", error);
  process.exit(1);
});
