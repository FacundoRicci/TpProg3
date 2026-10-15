import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card, Form, InputGroup, Button, Alert } from "react-bootstrap";
import { login } from "../auth.js";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Completá el email y la contraseña.");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("El email no es válido.");
            return;
        }

        const usuario = login(email, password);
        if (!usuario) {
            setError("Email o contraseña incorrectos.");
            return;
        }

        navigate("/mis-turnos");
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-dark text-white text-center py-3">
                            <i className="bi bi-person-circle fs-1 d-block mb-1"></i>
                            <h4 className="mb-0">Iniciar sesión</h4>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {error && (
                                <Alert variant="danger" className="py-2">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit} noValidate>
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
                                            autoComplete="current-password"
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

                                <Button type="submit" variant="dark" className="w-100">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Ingresar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
