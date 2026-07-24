import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import type {
  AllClientsResponse,
  Cliente,
  Error,
} from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

function ClientiList() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [clienti, setClienti] = useState<Cliente[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [filtroRagioneSociale, setFiltroRagioneSociale] = useState<string>("");
  const [debouncedRagioneSociale, setDebouncedRagioneSociale] =
    useState<string>("");
  const [filtroDataInserimentoMin, setFiltroDataInserimentoMin] =
    useState<string>("");
  const [filtroDataInserimentoMax, setFiltroDataInserimentoMax] =
    useState<string>("");
  const [filtroFatturatoMin, setFiltroFatturatoMin] = useState<string>("");
  const [debouncedFatturatoMin, setDebouncedFatturatoMin] =
    useState<string>("");
  const [filtroFatturatoMax, setFiltroFatturatoMax] = useState<string>("");
  const [debouncedFatturatoMax, setDebouncedFatturatoMax] =
    useState<string>("");
  const [filtroDataUltimoContattoMin, setFiltroDataUltimoContattoMin] =
    useState<string>("");
  const [filtroDataUltimoContattoMax, setFiltroDataUltimoContattoMax] =
    useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [direction, setDirection] = useState<string>("DESC");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRagioneSociale(filtroRagioneSociale);
      setDebouncedFatturatoMin(filtroFatturatoMin);
      setDebouncedFatturatoMax(filtroFatturatoMax);
    }, 500);

    return () => clearTimeout(timer);
  }, [filtroRagioneSociale, filtroFatturatoMin, filtroFatturatoMax]);

  useEffect(() => {
    const fetchClienti = async (pageIndex: number, pageSize: number) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: pageIndex.toString(),
          size: pageSize.toString(),
        });

        if (sortBy !== "dataInserimento") {
          params.append("sortBy", sortBy.trim());
        }
        if (direction !== "DESC") {
          params.append("direction", direction.trim());
        }
        if (filtroFatturatoMin !== "") {
          params.append("fatturatoMinimo", debouncedFatturatoMin.trim());
        }
        if (filtroFatturatoMax !== "") {
          params.append("fatturatoMassimo", debouncedFatturatoMax.trim());
        }
        if (filtroDataInserimentoMin !== "") {
          params.append("dataInserimentoMin", filtroDataInserimentoMin);
        }
        if (filtroDataInserimentoMax !== "") {
          params.append("dataInserimentoMax", filtroDataInserimentoMax);
        }
        if (filtroDataUltimoContattoMin !== "") {
          params.append("dataUltimoContattoMin", filtroDataUltimoContattoMin);
        }
        if (filtroDataUltimoContattoMax !== "") {
          params.append("dataUltimoContattoMax", filtroDataUltimoContattoMax);
        }

        const response = await fetch(`${apiUrl}/clienti?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData: Error = await response.json();
          throw new Error(errorData.message);
        }

        const data: AllClientsResponse = await response.json();
        setClienti(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };

    fetchClienti(page, size);
  }, [
    page,
    size,
    debouncedRagioneSociale,
    filtroDataInserimentoMin,
    filtroDataInserimentoMax,
    debouncedFatturatoMin,
    debouncedFatturatoMax,
    filtroDataUltimoContattoMin,
    filtroDataUltimoContattoMax,
    sortBy,
    direction,
  ]);

  return (
    <Container fluid className="py-3 border-top border-secondary">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="text-white m-0">Elenco Clienti</h2>

        <div className="d-flex align-items-center gap-2 text-white">
          <label htmlFor="pageSizeSelect" className="text-nowrap small">
            Elementi per pagina:
          </label>
          <Form.Select
            id="pageSizeSelect"
            size="sm"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(0);
            }}
            className="bg-dark text-white border-secondary"
            style={{ width: "80px" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
      </div>

      <div className="p-3 mb-4 rounded bg-dark bg-opacity-75 border border-secondary text-white">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6} lg={4}>
            <Form.Group controlId="filterNome">
              <Form.Label className="small mb-1">
                Cerca per Nome / Ragione Sociale
              </Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-secondary border-secondary text-white">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Digita per cercare..."
                  value={filtroRagioneSociale}
                  onChange={(e) => {
                    setFiltroRagioneSociale(e.target.value);
                    setPage(0);
                  }}
                  className="bg-dark text-white border-secondary"
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="filterFatturatoMin">
              <Form.Label className="small mb-1">Fatturato Min (€)</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                min="0"
                step="1000"
                placeholder="Es. 10000"
                value={filtroFatturatoMin}
                onChange={(e) => {
                  setFiltroFatturatoMin(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="filterFatturatoMax">
              <Form.Label className="small mb-1">Fatturato Max (€)</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                min="0"
                step="1000"
                placeholder="Es. 500000"
                value={filtroFatturatoMax}
                onChange={(e) => {
                  setFiltroFatturatoMax(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="filterDataInserimentoMin">
              <Form.Label className="small mb-1">
                Data Inserimento Min
              </Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={filtroDataInserimentoMin}
                onChange={(e) => {
                  setFiltroDataInserimentoMin(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="filterDataInserimentoMax">
              <Form.Label className="small mb-1">
                Data Inserimento Max
              </Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={filtroDataInserimentoMax}
                onChange={(e) => {
                  setFiltroDataInserimentoMax(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="filterDataUltimoContattoMin">
              <Form.Label className="small mb-1">
                Ultimo Contatto Min
              </Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={filtroDataUltimoContattoMin}
                onChange={(e) => {
                  setFiltroDataUltimoContattoMin(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="filterDataUltimoContattoMax">
              <Form.Label className="small mb-1">
                Ultimo Contatto Max
              </Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={filtroDataUltimoContattoMax}
                onChange={(e) => {
                  setFiltroDataUltimoContattoMax(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="sort">
              <Form.Label className="small mb-1">Ordina per</Form.Label>
              <Form.Select
                size="sm"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              >
                <option value="">Ordina</option>
                <option value="ragioneSociale">Ragione Sociale</option>
                <option value="fatturatoAnnuale">Fatturato Annuale</option>
                <option value="dataInserimento">Data di Inserimento</option>
                <option value="dataUltimoContato">Data Ultimo Contatto</option>
                <option value="siglaProvincia">Provincia Sede Legale</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={2}>
            <Form.Group controlId="sort">
              <Form.Label className="small mb-1">Ordina per</Form.Label>
              <Form.Select
                size="sm"
                value={direction}
                onChange={(e) => {
                  setDirection(e.target.value);
                  setPage(0);
                }}
                className="bg-dark text-white border-secondary"
              >
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row className="g-4">
            <Col xs={12} sm={6} md={4} lg={3}>
              <div
                className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100 text-center d-flex flex-column justify-content-center align-items-center border border-secondary"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="mb-3"
                  style={{ color: "#ffc107", fontSize: "3.5rem" }}
                >
                  <i className="bi bi-person-plus"></i>
                </div>
                <h3 className="h5 fw-bold">Crea un nuovo cliente</h3>
                <p className="text-light small m-0">
                  Attiva il profilo di un nuovo cliente
                </p>
              </div>
            </Col>

            {clienti?.length > 0 ? (
              clienti.map((cliente) => (
                <Col key={cliente.idCliente} xs={12} sm={6} md={4} lg={3}>
                  <div
                    className="p-4 rounded shadow bg-dark bg-opacity-75 text-white h-100 text-center d-flex flex-column justify-content-between border border-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <div
                        className="mb-3"
                        style={{ color: "#ffc107", fontSize: "3.5rem" }}
                      >
                        <i className="bi bi-person"></i>
                      </div>
                      <h3 className="h5 fw-bold mb-2">
                        {cliente.ragioneSociale}
                      </h3>
                      <p className="text-light small mb-1">
                        <i className="bi bi-envelope me-2 text-warning"></i>
                        {cliente.email}
                      </p>
                      <p className="text-light small mb-0">
                        <i className="bi bi-telephone me-2 text-warning"></i>
                        {cliente.telefono || "Non specificato"}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-top border-secondary text-center">
                      <span
                        className="badge bg-secondary text-wrap w-100"
                        style={{ wordBreak: "break-word" }}
                      >
                        ID: #{cliente.idCliente}
                      </span>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Col xs={12} sm={6} md={8} lg={9}>
                <div className="text-center text-light py-5 fs-5">
                  Nessun cliente corrisponde ai criteri di ricerca.
                </div>
              </Col>
            )}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination className="pagination-dark">
                <Pagination.First
                  disabled={page === 0}
                  onClick={() => handlePageChange(0)}
                />
                <Pagination.Prev
                  disabled={page === 0}
                  onClick={() => handlePageChange(page - 1)}
                />

                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index === page}
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={page === totalPages - 1}
                  onClick={() => handlePageChange(page + 1)}
                />
                <Pagination.Last
                  disabled={page === totalPages - 1}
                  onClick={() => handlePageChange(totalPages - 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default ClientiList;
