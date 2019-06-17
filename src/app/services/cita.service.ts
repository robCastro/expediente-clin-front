import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Consulta } from '../models/consulta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CitaService {

  //URLs.
  private urlCitasPorDoctor: string = 'http://127.0.0.1:8080/cita/doctor';
  private urlEndPointCreate: string = 'http://127.0.0.1:8080/cita/crear_cita';
  private urlCitasPendientes: string = 'http://127.0.0.1:8080/cita/pendientes';
  private urlCitasPasadas: string = 'http://127.0.0.1:8080/cita/pasadas';
  private urlCitasPendientesDoc: string = 'http://127.0.0.1:8080/cita/pendientesDoc';
  private urlCitasPasadasDoc: string = 'http://127.0.0.1:8080/cita/pasadasDoc';

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

  private isNoAutorizado(e): boolean{
    if(e.status==401 ){

      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status==403 ){
      swal.fire('Acceso Denegado',`Hola ${this.authService.usuario.username},no tienes aaceso a este recurso!`,'warning');
      this.router.navigate(['/citas'])
      return true;
    }
    return false;
  }


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

  //citas Pendientes
  CitasPendientes(id: number): Observable<Consulta[]>{
    return this.http.get(`${this.urlCitasPendientes}/${id}`).pipe(
      map( response => response as Consulta[])
    )
  }

  //citas Pasadas
  CitasPasadas(id: number): Observable<Consulta[]>{
    return this.http.get(`${this.urlCitasPasadas}/${id}`).pipe(
      map( response => response as Consulta[])
    )
  }

  //citas Pendientes DOctor
  CitasPendientesDoctor(id: number): Observable<Consulta[]>{
    return this.http.get(`${this.urlCitasPendientesDoc}/${id}`).pipe(
      map( response => response as Consulta[])
    )
  }

  //citas Pasadas Doctor
  CitasPasadasDoctor(id: number): Observable<Consulta[]>{
    return this.http.get(`${this.urlCitasPasadasDoc}/${id}`).pipe(
      map( response => response as Consulta[])
    )
  }

}
