import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private urlEndPoint: string ='http://localhost:8080/especialidad';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

 public getEspecialidades(): Observable<Especialidad[]>{
   return this.http.get<Especialidad[]>(this.urlEndPoint + "/lista");
 }

 public getEspecialidad(id: number): Observable<Especialidad>{
   return this.http.get<Especialidad>(`${this.urlEndPoint + "/especialidad"}/${id}`)
 }

  create(especialidad: Especialidad) : Observable<Especialidad> {
    return this.http.post<Especialidad>(this.urlEndPoint + "/crear" , especialidad, {headers: this.httpHeaders})
  }

  update(especialidad: Especialidad): Observable<Especialidad>{
    return this.http.put<Especialidad>(`${this.urlEndPoint + "/especialidad"}/${especialidad.id}`, especialidad, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Especialidad>{
    return this.http.delete<Especialidad>(`${this.urlEndPoint}/${id}` ,{headers: this.httpHeaders});
  }

}
