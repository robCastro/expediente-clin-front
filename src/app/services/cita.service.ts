import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Consulta } from '../models/consulta';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CitaService {

  //URLs.
  private urlEndPoint: string = 'http://127.0.0.1:8080/cita';
  private urlCitasPorDoctor: string = 'http://127.0.0.1:8080/cita/doctor';
  private urlCitasPorPaciente: string = 'http://127.0.0.1:8080/cita/paciente';
  private urlEndPointCreate: string = 'http://127.0.0.1:8080/cita/crear_cita';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  //Citas por doctor.
  citasPorDoctor(id_doc: string, id_hos: string): any {
    return this.http.get("http://127.0.0.1:8080/cita/doctor",
      {
        params : {
          'id_doctor': id_doc,
          'id_hospital': id_hos
        },
      },
    );
  };

  //Citas por paciente.
  citasPorPaciente(id_pac: string, id_hos: string): any {
    return this.http.get("http://127.0.0.1:8080/cita/paciente",
      {
        params : {
          'id_paciente': id_pac,
          'id_hospital': id_hos
        },
      },
    );
  };

  //Crear Cita.
  create(cita: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.urlEndPointCreate, cita, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //Eliminar físicamente la cita (unicamente si no es consulta).
  delete(id:number): Observable<Consulta>{
    return this.http.delete<Consulta>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
}
