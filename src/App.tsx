import { BrowserRouter, Route, Routes } from "react-router";
import Bw5Navbar from "./components/Bw5Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Bw5Navbar></Bw5Navbar>

        <Routes>
          <Route path="/" />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
