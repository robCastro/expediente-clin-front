import { Injectable } from '@angular/core';
import {Pais} from 'src/app/models/pais'
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private urlEndPointGet: string ='http://localhost:8080/pais/todos';
  private urlEndPoint: string ='http://localhost:8080/pais';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) { }

  public getPaises(): Observable<Pais[]> {
    return this.http.get(this.urlEndPointGet).pipe(
       map(response => response as Pais[])
      );
 }

 public getPais(id: number): Observable<Pais>{
   return this.http.get<Pais>(`${this.urlEndPoint}/${id}`);
 }
}
