import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardServicio({ nombre, descripcion }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80'} />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>
          {descripcion}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardServicio;