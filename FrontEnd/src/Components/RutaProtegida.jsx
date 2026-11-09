import { Navigate, Outlet, useLocation } from "react-router";
import { useUsuario } from "../context/UsuarioContext.jsx";

function RutaProtegida({ rol }) {
  const { usuario } = useUsuario();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (usuario.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RutaProtegida;
