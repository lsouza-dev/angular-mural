import { Pensamento } from '../Pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: ''
  }
  constructor(
    private service:PensamentoService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  criarPensamento = () => {
    this.service.criarPensamento(this.pensamento)
      .subscribe({
        next: () => {
          this.router.navigate(['/listarPensamento']);
        },
        error: (erro) => {
          if (erro.error && erro.error.message) {
            alert(erro.error.message); // aqui mostra o erro enviado pelo backend
          } else {
            alert('Erro inesperado. Tente novamente mais tarde.');
          }
        }
      });
  }
  

  cancelarPensamento = () =>{
    this.router.navigate(['/listarPensamento'])
  }

}
