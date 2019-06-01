import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string = "http://localhost:8080/usuario";
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint + "/todos");
  }

  public getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  public createUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint + "/crear", usuario, {headers: this.httpHeaders});
  }

  public createUsuarioInactivo(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint + "/crear_inactivo", usuario, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        swal.fire('Error al registrar el Hospital',`El correo del usuario debe ser unico, utilice otro correo`, 'error')
        return throwError(e);
      })
    );
  }

  public deleteUsuario(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  public editUsuario(usuario: Usuario, id: number): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${id}`, usuario, {headers: this.httpHeaders});
  }
}
