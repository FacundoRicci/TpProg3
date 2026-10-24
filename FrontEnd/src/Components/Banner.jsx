import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="position-relative text-white py-5"
      style={{
        // Reemplazar imagen despues
        backgroundImage: `linear-gradient(rgba(18, 62, 39, 0.85), rgba(18, 62, 39, 0.85)), url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '450px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container>
        <Row>
          <Col md={8} lg={6}>
            {/* Título principal */}
            <h1 className="fw-bold mb-1 display-5"> Centro de estetica </h1>
            <p className="fs-5 mb-3 fw-light"> Trabajo con equipos avanzados </p>

            {/* Oferta / Descuento */}
            <div className="mb-3">
              <h2 className="fw-extrabold display-3 mb-0" style={{ fontWeight: 800 }}>
                15% OFF
              </h2>
              <p className="fs-5 mb-0">
                <span className="me-2">💳</span>
                <strong> Pagando con tarjeta </strong>
              </p>
            </div>

            {/* Lista con ticks verdes */}
            <ul className="list-unstyled mb-4">
              <li className="d-flex align-items-center mb-1">
                <span className="badge bg-success me-2 p-1"> ✓ </span>
                <span> Tratamientos con tecnologia moderna. </span>
              </li>
              <li className="d-flex align-items-center mb-1">
                <span className="badge bg-success me-2 p-1"> ✓ </span>
                <span> Amplia variedad de tratamientos. </span>
              </li>
              <li className="d-flex align-items-center mb-1">
                <span className="badge bg-success me-2 p-1"> ✓ </span>
                <span> Para todos los tipos de piel. </span>
              </li>
              <li className="d-flex align-items-center mb-1">
                <span className="badge bg-success me-2 p-1"> ✓ </span>
                <span> Notables resultados desde la primer sesión. </span>
              </li>
            </ul>

            {/* Boton */}
            <Button
              variant="success"
              size="lg"
              className="fw-bold px-5 py-2 border-0"
              style={{ backgroundColor: '#7DA654', color: '#fff' }}
              onClick={() => navigate('/mis-turnos')}
            >
              Reservar turno
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;