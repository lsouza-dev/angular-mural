import { Pensamento } from '../Pensamento';
import { Component, Input, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  paginaAtual:number = 0;
  haMaisPensamentosParent:boolean = true;
  filtro:string = "";

  constructor(private service:PensamentoService) { }

  async ngOnInit() {
    await this.service.listarPensamentos(this.paginaAtual,this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  carregarMaisPensamentos = async () => {
    await this.service.listarPensamentos(++this.paginaAtual,this.filtro)
    .subscribe((listaPensamentos) => {
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length)
          this.haMaisPensamentosParent = false;
    })

  }

  buscarPensamentosPorTrecho = async () => {
    this.haMaisPensamentosParent =  true;
    this.paginaAtual = 0;

    await this.service.listarPensamentos(this.paginaAtual,this.filtro)
      .subscribe({
        next: (pensamentos) => {
          this.listaPensamentos = pensamentos;
        },
        error: (erro) => {
          if (erro.error && erro.error.message)
            alert(erro.error.message);

          else
            alert("Um erro inesperado aconteceu.");
        },
        complete: () => {
          console.log(this.listaPensamentos)
        }
      })
    
  }
}
