import { BrowserRouter, Route, Routes } from "react-router"
import Bw5Navbar from "./components/Bw5Navbar"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Bw5Navbar></Bw5Navbar>

        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
