import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UsuarioProvider } from "./context/UsuarioContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsuarioProvider>
      <App/>
    </UsuarioProvider>
  </StrictMode>,
);
