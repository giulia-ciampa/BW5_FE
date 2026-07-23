import { BrowserRouter, Route, Routes } from "react-router"
import Bw5Navbar from "./components/Bw5Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import Registrazione from "./components/Registrazione"

function App() {
  return (
    <>
      <BrowserRouter>
        <Bw5Navbar></Bw5Navbar>

        <Routes>
          <Route path="/registrazione" element={<Registrazione />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
