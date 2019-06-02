import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { HistorialClinico } from '../models/historial-clinico';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  private urlEndPoint:string='http://localhost:8080/historial';

  constructor(private http:HttpClient) { }

  public getHistorialPorPaciente(id: number): Observable<HistorialClinico[]>{
    return this.http.get<HistorialClinico[]>(`${this.urlEndPoint}/${id}`);
  }

  public deleteHistorial(id: number): Observable<HistorialClinico>{
    return this.http.delete<HistorialClinico>(`${this.urlEndPoint}/${id}`);
  }
}
