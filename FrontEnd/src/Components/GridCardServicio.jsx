import CardServicio from "./CardServicio";

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const GridCardServicio = () => {
    const servicios_de_prueba = [  // Una vez hecho los fetch de la bbdd, borrar esto
        { id: 1, nombre: "Limpieza Facial Profunda", descripcion: "Higienización completa.", precio: 18000 },
        { id: 2, nombre: "Peeling Químico", descripcion: "Renovación celular e hidratación.", precio: 22000 },
        { id: 3, nombre: "Dermapen", descripcion: "Estimulación de colágeno.", precio: 28000 },
        { id: 4, nombre: "Drenaje Linfático", descripcion: "Masaje desintoxicante facial.", precio: 15000 },
        { id: 5, nombre: "Perfilado de Cejas", descripcion: "Diseño y depilación de cejas.", precio: 12000 },
        { id: 6, nombre: "Lifting de Pestañas", descripcion: "Curvado natural con tinte.", precio: 14000 },
        ];

    return (
        <>
        <h2 className="text-center my-5 display-4 fw-bold">Conoce alguno de nuestros servicios</h2>
        
        <Container className="my-5"> {/* Margen eje Y */}
            <Row className="g-4"> {/* g-4 = Gap 4 */}
                {servicios_de_prueba.map((servicio) => (
                    <Col key={servicio.id} xs={12} md={4}> {/* xs = ocupa las 12 columnas, pantallas chicas. md =  pantallas medianas en adelante, ocupa 4 col*/}
                        <CardServicio
                            key={servicio.id}
                            nombre={servicio.nombre}
                            descripcion={servicio.descripcion}
                        />
                    </Col>

                ))}
            </Row>
        </Container>
        </>
    );
}

export default GridCardServicio;