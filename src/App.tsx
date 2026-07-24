import { BrowserRouter, Route, Routes } from "react-router";
import Bw5Navbar from "./components/Bw5Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Registrazione from "./components/Registrazione";
import Bw5Footer from "./components/Bw5Footer";
import "./index.css";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import CreaFattura from "./components/CreaFattura";
import FormCliente from "./components/FormCliente";
function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Bw5Navbar></Bw5Navbar>
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/registrazione" element={<Registrazione />} />
              <Route path="/crea-fattura" element={<CreaFattura />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nuovo-cliente" element={<FormCliente />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </main>
          <Bw5Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
