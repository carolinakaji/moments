import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  // TODO: search
  searchTerm: string = '';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe(items => {
      const data = items.data;
      data.map(item => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      })

      this.allMoments = data;
      this.moments = data;
    });

  }

  search(event: Event): void {
    // No typescripte, para pegar o valor do evento, é necessário fazer os passos:
    const target = event.target as HTMLInputElement; // declara que é um input
    const value = target.value // pega o valor

    // Filtra o allMoments, onde o moment.title que vai ser exibido tem que ter um valor incluso, que é o includes(). O includes, verifica se no moment.title, possui o value, recuperado do input.
    this.moments = this.allMoments.filter((moment) => moment.title.toLowerCase().includes(value));
  }

}
