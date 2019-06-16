import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Consulta } from '../models/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CitaService {

  //URLs.
  private urlCitasPorDoctor: string = 'http://127.0.0.1:8080/cita/doctor';
  private urlEndPointCreate: string = 'http://127.0.0.1:8080/cita/crear_cita';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }


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

  //Crear Cita.
  create(cita: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.urlEndPointCreate, cita, {headers: this.httpHeaders});
  }
}
