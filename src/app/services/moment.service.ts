import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MomentService {
  // No environment definiu a baseApiUrl, para ser utilizada ao longo do projeto e ir mudando o path
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(
    private http: HttpClient,
  ) { }

  // Criar o momento. POST
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }
}
