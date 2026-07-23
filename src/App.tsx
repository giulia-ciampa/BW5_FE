import { BrowserRouter, Route, Routes } from "react-router";
import Bw5Navbar from "./components/Bw5Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Registrazione from "./components/Registrazione";
import Bw5Footer from "./components/Bw5Footer";
import "./index.css";
import Login from "./components/Login";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Bw5Navbar></Bw5Navbar>
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" />
              <Route path="/registrazione" element={<Registrazione />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Bw5Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
