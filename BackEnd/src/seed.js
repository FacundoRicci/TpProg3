// Carga datos iniciales: servicios y dos profesionales de ejemplo.
// Uso: node src/seed.js (desde la carpeta BackEnd)
import bcrypt from "bcrypt";
import { sequelize } from "./db.js";
import { Cuenta } from "./models/Cuenta.js";
import { Profesional } from "./models/Profesional.js";
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

// Cuentas de prueba (password: 123456) para poder reservar sin cargar profesionales a mano
const profesionales = [
  { nombre: "Lucía", apellido: "Gómez", telefono: "3415550001", email: "lucia@demo.com" },
  { nombre: "Martín", apellido: "Sosa", telefono: "3415550002", email: "martin@demo.com" },
];

const cargar = async () => {
  await sequelize.sync();

  for (const servicio of servicios) {
    await Servicio.findOrCreate({
      where: { nombre: servicio.nombre },
      defaults: servicio,
    });
  }

  const todosLosServicios = await Servicio.findAll();
  const password = await bcrypt.hash("123456", 10);

  for (const datos of profesionales) {
    const [cuenta] = await Cuenta.findOrCreate({
      where: { email: datos.email },
      defaults: { email: datos.email, password, rol: "PROFESIONAL" },
    });

    const [profesional] = await Profesional.findOrCreate({
      where: { cuenta_id: cuenta.id },
      defaults: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        cuenta_id: cuenta.id,
      },
    });

    await profesional.setServicios(todosLosServicios);
  }

  console.log(`Servicios cargados: ${servicios.length}`);
  console.log(`Profesionales de ejemplo: ${profesionales.length} (password: 123456)`);
  await sequelize.close();
};

cargar().catch((error) => {
  console.error("Error al cargar los datos iniciales:", error);
  process.exit(1);
});
