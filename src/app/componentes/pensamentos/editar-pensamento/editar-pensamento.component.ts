import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento:Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private service:PensamentoService,
    private router:Router,
    private route:ActivatedRoute

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPensamentoPorId(Number(id))
      .subscribe((pensamento) => {
        this.pensamento = pensamento;
      })
  }

  editarPensamento = () => {
    if(this.pensamento.id){
      this.service.atualizarPensamento(this.pensamento)
      .subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelarPensamento = () => {
    this.router.navigate(['/listarPensamento'])
  }
}
