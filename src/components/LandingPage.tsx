import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();

  //  apertura e chiusura del toast, all'inizio chiuso
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 1000); //comprare dopo un sec

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-5">
      <Container className="py-5 text-center">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold text-white mb-4">
              L'Energia del Futuro,{" "}
              <span className="text-warning">a portata di click</span>
            </h1>
            <p className="lead text-light mb-4">
              Soluzioni energetiche e-commerce ad alta tensione, rapide e smart.
              Gestisci tutto online con la massima efficienza.
            </p>
            <div>
              <Button
                onClick={() => navigate("/registrazione")}
                variant="warning"
                size="lg"
                className="me-3 fw-bold text-dark"
              >
                Registrati subito!
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Accedi alla tua Area Riservata
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="py-5 border-top border-secondary">
        <Row className="text-center g-4">
          <Col md={4}>
            <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
              <div
                className="mb-3"
                style={{ color: "#ffc107", fontSize: "3.5rem" }}
              >
                <i
                  className="bi bi-lightning-charge-fill"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
                Attivazione Rapida
              </h3>
              <p className="text-light">
                Poche mosse online e la tua fornitura è attiva in tempo record.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
              <div
                className="mb-3"
                style={{ color: "#ffc107", fontSize: "3.5rem" }}
              >
                <i className="bi bi-laptop" style={{ cursor: "pointer" }}></i>
              </div>
              <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
                100% Digitale
              </h3>
              <p className="text-light">
                Gestisci bollette e consumi direttamente dalla nostra
                piattaforma web.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100">
              <div
                className="mb-3"
                style={{ color: "#ffc107", fontSize: "3.5rem" }}
              >
                <i
                  className="bi bi-lightbulb-fill"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <h3 className="h4 fw-bold" style={{ cursor: "pointer" }}>
                Tariffe Smart
              </h3>
              <p className="text-light">
                Piani energetici su misura senza sorprese in bolletta.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastContainer
        position="bottom-end"
        className="p-4 position-fixed"
        style={{ zIndex: 1080, bottom: "25px", right: "25px" }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          className="text-white border-0 shadow-lg"
          style={{
            width: "360px",
            background: "rgba(26, 26, 26, 0.85)",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 193, 7, 0.3)",
          }}
        >
          <Toast.Header
            closeButton
            closeVariant="white"
            className="text-warning border-0 pt-3 px-4 pb-0 bg-transparent"
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "rgba(255, 193, 7, 0.15)",
                }}
              >
                <i className="bi bi-lightning-charge-fill text-warning fs-6"></i>
              </div>
              <strong className="text-warning fs-5">Offerta Esclusiva</strong>
            </div>
          </Toast.Header>
          <Toast.Body className="px-4 py-3">
            <p
              className="text-light mb-4"
              style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
            >
              Passa a{" "}
              <span className="text-warning fw-bold">Corto Circuito & C.</span>:
              azzeriamo i costi di attivazione e ricevi un bonus immediato!
            </p>
            <Button
              variant="warning"
              className="fw-bold text-dark w-100 py-2 shadow-sm rounded-pill"
              onClick={() => {
                setShowToast(false);
                navigate("/registrazione");
              }}
            >
              Approfitta dell'Offerta <i className="bi bi-arrow-right ms-1"></i>
            </Button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default LandingPage;
