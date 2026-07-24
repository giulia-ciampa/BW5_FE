import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"

//Interfaccia per il tipo Cliente
interface Cliente {
  id: string
  nome: string
  cognome: string
  ragioneSociale: string
  partitaIva: number
}

// dati del form
interface FatturaFormState {
  data: string
  importo: string
  idCliente: string
}

// dati che vengono inviati
interface FatturaPayload {
  data: string // Formato "DD/MM/YYYY" (es. "25/02/2026")
  importo: number
  idCliente: string
}

function CreaFattura() {
  const token = localStorage.getItem("accessToken")

  // 1. Stato per raccogliere i dati del form
  const [formData, setFormData] = useState<FatturaFormState>({
    data: "",
    importo: "",
    idCliente: "",
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [clienti, setClienti] = useState<Cliente[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  // 3. Funzione chiamata all'invio del Form (TUTTO IL CODICE È DENTRO)
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault() // Evita il ricaricamento della pagina
    setErrorMessage(null)

    // Gestione di sicurezza se la data è vuota
    if (!formData.data) {
      setErrorMessage("Seleziona una data valida.")
      return
    }

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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Errore durante il salvataggio")
      }

      alert("Fattura salvata con successo!")
      // Resetta il form dopo il successo
      setFormData({ data: "", importo: "", idCliente: "" })
    } catch (error) {
      console.error("Errore di rete:", error)

      if (error instanceof Error) {
        setErrorMessage(error.message || "Impossibile connettersi al server")
      } else {
        setErrorMessage("Impossibile connettersi al server")
      }
    }
  }

  useEffect(() => {
    const fetchClienti = async () => {
      try {
        const response = await fetch("http://localhost:3001/clienti/me/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Impossibile recuperare la lista dei clienti")
        }

        const data = await response.json()
        setClienti(Array.isArray(data) ? data : data.content || [])
      } catch (err) {
        console.error("Errore caricamento clienti:", err)
      }
    }

    fetchClienti()
  }, [token])

  // 4. Render del componente JSX
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
                value={formData.data}
                onChange={handleChange}
                name="data"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="importoInput">
              <Form.Label className="w-100 text-center text-warning">
                Importo
              </Form.Label>
              <Form.Control
                className="w-100 text-center formControl border-0"
                type="number"
                step="0.01"
                placeholder="Importo"
                value={formData.importo}
                onChange={handleChange}
                name="importo"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="idClienteInput">
              <Form.Label className="w-100 text-center text-warning">
                Seleziona Cliente
              </Form.Label>

              <Form.Select
                className="w-100 text-center formControl border-0"
                name="idCliente"
                value={formData.idCliente}
                onChange={handleChange}
              >
                <option value="">-- Seleziona un cliente --</option>
                {clienti.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.ragioneSociale ||
                      `${cliente.nome} ${cliente.cognome || ""}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Messaggio di errore mostrato a schermo */}
            {errorMessage && (
              <div className="text-warning my-2 fs-6 text-center border border-warning rounded p-2">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {errorMessage}
              </div>
            )}

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="warning">
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
