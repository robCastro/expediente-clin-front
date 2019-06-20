import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GrupoTerapeutico} from 'src/app/models/grupo-terapeutico';

@Injectable({
  providedIn: 'root'
})
export class GrupoTerapeuticoService {
  private urlEndPointGet: string ='http://localhost:8080/grupo_tera/todos';
  constructor(private http: HttpClient) { }

  public getGruposTera(): Observable<GrupoTerapeutico[]> {
    return this.http.get(this.urlEndPointGet).pipe(
       map(response => response as GrupoTerapeutico[])
      );
 }
}
