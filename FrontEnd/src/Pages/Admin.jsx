import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { pedir } from "../auth.js";

const profesionalVacio = {
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  password: "",
  servicios: [],
};

const clienteVacio = {
  nombre: "",
  apellido: "",
  dni: "",
  telefono: "",
  email: "",
  password: "",
};

const servicioVacio = { nombre: "", descripcion: "", precio: "" };

const obtenerDatosAdmin = async () => {
  return await Promise.all([
    pedir("/profesionales"),
    pedir("/clientes"),
    pedir("/servicios"),
  ]);
};

function Admin() {
  const [seccion, setSeccion] = useState("profesionales");
  const [profesionales, setProfesionales] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [profesional, setProfesional] = useState(profesionalVacio);
  const [cliente, setCliente] = useState(clienteVacio);
  const [servicio, setServicio] = useState(servicioVacio);
  const [profesionalId, setProfesionalId] = useState(null);
  const [clienteId, setClienteId] = useState(null);
  const [servicioId, setServicioId] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      const [listaProfesionales, listaClientes, listaServicios] =
        await obtenerDatosAdmin();

      setProfesionales(listaProfesionales);
      setClientes(listaClientes);
      setServicios(listaServicios);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let activo = true;

    obtenerDatosAdmin()
      .then(([listaProfesionales, listaClientes, listaServicios]) => {
        if (!activo) {
          return;
        }

        setProfesionales(listaProfesionales);
        setClientes(listaClientes);
        setServicios(listaServicios);
      })
      .catch((err) => {
        if (activo) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const guardar = async (e, ruta, metodo, datos, limpiar) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      await pedir(ruta, { method: metodo, datos });
      limpiar();
      await cargarDatos();
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (ruta, nombre, cargarFormulario, advertencia = "") => {
    const mensaje = `${advertencia ? `${advertencia}\n\n` : ""}¿Querés eliminar ${nombre}?`;

    if (!window.confirm(mensaje)) {
      return;
    }

    setError("");
    try {
      await pedir(ruta, { method: "DELETE" });
      cargarFormulario();
      await cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const editarProfesional = (item) => {
    setProfesionalId(item.id);
    setProfesional({
      nombre: item.nombre,
      apellido: item.apellido,
      telefono: item.telefono,
      email: item.Cuenta?.email ?? "",
      password: "",
      servicios: (item.Servicios ?? []).map((servicio) => servicio.id),
    });
  };

  const editarCliente = (item) => {
    setClienteId(item.id);
    setCliente({
      nombre: item.nombre,
      apellido: item.apellido,
      dni: item.dni,
      telefono: item.telefono,
      email: item.Cuenta?.email ?? "",
      password: "",
    });
  };

  const editarServicio = (item) => {
    setServicioId(item.id);
    setServicio({
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
    });
  };

  const limpiarProfesional = () => {
    setProfesionalId(null);
    setProfesional(profesionalVacio);
  };

  const limpiarCliente = () => {
    setClienteId(null);
    setCliente(clienteVacio);
  };

  const limpiarServicio = () => {
    setServicioId(null);
    setServicio(servicioVacio);
  };

  const guardarProfesional = (e) => {
    if (profesional.servicios.length === 0) {
      e.preventDefault();
      setError("Seleccioná al menos un servicio para el profesional.");
      return;
    }

    const ruta = profesionalId
      ? `/profesionales/${profesionalId}`
      : "/cuentas/registroProfesional";
    const metodo = profesionalId ? "PUT" : "POST";
    guardar(e, ruta, metodo, profesional, limpiarProfesional);
  };

  const alternarServicio = (id) => {
    setProfesional((actual) => ({
      ...actual,
      servicios: actual.servicios.includes(id)
        ? actual.servicios.filter((servicioId) => servicioId !== id)
        : [...actual.servicios, id],
    }));
  };

  const guardarCliente = (e) => {
    const ruta = clienteId ? `/clientes/${clienteId}` : "/cuentas/registroCliente";
    const metodo = clienteId ? "PUT" : "POST";
    guardar(e, ruta, metodo, cliente, limpiarCliente);
  };

  const guardarServicio = (e) => {
    const ruta = servicioId ? `/servicios/${servicioId}` : "/servicios";
    const metodo = servicioId ? "PUT" : "POST";
    guardar(
      e,
      ruta,
      metodo,
      { ...servicio, precio: Number(servicio.precio) },
      limpiarServicio,
    );
  };

  const borrarProfesional = (item) =>
    eliminar(
      `/cuentas/profesional/${item.cuenta_id}`,
      `al profesional ${item.nombre} ${item.apellido}`,
      limpiarProfesional,
      "Solo se eliminará si no tiene turnos pendientes.",
    );

  const borrarCliente = (item) =>
    eliminar(
      `/clientes/${item.id}`,
      `al cliente ${item.nombre} ${item.apellido}`,
      limpiarCliente,
      "Solo se eliminará si no tiene turnos pendientes.",
    );

  const borrarServicio = (item) =>
    eliminar(
      `/servicios/${item.id}`,
      `el servicio ${item.nombre}`,
      limpiarServicio,
      "Se eliminarán también todos los turnos asociados a este servicio.",
    );

  return (
    <Container className="py-5">
      <h1 className="mb-4">Administración</h1>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {[
          ["profesionales", "Profesionales"],
          ["clientes", "Cuentas comunes"],
          ["servicios", "Servicios"],
        ].map(([id, texto]) => (
          <Button
            key={id}
            variant={seccion === id ? "dark" : "outline-dark"}
            onClick={() => setSeccion(id)}
          >
            {texto}
          </Button>
        ))}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
          <span className="visually-hidden">Cargando datos...</span>
        </div>
      ) : (
        <>
          {seccion === "profesionales" && (
            <Row className="g-4">
              <Col lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {profesionalId ? "Modificar profesional" : "Agregar profesional"}
                    </Card.Title>
                    <Form
                      onSubmit={guardarProfesional}
                      className="d-grid gap-3"
                    >
                      {["nombre", "apellido", "telefono", "email"].map((campo) => (
                        <Form.Group key={campo}>
                          <Form.Label>{campo[0].toUpperCase() + campo.slice(1)}</Form.Label>
                          <Form.Control
                            required
                            type={campo === "email" ? "email" : "text"}
                            value={profesional[campo]}
                            onChange={(e) =>
                              setProfesional({ ...profesional, [campo]: e.target.value })
                            }
                          />
                        </Form.Group>
                      ))}
                      <Form.Group>
                        <Form.Label>
                          Contraseña {profesionalId && "(completar solo para cambiarla)"}
                        </Form.Label>
                        <Form.Control
                          required={!profesionalId}
                          type="password"
                          minLength={6}
                          value={profesional.password}
                          onChange={(e) =>
                            setProfesional({ ...profesional, password: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Servicios que realiza</Form.Label>
                        {servicios.length === 0 ? (
                          <Form.Text className="d-block text-muted">
                            Todavía no hay servicios cargados. Creá uno en la sección
                            Servicios.
                          </Form.Text>
                        ) : (
                          servicios.map((item) => (
                            <Form.Check
                              key={item.id}
                              type="checkbox"
                              id={`servicio-profesional-${item.id}`}
                              label={`${item.nombre} ($${item.precio})`}
                              checked={profesional.servicios.includes(item.id)}
                              onChange={() => alternarServicio(item.id)}
                            />
                          ))
                        )}
                        <Form.Text className="d-block text-muted">
                          Seleccioná al menos un servicio.
                        </Form.Text>
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button type="submit" variant="dark" disabled={guardando}>
                          {profesionalId ? "Guardar cambios" : "Agregar"}
                        </Button>
                        {profesionalId && (
                          <Button variant="outline-secondary" onClick={limpiarProfesional}>
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                <Table responsive striped hover>
                  <thead>
                    <tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Servicios</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {profesionales.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre} {item.apellido}</td>
                        <td>{item.Cuenta?.email}</td>
                        <td>{item.telefono}</td>
                        <td>
                          {item.Servicios?.length ? (
                            item.Servicios.map((servicio) => (
                              <span
                                key={servicio.id}
                                className="badge text-bg-secondary me-1 mb-1"
                              >
                                {servicio.nombre}
                              </span>
                            ))
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="text-nowrap">
                          <Button size="sm" variant="outline-dark" className="me-2" onClick={() => editarProfesional(item)}>Editar</Button>
                          <Button size="sm" variant="outline-danger" onClick={() => borrarProfesional(item)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}

          {seccion === "clientes" && (
            <Row className="g-4">
              <Col lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{clienteId ? "Modificar cuenta" : "Agregar cuenta común"}</Card.Title>
                    <Form onSubmit={guardarCliente} className="d-grid gap-3">
                      {["nombre", "apellido", "dni", "telefono", "email"].map((campo) => (
                        <Form.Group key={campo}>
                          <Form.Label>{campo[0].toUpperCase() + campo.slice(1)}</Form.Label>
                          <Form.Control
                            required
                            type={campo === "email" ? "email" : "text"}
                            value={cliente[campo]}
                            onChange={(e) => setCliente({ ...cliente, [campo]: e.target.value })}
                          />
                        </Form.Group>
                      ))}
                      <Form.Group>
                        <Form.Label>
                          Contraseña {clienteId && "(completar solo para cambiarla)"}
                        </Form.Label>
                        <Form.Control
                          required={!clienteId}
                          type="password"
                          minLength={6}
                          value={cliente.password}
                          onChange={(e) => setCliente({ ...cliente, password: e.target.value })}
                        />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button type="submit" variant="dark" disabled={guardando}>
                          {clienteId ? "Guardar cambios" : "Agregar"}
                        </Button>
                        {clienteId && (
                          <Button variant="outline-secondary" onClick={limpiarCliente}>
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                <Table responsive striped hover>
                  <thead>
                    <tr><th>Nombre</th><th>Email</th><th>DNI</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {clientes.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre} {item.apellido}</td>
                        <td>{item.Cuenta?.email}</td>
                        <td>{item.dni}</td>
                        <td className="text-nowrap">
                          <Button size="sm" variant="outline-dark" className="me-2" onClick={() => editarCliente(item)}>Editar</Button>
                          <Button size="sm" variant="outline-danger" onClick={() => borrarCliente(item)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}

          {seccion === "servicios" && (
            <Row className="g-4">
              <Col lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{servicioId ? "Modificar servicio" : "Agregar servicio"}</Card.Title>
                    <Form onSubmit={guardarServicio} className="d-grid gap-3">
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          required
                          value={servicio.nombre}
                          onChange={(e) => setServicio({ ...servicio, nombre: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          rows={3}
                          value={servicio.descripcion}
                          onChange={(e) => setServicio({ ...servicio, descripcion: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          min="0"
                          step="0.01"
                          value={servicio.precio}
                          onChange={(e) => setServicio({ ...servicio, precio: e.target.value })}
                        />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button type="submit" variant="dark" disabled={guardando}>
                          {servicioId ? "Guardar cambios" : "Agregar"}
                        </Button>
                        {servicioId && (
                          <Button variant="outline-secondary" onClick={limpiarServicio}>
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                <Table responsive striped hover>
                  <thead>
                    <tr><th>Nombre</th><th>Precio</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {servicios.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>${item.precio}</td>
                        <td className="text-nowrap">
                          <Button size="sm" variant="outline-dark" className="me-2" onClick={() => editarServicio(item)}>Editar</Button>
                          <Button size="sm" variant="outline-danger" onClick={() => borrarServicio(item)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
}

export default Admin;
