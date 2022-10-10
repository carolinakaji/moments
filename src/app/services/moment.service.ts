import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Response } from '../Response';
import { Moment } from '../Moment';

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

  // GET - Recupera os momentos do banco de dados
  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  // GET - Recupera o momento do banco de dados, de acordo com o id
  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  // POST - Criar o momento.
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  // DELETE
  removeMoment(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);

  }
}
