import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPoint:string = "http://localhost:8080/paciente";
  private urlPacientesHabilitados: string = 'http://127.0.0.1:8080/paciente/habilitados';
  private urlPacientesInhabilitados: string = 'http://127.0.0.1:8080/paciente/inhabilitados';
  private urlPacientesBloqueados: string = 'http://127.0.0.1:8080/paciente/bloqueados';

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

}
