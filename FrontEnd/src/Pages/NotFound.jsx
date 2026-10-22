import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate();

    return (
        <>
            <h1>404</h1>
            <p>La página que buscás no existe.</p>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </>
    )
}

export default NotFound;
