import { Container, Row, Col } from "react-bootstrap";

function Bw5Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container className="text-center text-md-start ">
        <Row className="text-center text-md-start">
          {/* Colonna 1: Info Azienda */}
          <Col md={3} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">
              Corto Circuito & C.
            </h5>
            <p>
              Startup energetica e-commerce gestita da un team disviluppatori
              specializzata nella fornitura di energia elettrica ad alta
              tensione e soluzioni digitali rapide (ma con qualche piccolo
              rischio di sovraccarico sui server).
            </p>
          </Col>

          {/* Colonna 2: Link Utili */}
          <Col md={2} lg={2} xl={2} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">
              Link Utili
            </h5>
            <p>
              <a href="#" className="text-white text-decoration-none">
                Home
              </a>
            </p>
            <p>
              <a href="#" className="text-white text-decoration-none">
                Chi Siamo
              </a>
            </p>
            <p>
              <a href="#" className="text-white text-decoration-none">
                Servizi
              </a>
            </p>
            <p>
              <a href="#" className="text-white text-decoration-none">
                Privacy Policy
              </a>
            </p>
          </Col>

          {/* Colonna 3: Contatti */}
          <Col md={4} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">
              Contatti
            </h5>
            <p>
              <i className="bi bi-house-door-fill me-2"></i> Via Roma 123,
              Milano
            </p>
            <p>
              <i className="bi bi-envelope-fill me-2"></i> admin@admin.com
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> 000 900 100
            </p>
          </Col>
        </Row>

        <hr className="mb-4" />

        {/* Sezione Inferiore: Copyright e Social */}
        <Row className="align-items-center">
          {/* Copyright */}
          <Col md={7} lg={8} className="text-center text-md-start">
            <p className="mb-0">
              © {new Date().getFullYear()} Copyright:
              <a href="#" className="text-warning text-decoration-none ms-1">
                <strong>CortoCircuito.com</strong>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Bw5Footer;
