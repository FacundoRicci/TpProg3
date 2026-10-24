// Botstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Contacto = ()=> {
    return ( 
        <Container className="my-5" id='contacto'>
            <Row className='mb-4'>
                <Col className='text-center'>
                    <h2 className="text-center my-4 display-4 fw-bold">Contactanos</h2>
                    <p className='h5 fw-normal mb-2'>Visitanos o poente en contacto con nosotros para coordinar tu turno.</p>
                </Col>
            </Row>
            <Row className='g-4 align-items-stretch '>
                {/* Columna de datos de contacto */}
                <Col xs={12} md={6}>
                    <p><strong>Direccion:</strong> Zeballos 1341, Rosario, Santa Fe</p>
                    <p><strong>Telefono / WhatsApp:</strong> +54 341 123-4567</p>
                    <p><strong>Email:</strong> contacto@centrodeestetica.com</p>

                    <hr className="my-3" />

                    <h4 className="h6 fw-bold mb-2">Horarios de Atención:</h4>
                    <p className="mb-1">Lunes a Viernes: 09:00 - 20:00 hs</p>
                    <p className="mb-0">Sábados: 09:00 - 14:00 hs</p>
                </Col>

                {/* Columa del iFrame */}
                <Col xs={12} md={6}>
                    <div className="h-100 rounded overflow-hidden shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.8676630166015!2d-60.64639392432992!3d-32.954503173590005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab11d0eb49c3%3A0x11f1d3d54f950dd0!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%20%7C%20Facultad%20Regional%20Rosario!5e0!3m2!1ses-419!2sar!4v1792854399610!5m2!1ses-419!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '210px' }}
                            title="Ubicacion ficticia"
                        ></iframe>
                    </div>
                </Col>
            </Row>

        </Container>
     );
}

export default Contacto;