# TpProg3 — Turnos para salón de belleza

Trabajo práctico de Programación III. Aplicación web para reservar turnos en un centro de estética.

- **BackEnd:** Node.js + Express + Sequelize + SQLite
- **FrontEnd:** React + Vite + Bootstrap

## Requisitos

- Node.js 20 o superior

## BackEnd

```bash
cd BackEnd
npm install
npm run seed   # carga los servicios iniciales (opcional)
npm run dev    # http://localhost:3000
```

La base SQLite (`salon_belleza.db`) se crea sola en la primera ejecución y **no se versiona**.
Si cambiás un modelo, borrá el archivo `.db` y volvé a correr `npm run seed`.

## FrontEnd

```bash
cd FrontEnd
npm install
npm run dev    # http://localhost:5173
```

La URL del BackEnd se puede cambiar con la variable `VITE_API_URL` (por defecto `http://localhost:3000`).

## Endpoints principales

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/cuentas/registroCliente` | Registro de cliente |
| POST | `/cuentas/registroProfesional` | Registro de profesional |
| POST | `/cuentas/login` | Inicio de sesión |
| GET | `/servicios` | Listado de servicios |
| GET | `/servicios/:id/profesionales` | Profesionales que hacen un servicio |
| POST | `/turnos` | Crear turno |
| GET | `/turnos/cliente/:clienteId` | Turnos de un cliente |
| PATCH | `/turnos/:id/cancelar` | Cancelar un turno |
