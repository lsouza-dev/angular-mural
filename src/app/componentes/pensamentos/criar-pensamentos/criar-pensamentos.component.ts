import { Pensamento } from '../Pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {


  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(5),
          Validators.pattern(/\S+/)
        ]),
      ],

      autoria: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(95),
          Validators.minLength(5)
        ])
      ],

      modelo: [
        ['',
          Validators.required,
          Validators.maxLength(10)
        ]
      ],
      favorito: [false]
    })
  }

  criarPensamento = () => {
    console.log(this.formulario.get('autoria')?.errors)
    if (this.formulario.valid) {
      this.service.criarPensamento(this.formulario.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/listarPensamento']);
          },
          error: (erro) => {
            if (erro.error && erro.error.message)
              alert(erro.error.message); // aqui mostra o erro enviado pelo backend
            else
              alert('Erro inesperado. Tente novamente mais tarde.');

          }
        });
    }
  }


  cancelarPensamento = () => {
    this.router.navigate(['/listarPensamento'])
  }


  habilitarBotao = () => {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado'
  }
}
