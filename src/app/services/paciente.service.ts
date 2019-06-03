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
  private urlPacientesHabilitados: string = 'http://127.0.0.1:8080/paciente/habilitados';
  private urlEndPoint: string = 'http://localhost:8080/paciente';
  private urlPacientesInhabilitados: string = 'http://127.0.0.1:8080/paciente/inhabilitados';
  private urlPacientesBloqueados: string = 'http://127.0.0.1:8080/paciente/bloqueados';
  private urlActivarPaciente: string = 'http://127.0.0.1:8080/paciente/activar';
  private urlDesactivarPaciente: string = 'http://127.0.0.1:8080/paciente/desactivar';


  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  //Pacientes habilitados de un hospital específico.
  pacientesHabilitadosPorHospital(id: number): Observable<Paciente[]>{
    return this.http.get(`${this.urlPacientesHabilitados}/${id}`).pipe(
      map( response => response as Paciente[])
    )
  }

  //Pacientes inhabilitados de un hospital específico.
  pacientesInhabilitadosPorHospital(id: number): Observable<Paciente[]>{
    return this.http.get(`${this.urlPacientesInhabilitados}/${id}`).pipe(
      map( response => response as Paciente[])
    )
  }

  //Pacientes bloqueados de un hospital específico.
  pacientesBloqueadosPorHospital(id: number): Observable<Paciente[]>{
    return this.http.get(`${this.urlPacientesBloqueados}/${id}`).pipe(
      map( response => response as Paciente[])
    )
  }

  //Paciente por id.
  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.urlEndPoint}/${id}`)
  }

  //Activar Paciente
  activarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.urlActivarPaciente}/${paciente.id}`,paciente, {headers: this.httpHeaders})
  }

  //Desactivar Paciente
  desactivarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.urlDesactivarPaciente}/${paciente.id}`,paciente, {headers: this.httpHeaders})
  }



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
