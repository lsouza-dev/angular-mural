import { Pensamento } from './Pensamento';

export interface PensamentoPaginado {
    content: Pensamento[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  }
  