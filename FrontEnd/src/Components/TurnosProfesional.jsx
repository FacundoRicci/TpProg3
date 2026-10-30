import { useEffect, useState } from "react";
import { Alert, Badge, Card, Spinner, Table } from "react-bootstrap";
import { pedir } from "../auth.js";

function TurnosProfesional({ profesionalId }) {
    const [turnos, setTurnos] = useState([]);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!profesionalId) return;

        let activo = true;

        pedir(`/turnos/profesional/${profesionalId}`)
            .then((resultado) => {
                if (activo) setTurnos(resultado);
            })
            .catch((err) => {
                if (activo) setError(err.message);
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, [profesionalId]);

    return (
        <div className="container py-5">
            <h2 className="mb-4">Mis turnos</h2>

            {!profesionalId && (
                <Alert variant="warning">
                    No se encontró el perfil profesional asociado a esta cuenta.
                </Alert>
            )}
            {error && (
                <Alert variant="danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </Alert>
            )}

            <Card className="shadow-sm">
                <Card.Header className="bg-dark text-white">
                    <i className="bi bi-calendar-check me-2"></i>
                    Turnos asociados
                </Card.Header>
                <Card.Body>
                    {cargando && profesionalId ? (
                        <div className="text-center py-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Cargando turnos...</span>
                            </Spinner>
                        </div>
                    ) : !error && profesionalId && turnos.length === 0 ? (
                        <p className="text-muted mb-0">Todavía no tenés turnos asociados.</p>
                    ) : !error && turnos.length > 0 ? (
                        <Table responsive hover className="align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Cliente</th>
                                    <th>Teléfono</th>
                                    <th>Servicio</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turnos.map((turno) => (
                                    <tr key={turno.id}>
                                        <td>{new Date(`${turno.fecha}T00:00:00`).toLocaleDateString("es-AR")}</td>
                                        <td>{turno.hora.slice(0, 5)}</td>
                                        <td>{turno.Cliente?.nombre} {turno.Cliente?.apellido}</td>
                                        <td>{turno.Cliente?.telefono}</td>
                                        <td>{turno.Servicio?.nombre}</td>
                                        <td>
                                            <Badge bg={turno.estado === "PENDIENTE" ? "success" : "secondary"}>
                                                {turno.estado}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : null}
                </Card.Body>
            </Card>
        </div>
    );
}

export default TurnosProfesional;
