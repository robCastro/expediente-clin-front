import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Paciente } from '../models/paciente';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPointCreate: string = 'http://localhost:8080/paciente/crear';
  private urlEndPoint: string = 'http://localhost:8080/paciente';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  //Crear Paciente
  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.urlEndPointCreate, paciente, {headers: this.httpHeaders});
  }

  //Actualizar Paciente
    update(paciente: Paciente): Observable<Paciente>{
    return this.http.put<Paciente>(`${this.urlEndPoint}/${paciente.id}`, paciente, {headers: this.httpHeaders});
  }

  public editPaciente(paciente: Paciente, id: number): Observable<Paciente>{
    return this.http.put<Paciente>(`${this.urlEndPoint}/${id}`, paciente, {headers: this.httpHeaders});
  }
}
