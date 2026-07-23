import { BrowserRouter, Route, Routes } from "react-router";
import Bw5Navbar from "./components/Bw5Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Bw5Footer from "./components/Bw5Footer";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Bw5Navbar></Bw5Navbar>

          <Routes>
            <Route path="/" />
          </Routes>
          <Bw5Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
