import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';

import { MessagesService } from 'src/app/services/messages.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText: string = 'Compartilhar!';
  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  // É um método assíncrono, pois vai trabalhar com a API
  async createHandler(moment: Moment) {
    // console.log('evento emitido do filho para o pai')

    //Transforma o formulário do Angular em um formData, quando trabalha com arquivos. A transmissão de dados pelo form pode ser de 2 formas, ou por json (quando não há arquivos) ou FormData, quando há arquivos.
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    // A imagem é opicional, então precisa validar se existe imagem para fazer o append no formData:
    if (moment.image) {
      formData.append('image', moment.image);
    }

    // TODO:
    // Enviar para o Service
    await this.momentService.createMoment(formData).subscribe();

    // Exibir mensagem
    this.messagesService.add('Momento Adicionado');

    // Redirect
    this.route.navigate(['/']);
  }
}
