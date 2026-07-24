import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/AuthSlice";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router";

function Bw5Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (rs: RootState) => rs.auth.isAuthenticated,
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="fw-bold text-warning"
          style={{ cursor: "pointer" }}
        >
          Corto Circuito & C.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => navigate("/home")}
              style={{ cursor: "pointer" }}
            >
              Home
            </Nav.Link>
            <Nav.Link href="#chisiamo">Chi Siamo</Nav.Link>
            <Nav.Link href="#servizi">Servizi</Nav.Link>
            <NavDropdown title="BackOffice" id="basic-nav-dropdown">
              <NavDropdown.Item href="#dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="#utenti">
                Gestione Utenti
              </NavDropdown.Item>
              <NavDropdown.Item href="#email">Comunicazioni</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className={isAuthenticated ? "text-danger" : "text-warning"}
                onClick={() =>
                  isAuthenticated ? handleLogout() : navigate("/login")
                }
              >
                {isAuthenticated ? "Logout" : "Login"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bw5Navbar;
