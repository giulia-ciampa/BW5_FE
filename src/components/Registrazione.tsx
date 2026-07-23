import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

function Registrazione() {
  const navigate = useNavigate();

  // 1. Stato per raccogliere i dati del form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  });

  // Aggiorna lo stato man mano che l'utente scrive nei campi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Funzione chiamata all'invio del Form
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault(); // Evita il ricaricamento della pagina

    try {
      const response = await fetch("http://localhost:3001/auth/registrazione", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registrazione avvenuta con successo!");
        //reindirizza alla pagina di login
        navigate("/login");
      } else {
        alert("Errore durante la registrazione");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Impossibile connettersi al server");
    }
  };

  return (
    <Container className="w-50 d-flex flex-column align-content-center vh-100 justify-content-center">
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            className="my-5 border border-4 border-warning rounded-3 p-3 bg-dark"
          >
            <Form.Group className="mb-4" controlId="usernameInput">
              <Form.Label className="w-100 text-center text-warning">
                Username
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="text"
                placeholder="Digita qui il tuo username..."
                value={formData.username}
                onChange={handleChange}
                name="username"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="emailInput">
              <Form.Label className="w-100 text-center  text-warning">
                email
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="email"
                placeholder="Digita qui la tua email..."
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="passwordInput">
              <Form.Label className="w-100 text-center  text-warning">
                Password
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="password"
                placeholder="Digita qui la tua password..."
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="nomeInput">
              <Form.Label className="w-100 text-center  text-warning">
                Nome
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="text"
                placeholder="Digita qui il tuo nome..."
                value={formData.nome}
                onChange={handleChange}
                name="nome"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cognomeInput">
              <Form.Label className="w-100 text-center  text-warning">
                Cognome
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="text"
                placeholder="Digita qui il tuo cognome..."
                value={formData.cognome}
                onChange={handleChange}
                name="cognome"
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="warning" className="">
                Registrati
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registrazione;
