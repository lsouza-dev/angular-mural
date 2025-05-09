import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../Pensamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento:Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: true
  }
  
  @Input() listaFavoritos!:Pensamento[]

  constructor(private service:PensamentoService) { }

  ngOnInit(): void {
  }

  larguraPensamento = (): string => {
    if(this.pensamento.conteudo.length >= 150) return 'pensamento-g'
    else return 'pensamento-p'
  }

  mudarIconeFavorito = ():string =>{
    return this.pensamento.favorito  ? "ativo" : "inativo";
  }

  atualizarFavorito = (id:number) => {
    this.service.atualizarFavorito(id)
    .subscribe(p => this.pensamento = p )

    if(this.pensamento.favorito) this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento),1);
  }

}
