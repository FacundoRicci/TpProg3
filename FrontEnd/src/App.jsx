import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import MisTurnos from "./Pages/MisTurnos.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
