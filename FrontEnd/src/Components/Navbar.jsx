import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Navbar as BsNavbar, Container, Nav, Button } from "react-bootstrap";
import { getUsuario, logout } from "../auth.js";

const links = [
    { path: "/", label: "Home", icon: "bi-house" },
    { path: "/mis-turnos", label: "Mis Turnos", icon: "bi-calendar-check" },
];

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [abierto, setAbierto] = useState(false);

    const irA = (path) => {
        navigate(path);
        setAbierto(false);
    };

    // useLocation hace que el Navbar se vuelva a renderizar al navegar,
    // así que el usuario se actualiza después de login/logout
    const usuario = getUsuario();

    const cerrarSesion = () => {
        logout();
        irA("/login");
    };

    return (
        <BsNavbar
            expand="lg"
            bg="dark"
            data-bs-theme="dark"
            expanded={abierto}
            onToggle={setAbierto}
        >
            <Container fluid>
                <BsNavbar.Brand role="button" onClick={() => irA("/")}>
                    <i className="bi bi-check2-square me-2"></i>
                    TpProg3
                </BsNavbar.Brand>

                <BsNavbar.Toggle aria-controls="navbarNav" />

                <BsNavbar.Collapse id="navbarNav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        {links.map((link) => (
                            <Nav.Link
                                key={link.path}
                                eventKey={link.path}
                                onClick={() => irA(link.path)}
                            >
                                <i className={`bi ${link.icon} me-1`}></i>
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>

                    {usuario ? (
                        <div className="d-flex align-items-center gap-3">
                            <BsNavbar.Text>
                                <i className="bi bi-person-circle me-1"></i>
                                {usuario.nombre}
                            </BsNavbar.Text>
                            <Button variant="outline-light" onClick={cerrarSesion}>
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Salir
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline-light" onClick={() => irA("/login")}>
                            <i className="bi bi-box-arrow-in-right me-1"></i>
                            Login
                        </Button>
                    )}
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;
