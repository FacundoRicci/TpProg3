import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardServicio({ nombre, descripcion, precio }) {
  const navigate = useNavigate();

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80'} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="flex-grow-1">
          {descripcion}
        </Card.Text>
        {precio != null && (
          <Card.Text className="fw-bold mb-3">
            ${precio.toLocaleString('es-AR')}
          </Card.Text>
        )}
        <Button variant="dark" onClick={() => navigate('/mis-turnos')}>
          Reservar turno
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardServicio;
