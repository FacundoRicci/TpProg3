import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import miImagen from './images.jpg';

function CardTratamientos() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={miImagen} />
      <Card.Body>
        <Card.Title>Tratamiento</Card.Title>
        <Card.Text>
          Descripcion del tratamiento
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardTratamientos;