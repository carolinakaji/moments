import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string; // o ! mostra que não precisa ser inicializado, vai ser inicializado depois
  @Output() onSubmit = new EventEmitter<Moment>();

  momentForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // Inicializar o formulário no ngOnInit
    // Declarar todos campos que pode e terá no formulário
    // FormControl, controla o inuput por meio das validações
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  // Quando trabalha com formulário reativo, não se inicializa as propriedades da maneira normal, ex: title: string. Tem que iniciar por meio de um getter:
  // Mesmo inicializando com o getter, ainda dá erro, dizendo que o objeto pode ser null, e os valores podem não existir quando for inicializado o momentForm. Então precisa colocar ! para indicar ao Angular que vão sim existir:
  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  // Responsável por jogar a imagem no formulário.
  // Quando o input mudar (evento change), aciona o método
  onFileSelected(event: any) {
    // Pegar o arquivo do input. Pega o primeiro arquivo, pois pode ser enviado mais de um arquivo
    const file: File = event.target.files[0];

    // um método para inserir no formulário, sem ser pelo formControl
    this.momentForm.patchValue({ image: file })
  }


  submit() {
    // Precisa ter uma trava de formulário inválido, senão mesmo estando inválido, ele vai enviar o formulário. Então se o form for inválido, ele não retorna nada e não termina a submissão, e fica travado na validação:
    if (this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }

}
