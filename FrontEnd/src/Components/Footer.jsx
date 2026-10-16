import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
      <Container>
        <Row className="gy-3 align-items-center">
          {/* Nombre/Marca del Proyecto */}
          <Col md={4} className="text-center text-md-start">
            <h5 className="mb-1 text-white">Trabajo Practico Integrador</h5>
            <small className="text">Desarrollado para la materia de Programacion III</small>
          </Col>

          {/* Enlaces rapidos */}
          <Col md={4}>
            <Nav className="justify-content-center">
              <Nav.Link href="#inicio" className="text-light px-2 fs-5">Inicio</Nav.Link>
              <Nav.Link href="#nosotros" className="text-light px-2 fs-5">Nosotros</Nav.Link>
              <Nav.Link href="#servicios" className="text-light px-2 fs-5">Servicios</Nav.Link>
              <Nav.Link href="#contacto" className="text-light px-2 fs-5">Contacto</Nav.Link>
            </Nav>
          </Col>

          {/* Redes sociales / información de contacto */}
          <Col md={4} className="text-center text-md-end">
            <div className="mb-1">
              <a href="#github" className="text-light me-3 text-decoration-none">GitHub</a>
              <a href="#linkedin" className="text-light me-3 text-decoration-none">LinkedIn</a>
              <a href="#docs" className="text-light text-decoration-none">Documentación</a>
            </div>
            <small className="text">UTN - 2026</small>
          </Col>
        </Row>

        <hr className="border-secondary my-3" />

        {/* Derechos de Autor */}
        <Row>
          <Col className="text-center">
            <small className="text">
              &copy; {new Date().getFullYear()} © 2026 Facundo Ricci, Emmanuel Aguire, Mauricio Roja. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;