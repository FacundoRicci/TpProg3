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
              <Nav.Link href="" className="text-light px-2 fs-5">Inicio</Nav.Link>
              <Nav.Link href="" className="text-light px-2 fs-5">Nosotros</Nav.Link>
              <Nav.Link href="" className="text-light px-2 fs-5">Servicios</Nav.Link>
              <Nav.Link href="" className="text-light px-2 fs-5">Contacto</Nav.Link>
            </Nav>
          </Col>

          {/* Redes sociales / información de contacto */}
          <Col md={4} className="text-center text-md-end">
            <div className="mb-1">
              <a href="https://github.com/FacundoRicci/TpProg3" className="text-light me-3 text-decoration-none">GitHub</a>
              <a href="" className="text-light me-3 text-decoration-none">Presentacion</a> {/* Agregar enlace a la presentación */}
              <a href="https://docs.google.com/document/d/1eXBVRQJuySSKqAVMdQ6yUd3OOdrdr7s6M7NiOYKGmTA/edit?tab=t.0" className="text-light text-decoration-none">Documentación</a>
            </div>
            <small className="text">UTN - 2026</small>
          </Col>
        </Row>

        <hr className="border-secondary my-3" />

        {/* Derechos de Autor */}
        <Row>
          <Col className="text-center">
            <small className="text">
              &copy; {new Date().getFullYear()} Facundo Ricci, Emmanuel Aguire, Mauricio Roja. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;