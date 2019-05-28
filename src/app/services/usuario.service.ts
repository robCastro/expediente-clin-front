import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string = "http://localhost:8080/usuario";
  private urlEndPointHabilitar: string = "http://127.0.0.1:8080/usuario/habilitar";
  private urlEndPointDeshabilitar: string = "http://127.0.0.1:8080/usuario/deshabilitar";
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

  public deleteUsuario(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  public editUsuario(usuario: Usuario, id: number): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${id}`, usuario, {headers: this.httpHeaders});
  }

  public habilitarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPointHabilitar}/${usuario.id}`, usuario, {headers: this.httpHeaders})
  }

  public deshabilitarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPointDeshabilitar}/${usuario.id}`,usuario, {headers: this.httpHeaders})
  }
}
