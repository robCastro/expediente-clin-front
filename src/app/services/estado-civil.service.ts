import { Injectable } from '@angular/core';
import { EstadoCivil } from '../models/estado-civil';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {
  private urlEndPointTodos:string = 'http://127.0.0.1:8080/estado_civil/todos';
  private urlEndPointActivos:string = 'http://127.0.0.1:8080/estado_civil/activos';
  private urlEndPointCreate:string = 'http://127.0.0.1:8080/estado_civil/crear';
  private urlEndPoint: string = 'http://127.0.0.1:8080/estado_civil';
  private urlEndPointEliminarLog: string = 'http://127.0.0.1:8080/estado_civil/eliminar';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  //Todos los estados civiles.
  getEstadosCiviles(): Observable<EstadoCivil[]>{
    return this.http.get(this.urlEndPointTodos).pipe(
      map( response => response as EstadoCivil[])
    );
  }

  //Estados Civiles Activos.
  getEstadosCivilesActivos(): Observable<EstadoCivil[]>{
    return this.http.get(this.urlEndPointActivos).pipe(
      map( response => response as EstadoCivil[])
    );
  }

  //Crear Estado Civil.
  create(estadoCivil: EstadoCivil): Observable<EstadoCivil> {
    return this.http.post<EstadoCivil>(this.urlEndPointCreate, estadoCivil, {headers: this.httpHeaders});
  }

  //Obtener un Estado Civil específico.
  getEstadoCivil(id): Observable<EstadoCivil> {
    return this.http.get<EstadoCivil>(`${this.urlEndPoint}/${id}`);
  }

  //Actualizar Estado Civil.
  update(estadoCivil: EstadoCivil): Observable<EstadoCivil>{
    return this.http.put<EstadoCivil>(`${this.urlEndPoint}/${estadoCivil.id}`, estadoCivil, {headers: this.httpHeaders});
  }

  //Eliminar físicamente el Estado Civil.
  delete(id:number): Observable<EstadoCivil>{
    return this.http.delete<EstadoCivil>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

  //Eliminar Logícamente el Estado Civil.
  deleteLogico(estadoCivil: EstadoCivil): Observable<EstadoCivil>{
    return this.http.put<EstadoCivil>(`${this.urlEndPointEliminarLog}/${estadoCivil.id}`, estadoCivil, {headers: this.httpHeaders});
  }
  
}
