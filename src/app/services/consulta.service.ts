import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Consulta } from '../models/consulta';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private urlEndPoint:string = "http://localhost:8080/consulta";
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

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

  updateSignosV(consulta: Consulta): Observable<Consulta>{
    return this.http.put<Consulta>(`${this.urlEndPoint}/signos_vitales/${consulta.id}`, consulta, {headers: this.httpHeaders});
  }

  getConsulta(id): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.urlEndPoint}/${id}`);
  }
}
