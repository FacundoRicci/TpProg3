import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import MisTareas from "./Pages/MisTareas.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mis-tareas" element={<MisTareas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
