import { createContext, useContext, useState } from "react";
import {
  getUsuario,
  login as loginApi,
  logout as logoutApi,
  registrar as registrarApi,
} from "../auth.js";

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => getUsuario());

  const login = async (email, password) => {
    const nuevoUsuario = await loginApi(email, password);
    setUsuario(nuevoUsuario);
    return nuevoUsuario;
  };

  const registrar = async (datos) => {
    const nuevoUsuario = await registrarApi(datos);
    setUsuario(nuevoUsuario);
    return nuevoUsuario;
  };

  const logout = () => {
    logoutApi();
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, registrar, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext);

  if (!contexto) {
    throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  }

  return contexto;
}
