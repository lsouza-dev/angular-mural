
import { Pensamento } from '../Pensamento';
import { Component, Input, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  titulo!:string
  paginaAtual:number = 0;
  haMaisPensamentosParent:boolean = true;
  filtro:string = "";

  listaFavoritosParent!:Pensamento[]
  constructor(private service:PensamentoService
  ) { }

  async ngOnInit() {
    this.recarregarComponente();
  }

  recarregarComponente = async () =>{ 
    this.paginaAtual = 0
    this.titulo = "Meu Mural"
    await this.service.listarPensamentos(this.paginaAtual,this.filtro)
    .subscribe({
      next: (listaPensamento) =>{
        this.listaPensamentos = listaPensamento;
      },
      complete: () =>{
        this.haMaisPensamentosParent = this.listaPensamentos.length >= 4 ? true : false;
        console.log(this.listaPensamentos)
      }
    })
  }
  carregarMaisPensamentos = async () => {
    await this.service.listarPensamentos(++this.paginaAtual,this.filtro)
    .subscribe((listaPensamentos) => {
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length)
          this.haMaisPensamentosParent = false;
    })

  }

  carregarMaisPensamentosFavoritos = async () => {
    await this.service.listarFavoritos(++this.paginaAtual,this.filtro)
    .subscribe((listaPensamentos) => {
      this.listaFavoritosParent.push(...listaPensamentos)
      if(!this.listaFavoritosParent.length)
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

  listarPensamentosFavoritos = async () => {
    this.titulo = "Meus Favoritos"
    this.paginaAtual = 0;

    await this.service.listarFavoritos(this.paginaAtual,this.filtro)
    .subscribe({
      next: (pensamentos) => {
        this.listaPensamentos = pensamentos
        this.listaFavoritosParent = pensamentos
      },
      error: (erro) => {
        if (erro.error && erro.error.message)
          alert(erro.error.message);

        else
          alert("Um erro inesperado aconteceu.");
      },
      complete: () => {
        this.haMaisPensamentosParent = this.listaFavoritosParent.length >= 4 ? true : false
      }
    })
  }
}
