import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Genero } from '../models/genero';

@Injectable()
export class EspecialidadService {

  private urlEndPoint: string ='http://localhost:8080/genero/crear';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  public getGeneros(): Observable<Genero[]>{
   return this.http.get<Genero[]>(this.urlEndPoint + "/lista");
 }

 getGenero(id: number): Observable<Genero>{
   return this.http.get<Genero>(`${this.urlEndPoint + "/genero"}/${id}`)
 }

  create(genero: Genero) : Observable<Genero> {
    return this.http.post<Genero>(this.urlEndPoint +"/crear", genero, {headers: this.httpHeaders})
  }

  update(genero: Genero): Observable<Genero>{
    return this.http.put<Genero>(`${this.urlEndPoint + "/genero"}/${genero.id}`, genero, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Genero>{
    return this.http.delete<Genero>(`${this.urlEndPoint}/${id}`);
  }

}
