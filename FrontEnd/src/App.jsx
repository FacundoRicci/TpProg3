import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import MisTurnos from "./Pages/MisTurnos.jsx";
import Admin from "./Pages/Admin.jsx";
import NotFound from "./Pages/NotFound.jsx";
import RutaProtegida from "./Components/RutaProtegida.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route element={<RutaProtegida rol="ADMINISTRADOR" />}>
          <Route path="/administracion" element={<Admin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
