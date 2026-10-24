import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card, Form, InputGroup, Button, Alert } from "react-bootstrap";
import { login, registrar } from "../auth.js";

const clienteVacio = { nombre: "", apellido: "", dni: "", telefono: "" };

function Login() {
    const navigate = useNavigate();
    const [modo, setModo] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cliente, setCliente] = useState(clienteVacio);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const esRegistro = modo === "registro";

    const cambiarModo = () => {
        setModo(esRegistro ? "login" : "registro");
        setError("");
    };

    // Actualiza el campo del cliente segun el "name" del input
    const cambiarCliente = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (esRegistro && Object.values(cliente).some((valor) => !valor.trim())) {
            setError("Completá todos los campos.");
            return;
        }
        if (!email || !password) {
            setError("Completá el email y la contraseña.");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("El email no es válido.");
            return;
        }
        if (esRegistro && password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setCargando(true);
        try {
            if (esRegistro) {
                await registrar({ ...cliente, email, password });
            } else {
                await login(email, password);
            }
            navigate("/mis-turnos");
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={esRegistro ? 5 : 4}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-dark text-white text-center py-3">
                            <i className={`bi ${esRegistro ? "bi-person-plus" : "bi-person-circle"} fs-1 d-block mb-1`}></i>
                            <h4 className="mb-0">{esRegistro ? "Crear cuenta" : "Iniciar sesión"}</h4>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {error && (
                                <Alert variant="danger" className="py-2">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit} noValidate>
                                {esRegistro && (
                                    <>
                                        <Row className="g-3 mb-3">
                                            <Col sm={6}>
                                                <Form.Group controlId="nombre">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control
                                                        name="nombre"
                                                        value={cliente.nombre}
                                                        onChange={cambiarCliente}
                                                        autoComplete="given-name"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={6}>
                                                <Form.Group controlId="apellido">
                                                    <Form.Label>Apellido</Form.Label>
                                                    <Form.Control
                                                        name="apellido"
                                                        value={cliente.apellido}
                                                        onChange={cambiarCliente}
                                                        autoComplete="family-name"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="dni">
                                            <Form.Label>DNI</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="bi bi-person-vcard"></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    name="dni"
                                                    inputMode="numeric"
                                                    value={cliente.dni}
                                                    onChange={cambiarCliente}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="telefono">
                                            <Form.Label>Teléfono</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="bi bi-telephone"></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="tel"
                                                    name="telefono"
                                                    value={cliente.telefono}
                                                    onChange={cambiarCliente}
                                                    autoComplete="tel"
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </>
                                )}

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="bi bi-envelope"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="bi bi-lock"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type={mostrarPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete={esRegistro ? "new-password" : "current-password"}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                            onClick={() => setMostrarPassword(!mostrarPassword)}
                                        >
                                            <i className={`bi ${mostrarPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>

                                <Button type="submit" variant="dark" className="w-100" disabled={cargando}>
                                    <i className={`bi ${esRegistro ? "bi-person-check" : "bi-box-arrow-in-right"} me-2`}></i>
                                    {cargando ? "Enviando..." : esRegistro ? "Registrarme" : "Ingresar"}
                                </Button>
                            </Form>

                            <p className="text-center text-muted mt-3 mb-0">
                                {esRegistro ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
                                <Button
                                    variant="link"
                                    className="p-0 align-baseline fw-semibold text-decoration-none"
                                    style={{ color: "#7DA654" }}
                                    onClick={cambiarModo}
                                >
                                    {esRegistro ? "Iniciar sesión" : "Registrate"}
                                </Button>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
