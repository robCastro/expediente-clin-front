import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Especialidad } from '../models/especialidad';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private urlEndPoint: string ='http://localhost:8080/especialidad';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,private router: Router,
  private authService: AuthService) { }

  private agregarAuthotizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }

  public getEspecialidadesRob(): Observable<Especialidad[]>{
    return this.http.get<Especialidad[]>(this.urlEndPoint);
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
      this.router.navigate(['/especialidad'])
      return true;
    }
    return false;
  }


 public getEspecialidades(): Observable<Especialidad[]>{
   return this.http.get<Especialidad[]>(this.urlEndPoint + "/lista", {headers: this.agregarAuthotizationHeader()}).pipe(
     catchError(e =>{
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );

 }

 public getEspecialidad(id: number): Observable<Especialidad>{
   return this.http.get<Especialidad>(`${this.urlEndPoint + "/especialidad"}/${id}`, {headers: this.agregarAuthotizationHeader()}).pipe(
     catchError(e =>{
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

  create(especialidad: Especialidad) : Observable<Especialidad> {
    return this.http.post<Especialidad>(this.urlEndPoint + "/crear" , especialidad, {headers: this.agregarAuthotizationHeader()})
    .pipe(
      map((response: any) => response.especialidad as Especialidad),
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if (e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
    })
  );
}


  update(especialidad: Especialidad): Observable<Especialidad>{
    return this.http.put<Especialidad>(`${this.urlEndPoint + "/especialidad"}/${especialidad.id}`, especialidad, {headers: this.agregarAuthotizationHeader()})
    .pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if (e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
    })
  );
}

  delete(id: number): Observable<Especialidad>{
    return this.http.delete<Especialidad>(`${this.urlEndPoint}/${id}` ,{headers: this.agregarAuthotizationHeader()})
    .pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if (e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
    })
  );
  }

}
