import { useState, type SubmitEvent } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
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

      console.log("Login effettuato:", data);

      dispatch(setAccessToken(data.accessToken));

      navigate("/home");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Errore nel login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid={true} className="mt-5">
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    required
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button type="submit" disabled={loading}>
                  {loading ? "Accesso..." : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
