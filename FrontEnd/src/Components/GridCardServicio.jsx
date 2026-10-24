import { useEffect, useState } from "react";
import CardServicio from "./CardServicio";
import { pedir } from "../auth.js";

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


const GridCardServicio = () => {
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        pedir("/servicios")
            .then(setServicios)
            .catch((err) => setError(err.message));
    }, []);

    return (
        <>
        <h2 className="text-center my-5 display-4 fw-bold">Conoce alguno de nuestros servicios</h2>

        <Container className="my-5"> {/* Margen eje Y */}
            {error && <Alert variant="warning">{error}</Alert>}

            {!error && servicios.length === 0 && (
                <p className="text-center text-muted">Todavía no hay servicios cargados.</p>
            )}

            <Row className="g-4"> {/* g-4 = Gap 4 */}
                {servicios.map((servicio) => (
                    <Col key={servicio.id} xs={12} md={4}> {/* xs = ocupa las 12 columnas, pantallas chicas. md =  pantallas medianas en adelante, ocupa 4 col*/}
                        <CardServicio
                            nombre={servicio.nombre}
                            descripcion={servicio.descripcion}
                            precio={servicio.precio}
                        />
                    </Col>

                ))}
            </Row>
        </Container>
        </>
    );
}

export default GridCardServicio;
