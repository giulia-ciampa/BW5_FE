import {
  useState,
  useEffect,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import type {
  ClienteFormData,
  Provincia,
  Comune,
} from "../interfaces/ClienteInterface";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { ErrorWithList } from "../interfaces/interfaces";

function FormCliente() {
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;
  const accessToken = useSelector(
    (rootState: RootState) => rootState.auth.accessToken,
  );

  const [formData, setFormData] = useState<ClienteFormData>({
    ragioneSociale: "",
    partitaIva: "",
    email: "",
    fatturatoAnnuale: 0,
    pec: "",
    telefono: "",
    emailContatto: "",
    nomeContatto: "",
    cognomeContatto: "",
    telefonoContatto: "",
    tipo: "SRL",
    siglaProvinciaSedeLegale: "",
    denominazioneComuneSedeLegale: "",
    viaSedeLegale: "",
    civicoSedeLegale: "",
    localitaSedeLegale: "",
    capSedeLegale: "",
    siglaProvinciaSedeOperativa: "",
    denominazioneComuneSedeOperativa: "",
    viaSedeOperativa: "",
    civicoSedeOperativa: "",
    localitaSedeOperativa: "",
    capSedeOperativa: "",
  });

  const [province, setProvince] = useState<Provincia[]>([]);
  const [comuniLegale, setComuniLegale] = useState<Comune[]>([]);
  const [comuniOperativa, setComuniOperativa] = useState<Comune[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    fetch(apiurl + "/province", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: Provincia[]) => setProvince(data))
      .catch((err) => console.error("Errore fetch province:", err));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "fatturatoAnnuale" ? Number(value) : value,
    });
  };

  const handleProvinciaLegaleChange = async (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const sigla = e.target.value;
    setFormData({
      ...formData,
      siglaProvinciaSedeLegale: sigla,
      denominazioneComuneSedeLegale: "",
    });

    if (!sigla) {
      setComuniLegale([]);
      return;
    }

    try {
      const response = await fetch(apiurl + `/comuni/${sigla}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const data: Comune[] = await response.json();
      setComuniLegale(data);
      console.log(data);
    } catch (err) {
      console.error("Errore fetch comuni sede legale:", err);
    }
  };

  const handleProvinciaOperativaChange = async (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const sigla = e.target.value;
    setFormData({
      ...formData,
      siglaProvinciaSedeOperativa: sigla,
      denominazioneComuneSedeOperativa: "",
    });

    if (!sigla) {
      setComuniOperativa([]);
      return;
    }

    try {
      const response = await fetch(apiurl + `/comuni/${sigla}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const data: Comune[] = await response.json();
      setComuniOperativa(data);
    } catch (err) {
      console.error("Errore fetch comuni sede operativa:", err);
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(apiurl + "/clienti", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Cliente registrato con successo!");
        navigate("/home");
      } else {
        const data: ErrorWithList = await response.json();
        if (data.errorsList)
          alert(
            data.errorsList.map(
              (error) => "Errore: " + error.replace("-", "") + "\n",
            ),
          );
      }
    } catch (err) {
      console.error(err);
      alert("Impossibile connettersi al server");
    }
  };

  return (
    <Container className="w-75 py-5">
      <Form
        onSubmit={handleSubmit}
        className="border border-4 border-warning rounded-3 p-4 bg-dark text-white shadow-lg"
      >
        <h3 className="text-center text-warning mb-4 fw-bold">
          Registrazione Cliente
        </h3>

        <h5 className="text-warning mb-3 border-bottom pb-2">
          Dati Principali
        </h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Ragione Sociale</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="ragioneSociale"
                value={formData.ragioneSociale}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Partita IVA</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="partitaIva"
                value={formData.partitaIva}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Email Aziendale</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">PEC</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="email"
                name="pec"
                value={formData.pec}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Telefono</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">
                Fatturato Annuale
              </Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="number"
                name="fatturatoAnnuale"
                value={formData.fatturatoAnnuale}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Tipo Azienda</Form.Label>
              <Form.Select
                className="bg-secondary text-white border-0"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="SRL">SRL</option>
                <option value="SPA">SPA</option>
                <option value="SAS">SAS</option>
                <option value="SNC">SNC</option>
                <option value="PAA">PAA</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <h5 className="text-warning mt-4 mb-3 border-bottom pb-2">
          Referente / Contatto
        </h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Nome Contatto</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="nomeContatto"
                value={formData.nomeContatto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Cognome Contatto</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="cognomeContatto"
                value={formData.cognomeContatto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Email Contatto</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="email"
                name="emailContatto"
                value={formData.emailContatto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">
                Telefono Contatto
              </Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="telefonoContatto"
                value={formData.telefonoContatto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="text-warning mt-4 mb-3 border-bottom pb-2">
          Sede Legale
        </h5>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Via Sede Legale</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="viaSedeLegale"
                value={formData.viaSedeLegale}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Civico</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="civicoSedeLegale"
                value={formData.civicoSedeLegale}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Località</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="localitaSedeLegale"
                value={formData.localitaSedeLegale}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">CAP</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="capSedeLegale"
                value={formData.capSedeLegale}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Provincia</Form.Label>
              <Form.Select
                className="bg-secondary text-white border-0"
                name="siglaProvinciaSedeLegale"
                value={formData.siglaProvinciaSedeLegale}
                onChange={handleProvinciaLegaleChange}
                required
              >
                <option value="">Provincia...</option>
                {province.map((p) => (
                  <option key={p.sigla} value={p.sigla}>
                    {p.sigla}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Comune</Form.Label>
              <Form.Select
                className="bg-secondary text-white border-0"
                name="denominazioneComuneSedeLegale"
                value={formData.denominazioneComuneSedeLegale}
                onChange={handleChange}
                required
                disabled={!formData.siglaProvinciaSedeLegale}
              >
                <option value="">Comune...</option>
                {comuniLegale.map((c, index) => {
                  const nomeComune = c.denominazione || c.nome || "";
                  return (
                    <option
                      className="text-light"
                      key={index}
                      value={nomeComune}
                    >
                      {nomeComune}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <h5 className="text-warning mt-4 mb-3 border-bottom pb-2">
          Sede Operativa
        </h5>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">
                Via Sede Operativa
              </Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="viaSedeOperativa"
                value={formData.viaSedeOperativa}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Civico</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="civicoSedeOperativa"
                value={formData.civicoSedeOperativa}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Località</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="localitaSedeOperativa"
                value={formData.localitaSedeOperativa}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">CAP</Form.Label>
              <Form.Control
                className="bg-secondary text-white border-0"
                type="text"
                name="capSedeOperativa"
                value={formData.capSedeOperativa}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Provincia</Form.Label>
              <Form.Select
                className="bg-secondary text-white border-0"
                name="siglaProvinciaSedeOperativa"
                value={formData.siglaProvinciaSedeOperativa}
                onChange={handleProvinciaOperativaChange}
                required
              >
                <option value="">Provincia...</option>
                {province.map((p) => (
                  <option key={p.sigla} value={p.sigla}>
                    {p.sigla}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Comune</Form.Label>
              <Form.Select
                className="bg-secondary text-white border-0"
                name="denominazioneComuneSedeOperativa"
                value={formData.denominazioneComuneSedeOperativa}
                onChange={handleChange}
                required
                disabled={!formData.siglaProvinciaSedeOperativa}
              >
                <option value="">Comune...</option>
                {comuniOperativa.map((c, index) => {
                  const nomeComune = c.denominazione || c.nome || "";
                  return (
                    <option key={index} value={nomeComune}>
                      {nomeComune}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button
            type="submit"
            variant="warning"
            className="px-5 fw-bold text-dark"
          >
            Registra Cliente
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormCliente;
