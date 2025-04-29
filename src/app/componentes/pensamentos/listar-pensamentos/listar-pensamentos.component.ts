import { Pensamento } from '../Pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  constructor(private service:PensamentoService) { }

  ngOnInit(): void {
    this.service.listarPensamentos().subscribe((listaPensamentos) => {
      console.log(listaPensamentos);
      this.listaPensamentos = listaPensamentos;
    });
  }


}
