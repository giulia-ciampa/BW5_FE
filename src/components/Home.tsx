import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <Container fluid className="py-5 border-top border-secondary">
      <Row className="text-center g-4 d-flex flex-column align-items-center">
        <Col md={4} style={{ cursor: "pointer" }}>
          <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
            <div
              className="mb-3"
              style={{ color: "#ffc107", fontSize: "3.5rem" }}
            >
              <i className="bi bi-person"></i>
            </div>
            <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
              Crea un nuovo cliente
            </h3>
            <p className="text-light">Attiva il profilo di un nuovo cliente</p>
          </div>
        </Col>
        <Col md={4} style={{ cursor: "pointer" }}>
          <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
            <div
              className="mb-3"
              style={{ color: "#ffc107", fontSize: "3.5rem" }}
            >
              <i className="bi bi-laptop" style={{ cursor: "pointer" }}></i>
            </div>
            <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
              Crea fattura per un cliente
            </h3>
            <p className="text-light">Facci dare un sacco de SORDI</p>
            <small className="text-light">
              Tanto tutto il resto lo fa l'admin, stai solo rubando lo stipendio
            </small>
          </div>
        </Col>
        <Col
          md={4}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/clienti")}
        >
          <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
            <div
              className="mb-3"
              style={{ color: "#ffc107", fontSize: "3.5rem" }}
            >
              <i className="bi bi-people" style={{ cursor: "pointer" }}></i>
            </div>
            <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
              Lista Clienti (ADMIN)
            </h3>
            <p className="text-light">Visualizza tutti i clienti</p>
          </div>
        </Col>
        <Col md={4} style={{ cursor: "pointer" }}>
          <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
            <div
              className="mb-3"
              style={{ color: "#ffc107", fontSize: "3.5rem" }}
            >
              <i className="bi bi-receipt" style={{ cursor: "pointer" }}></i>
            </div>
            <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
              Lista Fatture (ADMIN)
            </h3>
            <p className="text-light">Visualizza tutte le fatture</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
