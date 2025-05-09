import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './Pensamento';
import { Observable, firstValueFrom, map } from 'rxjs';
import { PensamentoPaginado } from './PensamentoPaginado';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:8080/pensamentos'

  constructor(private http: HttpClient) { }

  listarPensamentos = (pagina:number,trecho:string): Observable<Pensamento[]> => {
    const itensPorPagina = 4;

    let params = new 
      HttpParams()
        .set("page",pagina)
        .set("size",itensPorPagina)
        .set("trecho",trecho.trim())

    const url = `${this.API}/listar`
    
    return this.http.get<PensamentoPaginado>(url,{params})
      .pipe(map(response => response.content))
  }

  criarPensamento = (pensamento: Pensamento): Observable<Pensamento> => {
    return this.http.post<Pensamento>(this.API + '/criar', pensamento);
  }

  excluirPensamento = (id: number): Observable<Pensamento> => {
    const url = `${this.API}/excluir/${id}`;
    return this.http.delete<Pensamento>(url)
  }

  atualizarPensamento = (pensamento: Pensamento): Observable<Pensamento> => {
    const url = `${this.API}/atualizar/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  buscarPensamentoPorId = async (id: number): Promise<Pensamento> => {
    const url = `${this.API}/${id}`;
    return await firstValueFrom(this.http.get<Pensamento>(url));
  };

  atualizarFavorito = (id:number): Observable<Pensamento> => {
    const url = `${this.API}/favoritar/${id}`
    return this.http.put<Pensamento>(url,{});
  }

  listarFavoritos = (pagina:number, trecho:string) : Observable<Pensamento[]> => {
    const itensPorPagina = 4;

    let params = new 
      HttpParams()
        .set("page",pagina)
        .set("size",itensPorPagina)
        .set("trecho",trecho.trim())

    const url = `${this.API}/listar/favoritos`
    
    return this.http.get<PensamentoPaginado>(url,{params})
      .pipe(map(response => response.content))
  }

}
