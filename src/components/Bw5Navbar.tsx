import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Bw5Navbar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-warning">
          Corto Circuito & C.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#chisiamo">Chi Siamo</Nav.Link>
            <Nav.Link href="#servizi">Servizi</Nav.Link>
            <NavDropdown title="BackOffice" id="basic-nav-dropdown">
              <NavDropdown.Item href="#dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="#utenti">
                Gestione Utenti
              </NavDropdown.Item>
              <NavDropdown.Item href="#email">Comunicazioni</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout" className="text-danger">
                Admin
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bw5Navbar;
