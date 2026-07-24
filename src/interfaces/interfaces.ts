// To parse this data:
//
//   import { Convert, Page } from "./file";
//
//   const page = Convert.toPage(json);

export interface Page {
  cliente: Cliente[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: Pageable
  size: number
  sort: Sort
  totalElements: number
  totalPages: number
}

export interface StatoFattura {
  statoFatturaId: string
  stato: string
}

export interface Fattura {
  fatturaId: string
  data: string
  importo: number
  numero: number
  cliente: Cliente
  stato: StatoFattura
}

export interface Cliente {
  ragioneSociale: string
  partitaIva: string
  email: string
  fatturatoAnnuale: number
  pec: string
  telefono: string
  emailContatto: string
  nomeContatto: string
  cognomeContatto: string
  telefonoContatto: string
  tipo: string
  utente: Utente
  sedeLegale: Sede
  sedeOperativa: Sede
  attivo: boolean
  dataInserimento: Date
  dataUltimoContatto: Date
  idCliente: string
  logoAziendale: string
}

export interface Sede {
  via: string
  civico: string
  localita: null
  cap: string
  comune: Comune
  indirizzoId: string
}

export interface Comune {
  codiceProvincia: number
  progressivoComune: number
  denominazione: string
  provincia: Provincia
  comuneId: string
}

export interface Provincia {
  sigla: string
  nome: string
  regione: string
  provinciaId: string
}

export interface Utente {
  username: string
  email: string
  nome: string
  cognome: string
  attivo: boolean
  authorities: Authority[]
  avatar: string
  credentialsNonExpired: boolean
  utenteId: string
}

export interface Authority {
  authority: string
}

export interface Pageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: Sort
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPage(json: string): Page {
    return JSON.parse(json)
  }

  public static pageToJson(value: Page): string {
    return JSON.stringify(value)
  }
}

export interface ErrorWithList {
  message: string
  timestamp: string
  errorsList: string[]
}
