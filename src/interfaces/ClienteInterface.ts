//  i campi del DTO per la registrazione del cliente
export interface ClienteFormData {
  ragioneSociale: string;
  partitaIva: string;
  email: string;
  fatturatoAnnuale: number;
  pec: string;
  telefono: string;
  emailContatto: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  tipo: string;
  siglaProvinciaSedeLegale: string;
  denominazioneComuneSedeLegale: string;
  viaSedeLegale: string;
  civicoSedeLegale: string;
  localitaSedeLegale: string;
  capSedeLegale: string;
  siglaProvinciaSedeOperativa: string;
  denominazioneComuneSedeOperativa: string;
  viaSedeOperativa: string;
  civicoSedeOperativa: string;
  localitaSedeOperativa: string;
  capSedeOperativa: string;
}

export interface Provincia {
  sigla: string;
  nome?: string;
}

export interface Comune {
  denominazione?: string;
  nome?: string;
}
