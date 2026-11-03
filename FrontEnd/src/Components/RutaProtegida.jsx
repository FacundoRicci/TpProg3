import { Navigate, Outlet, useLocation } from "react-router";
import { getUsuario } from "../auth.js";

function RutaProtegida({ rol }) {
  const usuario = getUsuario();
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
