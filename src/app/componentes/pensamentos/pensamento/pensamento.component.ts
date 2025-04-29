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
    modelo: ''
  }
  

  constructor() { }

  ngOnInit(): void {
  }

  larguraPensamento = (): string => {
    if(this.pensamento.conteudo.length >= 150) return 'pensamento-g'
    else return 'pensamento-p'
  }

}
