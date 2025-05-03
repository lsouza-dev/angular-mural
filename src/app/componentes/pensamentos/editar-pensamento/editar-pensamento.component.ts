import { map } from 'rxjs';
import { Pensamento } from './../Pensamento';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) {

  }

  async ngOnInit() {
    
    
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
      ]
    })
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      const pensamento = await this.service.buscarPensamentoPorId(id);

      if (pensamento != null) {
        this.pensamento = pensamento;
        this.formulario.patchValue({
          'conteudo': this.pensamento.conteudo,
          'autoria': this.pensamento.autoria,
          'modelo': this.pensamento.modelo
        })
      } else {
        console.log("Pensamento nulo");
      }
    } catch (erro: any) {
      if (erro.error && erro.error.message) {
        alert(erro.error.message); 
      } else {
        alert("Erro inesperado");
      }
    }
  }

  editarPensamento = async () => {
    if (this.pensamento.id && this.formulario.valid) {
      
      this.pensamento = {
        ...this.pensamento,
        ...this.formulario.value  
      }

      try {
        console.log("Formulário válido... Atualizndo")
        await this.service.atualizarPensamento(this.pensamento)
          .subscribe({
            next: (pensamento:Pensamento) => {
              console.log(pensamento)
              this.router.navigate(['/listarPensamento'])
            },
            error: (erro) => {
              if (erro.error && erro.error.message)
                alert(erro.error.message);

              else alert
                ('Erro inesperado. Tente novamente mais tarde.');
            },
            complete: () =>{
              console.log(this.pensamento);
            }
          })
      } catch (e) {
        alert(e)
      }
    }
  }

  cancelarPensamento = () => {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao = () => {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado'
  }
}
