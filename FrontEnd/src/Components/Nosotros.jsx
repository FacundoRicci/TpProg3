// Botstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Nosotros= ()=>{
    return(
        <Container className='my-5' id='nosotros'>
            <Row className="g-5 align-items-center">
                <Col xs={12} md={6}>
                    <div className='position-relative'> {/* <Image fluid= que se adapte y no supere el ancho de la columna */}
                        <Image fluid rounded src='https://plus.unsplash.com/premium_photo-1723867490491-10519f8ed969?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'/>
                    </div>  
                </Col>
                <Col>
                    <h2>Estética profesional. Experiencia única.</h2>
                    <p>En Centro De Estetica combinamos formación profesional, aparatología avanzada y un enfoque cálido para que cada tratamiento sea también un momento para vos.</p>
                    <p>Reservá tu turno online en pocos pasos: elegí el servicio, la profesional y el horario que mejor te queden.</p>
                </Col>
            </Row>
            
        </Container>
    );
}

export default Nosotros;