import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Alert, Badge, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { getUsuario, pedir } from "../auth.js";

const formularioVacio = { servicio_id: "", profesional_id: "", fecha: "", hora: "" };

function MisTurnos() {
    const usuario = getUsuario();
    const clienteId = usuario?.cliente_id;

    const [servicios, setServicios] = useState([]);
    const [profesionales, setProfesionales] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [formulario, setFormulario] = useState(formularioVacio);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const [recargar, setRecargar] = useState(0);

    const cargarTurnos = () => setRecargar((valor) => valor + 1);

    useEffect(() => {
        if (!clienteId) return;
        pedir(`/turnos/cliente/${clienteId}`)
            .then(setTurnos)
            .catch((err) => setError(err.message));
    }, [clienteId, recargar]);

    useEffect(() => {
        pedir("/servicios")
            .then(setServicios)
            .catch((err) => setError(err.message));
    }, []);

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (!clienteId) {
        return (
            <Alert variant="warning" className="m-4">
                Esta sección es solo para clientes. Cerrá sesión y volvé a entrar con una cuenta de cliente.
            </Alert>
        );
    }

    // Al elegir un servicio se cargan los profesionales que lo realizan
    const cambiarServicio = async (e) => {
        const servicio_id = e.target.value;
        setFormulario({ ...formulario, servicio_id, profesional_id: "" });
        setProfesionales([]);
        setError("");

        if (!servicio_id) return;

        try {
            setProfesionales(await pedir(`/servicios/${servicio_id}/profesionales`));
        } catch (err) {
            setError(err.message);
        }
    };

    const reservar = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        if (Object.values(formulario).some((valor) => !valor)) {
            setError("Completá todos los campos para reservar.");
            return;
        }

        setCargando(true);
        try {
            await pedir("/turnos", {
                method: "POST",
                datos: { ...formulario, cliente_id: clienteId },
            });
            setMensaje("Turno reservado con éxito.");
            setFormulario(formularioVacio);
            setProfesionales([]);
            cargarTurnos();
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    const cancelar = async (id) => {
        setError("");
        setMensaje("");
        try {
            await pedir(`/turnos/${id}/cancelar`, { method: "PATCH" });
            setMensaje("Turno cancelado.");
            cargarTurnos();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Mis turnos</h2>

            {error && (
                <Alert variant="danger" className="py-2">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </Alert>
            )}
            {mensaje && (
                <Alert variant="success" className="py-2">
                    <i className="bi bi-check-circle me-2"></i>
                    {mensaje}
                </Alert>
            )}

            <Row className="g-4">
                <Col xs={12} lg={4}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-dark text-white">
                            <i className="bi bi-calendar-plus me-2"></i>
                            Reservar turno
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={reservar}>
                                <Form.Group className="mb-3" controlId="servicio">
                                    <Form.Label>Servicio</Form.Label>
                                    <Form.Select
                                        value={formulario.servicio_id}
                                        onChange={cambiarServicio}
                                    >
                                        <option value="">Elegí un servicio</option>
                                        {servicios.map((servicio) => (
                                            <option key={servicio.id} value={servicio.id}>
                                                {servicio.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="profesional">
                                    <Form.Label>Profesional</Form.Label>
                                    <Form.Select
                                        value={formulario.profesional_id}
                                        onChange={(e) =>
                                            setFormulario({ ...formulario, profesional_id: e.target.value })
                                        }
                                        disabled={!formulario.servicio_id}
                                    >
                                        <option value="">Elegí un profesional</option>
                                        {profesionales.map((profesional) => (
                                            <option key={profesional.id} value={profesional.id}>
                                                {profesional.nombre} {profesional.apellido}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Row className="g-2 mb-3">
                                    <Col xs={6}>
                                        <Form.Group controlId="fecha">
                                            <Form.Label>Fecha</Form.Label>
                                            <Form.Control
                                                type="date"
                                                min={new Date().toISOString().slice(0, 10)}
                                                value={formulario.fecha}
                                                onChange={(e) =>
                                                    setFormulario({ ...formulario, fecha: e.target.value })
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group controlId="hora">
                                            <Form.Label>Hora</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={formulario.hora}
                                                onChange={(e) =>
                                                    setFormulario({ ...formulario, hora: e.target.value })
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button type="submit" variant="dark" className="w-100" disabled={cargando}>
                                    <i className="bi bi-calendar-check me-2"></i>
                                    {cargando ? "Reservando..." : "Reservar"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-dark text-white">
                            <i className="bi bi-list-check me-2"></i>
                            Turnos reservados
                        </Card.Header>
                        <Card.Body>
                            {turnos.length === 0 ? (
                                <p className="text-muted mb-0">Todavía no tenés turnos reservados.</p>
                            ) : (
                                <Table responsive hover className="align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Servicio</th>
                                            <th>Profesional</th>
                                            <th>Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {turnos.map((turno) => (
                                            <tr key={turno.id}>
                                                <td>{new Date(`${turno.fecha}T00:00:00`).toLocaleDateString("es-AR")}</td>
                                                <td>{turno.hora.slice(0, 5)}</td>
                                                <td>{turno.Servicio?.nombre}</td>
                                                <td>
                                                    {turno.Profesional?.nombre} {turno.Profesional?.apellido}
                                                </td>
                                                <td>
                                                    <Badge bg={turno.estado === "PENDIENTE" ? "success" : "secondary"}>
                                                        {turno.estado}
                                                    </Badge>
                                                </td>
                                                <td className="text-end">
                                                    {turno.estado === "PENDIENTE" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() => cancelar(turno.id)}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default MisTurnos;
