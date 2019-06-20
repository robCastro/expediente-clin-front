import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Tratamiento } from '../models/tratamiento';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
    private urlEndPointCreate:string = 'http://127.0.0.1:8080/tratamiento/crear';
    private urlEndPoint:string = 'http://127.0.0.1:8080/tratamiento/lista';
    private urlEndPointDelete:string = 'http://127.0.0.1:8080/tratamiento';
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


  create(tratamiento: Tratamiento): Observable<Tratamiento> {
    console.log(tratamiento.fechaFin)
    return this.http.post<Tratamiento>(this.urlEndPointCreate, tratamiento, {headers: this.httpHeaders});
  }

  public getTratamientoPorConsulta(id: number): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>(`${this.urlEndPoint}/${id}`);
  }

  public delete(id: number): Observable<Tratamiento>{
    return this.http.delete<Tratamiento>(`${this.urlEndPointDelete}/${id}`);
  }
}
