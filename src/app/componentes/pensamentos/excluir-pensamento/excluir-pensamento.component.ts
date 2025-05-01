import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    try {
      const pensamento = await this.service.buscarPensamentoPorId(Number(id))
      if (pensamento != null)
        this.pensamento = pensamento
      else
        alert("Pensamento nulo")
    } catch (erro: any) {
      if (erro.error && erro.error.message) {
        alert(erro.error.message);
      } else {
        alert("Erro inesperado");
      }
    }
  }
  excluirPensamento = () => {
    if (this.pensamento.id) {

      this.service.excluirPensamento(this.pensamento.id)
        .subscribe(() => {
          this.router.navigate(['/listarPensamento'])
        })
    }
  }

  cancelarPensamento = () => {
    this.router.navigate(['/listarPensamento'])
  }

}
