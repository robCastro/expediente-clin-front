import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { HistorialClinico } from '../models/historial-clinico';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {
  private urlEndPoint:string = "http://localhost:8080/historial";
  private urlEndPointGet:string = "http://localhost:8080/historial/uno";
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
      this.router.navigate(['/historial'])
      return true;
    }
    return false;
  }

  public createUsuario(historial: HistorialClinico): Observable<HistorialClinico>{
    return this.http.post<HistorialClinico>(this.urlEndPoint + "/crear", historial, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al crear el historial clinico',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  update(historial: HistorialClinico): Observable<HistorialClinico>{
    return this.http.put<HistorialClinico>(`${this.urlEndPoint}/${historial.id}`, historial, {headers: this.httpHeaders});
  }

  getHistorial(id): Observable<HistorialClinico> {
    return this.http.get<HistorialClinico>(`${this.urlEndPointGet}/${id}`);
  }


  public getHistorialPorPaciente(id: number): Observable<HistorialClinico[]>{
    return this.http.get<HistorialClinico[]>(`${this.urlEndPoint}/${id}`);
  }

  public deleteHistorial(id: number): Observable<HistorialClinico>{
    return this.http.delete<HistorialClinico>(`${this.urlEndPoint}/${id}`);
  }
}
