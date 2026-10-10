import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardTratamientos() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
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