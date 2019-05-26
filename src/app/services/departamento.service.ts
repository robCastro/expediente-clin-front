import { Injectable } from '@angular/core';
import {Departamento} from 'src/app/models/departamento';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
    private urlEndPointGet: string ='http://localhost:8080/departamento/todos';
    private urlEndPoint: string ='http://localhost:8080/departamento';
  constructor(private http: HttpClient) { }

  public getDepartamentos(): Observable<Departamento[]> {
    return this.http.get(this.urlEndPointGet).pipe(
       map(response => response as Departamento[])
      );
 }

 public getDepartamento(id: number): Observable<Departamento>{
   return this.http.get<Departamento>(`${this.urlEndPoint}/${id}`);
 }
}
