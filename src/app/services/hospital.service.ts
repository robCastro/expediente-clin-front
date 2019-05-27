import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private urlEndPointAprobados:string = 'http://127.0.0.1:8080/hospital/aprobados';
  private urlEndPointPendientes:string = 'http://127.0.0.1:8080/hospital/pendientes';
  private urlEndPointDenegados: string = 'http://127.0.0.1:8080/hospital/denegados';
  private urlEndPointCreate: string = 'http://127.0.0.1:8080/hospital/crear';
  private urlEndPoint: string = 'http://127.0.0.1:8080/hospital';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

    //Hospitales Aprobados.
    getHospitalesAprobados(): Observable<Hospital[]>{
      return this.http.get(this.urlEndPointAprobados).pipe(
        map( response => response as Hospital[])
      );
    }

    //Hospitales Pendientes.
    getHospitalesPendientes(): Observable<Hospital[]>{
      return this.http.get(this.urlEndPointPendientes).pipe(
        map( response => response as Hospital[])
      );
    }

    //Hospitales Denegados.
    getHospitalesDenegados(): Observable<Hospital[]>{
      return this.http.get(this.urlEndPointDenegados).pipe(
        map( response => response as Hospital[])
      );
    }

    //Crear Hospital
    create(hospital: Hospital): Observable<Hospital> {
      return this.http.post<Hospital>(this.urlEndPointCreate, hospital, {headers: this.httpHeaders});
    }

    //Obtener un Hospital Específico.
    getHospital(id): Observable<Hospital> {
      return this.http.get<Hospital>(`${this.urlEndPoint}/${id}`);
    }

    //Actualizar Hospital
    update(hospital: Hospital): Observable<Hospital>{
      return this.http.put<Hospital>(`${this.urlEndPoint}/${hospital.id}`, hospital, {headers: this.httpHeaders});
    }

    //Eliminar físicamente el Hospital
    delete(id:number): Observable<Hospital>{
      return this.http.delete<Hospital>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    }


}
