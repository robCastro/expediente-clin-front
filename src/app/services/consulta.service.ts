import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Consulta } from '../models/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private urlEndPoint:string = "http://localhost:8080/consulta";
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  updateSignosV(consulta: Consulta): Observable<Consulta>{
    return this.http.put<Consulta>(`${this.urlEndPoint}/signos_vitales/${consulta.id}`, consulta, {headers: this.httpHeaders});
  }

  getConsulta(id): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.urlEndPoint}/${id}`);
  }
}
