import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import  Navbar  from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS global de bootstrap

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
