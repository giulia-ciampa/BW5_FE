import { useEffect, useState } from "react"
import { Badge, Card, Col, Container, Row } from "react-bootstrap"
import type { Fattura } from "../interfaces/interfaces"

function ListaFatture() {
  const [list, setList] = useState<Fattura[]>([])

  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchFatture = async () => {
      try {
        const response = await fetch("http://localhost:3001/fatture", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Impossibile recuperare la lista delle fatture")
        }

        const data = await response.json()
        setList(Array.isArray(data) ? data : data.content || [])
      } catch (err) {
        console.error("Errore caricamento clienti:", err)
      }
    }

    fetchFatture()
  }, [token])

  return (
    <Container>
      <Row lg={1}>
        {list.length === 0 ? (
          <Col>
            <div className="alert alert-warning text-center">
              Nessuna fattura trovata.
            </div>
          </Col>
        ) : (
          list.map((fattura, index) => (
            <Col key={fattura.fatturaId || index} lg={6} className="my-2">
              <Card className="h-100 shadow-sm border-0 bg-dark text-white">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="h6 text-warning mb-0 d-flex justify-content-around">
                        <p>Fattura #{fattura.numero}</p>
                      </Card.Title>

                      <p className="text-white">
                        id:
                        <span className="text-warning">
                          {fattura.fatturaId}
                        </span>
                      </p>
                    </div>
                    <div>
                      <div className="d-flex">
                        <p className="fw-bold me-3">Data fattura: </p>
                        <p className="text-white">{fattura.data}</p>
                      </div>

                      <div className="d-flex justify-content-between text-center align-items-center">
                        <div className="d-flex">
                          <p className="fw-bold me-3">importo: </p>
                          <p className="text-white">{fattura.importo}€</p>
                        </div>

                        {fattura.stato && (
                          <Badge bg="secondary text-center">
                            {typeof fattura.stato === "object"
                              ? fattura.stato.stato
                              : fattura.stato}
                          </Badge>
                        )}
                      </div>

                      <div className="d-flex justify-content-">
                        <p className="fw-bold me-3">id cliente: </p>
                        <p className="text-white">
                          {" "}
                          {fattura.cliente.idCliente}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}

export default ListaFatture
