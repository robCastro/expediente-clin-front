import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital';
import { Usuario } from '../models/usuario';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private urlEndPointAprobados:string = 'http://127.0.0.1:8080/hospital/aprobados';
  private urlUserHospAprobados:string = 'http://127.0.0.1:8080/hospital/usuarios/aprobados';
  private urlEndPointPendientes:string = 'http://127.0.0.1:8080/hospital/pendientes';
  private urlUserHospPendientes: string = 'http://127.0.0.1:8080/hospital/usuarios/pendientes';
  private urlEndPointDenegados: string = 'http://127.0.0.1:8080/hospital/denegados';
  private urlUserHospDenegados: string = 'http://127.0.0.1:8080/hospital/usuarios/denegados';
  private urlEndPointCreate: string = 'http://127.0.0.1:8080/hospital/crear';
  private urlEndPoint: string = 'http://127.0.0.1:8080/hospital';
  private urlEndPointHabilitar: string = 'http://127.0.0.1:8080/hospital/habilitar';
  private urlEndPointDenegar: string = 'http://127.0.0.1:8080/hospital/denegar';
  private urlEndPointDesactivar: string = 'http://localhost:8080/hospital/desactivar';
  private urlEndPointDeptoHosp: string = 'http://127.0.0.1:8080/hospital/departamento';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient,private router: Router,
  private authService: AuthService) { }

  private agregarAuthotizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }

    //Hospitales Aprobados.
    getHospitalesAprobados(): Observable<Hospital[]>{
      return this.http.get(this.urlEndPointAprobados).pipe(
        map( response => response as Hospital[])
      );
    }



    //Usuario del Hospital Aprobado y por consiguiente Hospital Aprobado.
    getUserHospitalAprobados(): Observable<Usuario[]>{
      return this.http.get(this.urlUserHospAprobados).pipe(
        map( response => response as Usuario[])
      );
    }

    //Hospitales Pendientes.
    getHospitalesPendientes(): Observable<Hospital[]>{
      return this.http.get(this.urlEndPointPendientes).pipe(
        map( response => response as Hospital[])
      );
    }

    //Usuario del Hospital Aprobado y por consiguiente Hospital Aprobado.
    getUserHospitalPendientes(): Observable<Usuario[]>{
      return this.http.get(this.urlUserHospPendientes).pipe(
        map( response => response as Usuario[])
      );
    }


    //Hospitales Denegados.
    getHospitalesDenegados(): Observable<Hospital[]>{
      return this.http.get(this.urlEndPointDenegados).pipe(
        map( response => response as Hospital[])
      );
    }

    //Usuario del Hospital Denegado y por consiguiente Hospital Denegado
    getUserHospitalDenegados(): Observable<Usuario[]>{
      return this.http.get(this.urlUserHospDenegados).pipe(
        map( response => response as Usuario[])
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

    //Habilitar - Aprobar hospital
    habilitarHospital(hospital: Hospital): Observable<Hospital>{
      return this.http.put<Hospital>(`${this.urlEndPointHabilitar}/${hospital.id}`, hospital, {headers: this.httpHeaders})
    }

    //Denegar hospital
    denegarHospital(hospital: Hospital): Observable<Hospital>{
      return this.http.put<Hospital>(`${this.urlEndPointDenegar}/${hospital.id}`, hospital, {headers: this.httpHeaders})
    }

    //Desactivar Hospital
    desactivarHospital(hospital: Hospital): Observable<Hospital>{
      return this.http.put<Hospital>(`${this.urlEndPointDesactivar}/${hospital.id}`, hospital, {headers: this.httpHeaders})
    }

    //Depto del hospital.
    getDeptoHospital(id): Observable<number> {
      return this.http.get<number>(`${this.urlEndPointDeptoHosp}/${id}`);
    }

}
