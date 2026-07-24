import { useState, type SubmitEvent } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setAccessToken } from "../redux/reducers/AuthSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    console.log(email);
    console.log(password);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        let messaggioErrore = "Non riesco a leggere la risposta del server :(";
        try {
          const errorData = await response.json();
          if (errorData.message) messaggioErrore = errorData.message;
        } catch {
          // il body non era JSON valido, resta il messaggio di default
        }
        throw new Error(messaggioErrore);
      }

      const data = await response.json();

      dispatch(setAccessToken(data.accessToken));

      navigate("/home");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Errore nel login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-5">
      <Container fluid={true} className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-white">
                Area Riservata{" "}
                <span className="text-warning">Corto Circuito & C.</span>
              </h2>
              <p className="text-light">
                Inserisci le tue credenziali per accedere
              </p>
            </div>

            <Card
              className="text-white border-0 shadow-lg p-3"
              style={{
                background: "rgba(26, 26, 26, 0.85)",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 193, 7, 0.3)",
              }}
            >
              <Card.Body>
                <Card.Title className="text-warning fw-bold fs-3 mb-4">
                  Login
                </Card.Title>

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label className="text-light">Email</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-dark text-white border-secondary py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="loginPassword">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dark text-white border-secondary py-2"
                    />
                  </Form.Group>

                  {error && <p className="text-danger mb-3">{error}</p>}

                  <Button
                    type="submit"
                    variant="warning"
                    disabled={loading}
                    className="w-100 fw-bold text-dark py-2 shadow-sm rounded-pill mb-3"
                  >
                    {loading ? "Accesso in corso..." : "Login"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p className="text-light mb-1" style={{ fontSize: "0.9rem" }}>
                    Non sei registrato?{" "}
                    <Link
                      to="/registrazione"
                      className="text-warning text-decoration-none fw-bold"
                    >
                      Registrati subito
                    </Link>
                  </p>
                </div>

                <div className="text-center mt-3">
                  <p
                    className="text-light mb-0"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Password dimenticata?{" "}
                    <span className="text-warning">
                      Contatta il nostro supporto
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Login;
