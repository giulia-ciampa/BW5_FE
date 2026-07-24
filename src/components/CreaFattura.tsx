import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"

//dati del form
interface FatturaFormState {
  data: string
  importo: string
  idCliente: string
}

//dati che vengono inviati
interface FatturaPayload {
  data: string // Formato "DD/MM/YYYY" (es. "25/02/2026")
  importo: number
  idCliente: string
}

function CreaFattura() {
  const token = localStorage.getItem("token")

  // 1. Stato per raccogliere i dati del form
  const [formData, setFormData] = useState<FatturaFormState>({
    data: "",
    importo: "",
    idCliente: "",
  })

  //2. Aggiorna lo stato man mano che l'utente scrive nei campi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // 3. Funzione chiamata all'invio del Form
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault() // Evita il ricaricamento della pagina

    // Conversione "YYYY-MM-DD" in "DD/MM/YYYY"
    const [year, month, day] = formData.data.split("-")
    const dataFormattata = `${day}/${month}/${year}`

    const payload: FatturaPayload = {
      data: dataFormattata,
      importo: parseFloat(formData.importo) || 0,
      idCliente: formData.idCliente,
    }

    try {
      const response = await fetch("http://localhost:3001/fatture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        alert("Fattura salvata con successo!")
      } else {
        alert("Errore durante il salvataggio")
      }
    } catch (error) {
      console.error("Errore di rete:", error)
      alert("Impossibile connettersi al server")
    }
  }

  return (
    <Container className="w-50 d-flex flex-column align-content-center vh-100 justify-content-center">
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            className="my-5 border border-4 border-warning rounded-3 p-3 bg-dark"
          >
            <Form.Group className="mb-4" controlId="dataInput">
              <Form.Label className="w-100 text-center text-warning">
                Data
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="date"
                placeholder="Data"
                value={formData.data}
                onChange={handleChange}
                name="data"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="importoInput">
              <Form.Label className="w-100 text-center  text-warning">
                importo
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="number"
                step="0.01"
                placeholder="importo"
                value={formData.importo}
                onChange={handleChange}
                name="importo"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="idClienteInput">
              <Form.Label className="w-100 text-center  text-warning">
                Id del cliente
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="text"
                placeholder="Id del cliente"
                value={formData.idCliente}
                onChange={handleChange}
                name="idCliente"
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="warning" className="">
                Salva fattura
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreaFattura
