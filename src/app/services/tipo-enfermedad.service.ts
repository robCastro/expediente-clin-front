import { Injectable } from '@angular/core';
import {TipoEnfermedad} from 'src/app/models/tipo-enfermedad';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoEnfermedadService {
    private urlEndPointGet: string ='http://localhost:8080/tipoEnfermedad/todos';

  constructor(private http: HttpClient) { }

  public getTipoEnfermedades(): Observable<TipoEnfermedad[]> {
    return this.http.get(this.urlEndPointGet).pipe(
       map(response => response as TipoEnfermedad[])
      );
 }
}
