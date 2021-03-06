import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string = "http://localhost:8080/usuario";
  private urlEndPointUsername: string = "http://localhost:8080/usuario/username";
  private urlEndPointHabilitar: string = "http://127.0.0.1:8080/usuario/habilitar";
  private urlEndPointDeshabilitar: string = "http://127.0.0.1:8080/usuario/deshabilitar";
  private urlUserHabHosp: string = 'http://127.0.0.1:8080/usuario/habilitado/hospital';
  private urlUserDeshabHosp: string = 'http://127.0.0.1:8080/usuario/deshabilitado/hospital';
  private urlUserBloqHosp: string =  'http://localhost:8080/usuario/bloqueado/hospital';
  private urlDocHosp: string = 'http://127.0.0.1:8080/cita/doctores/hospital';
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
      this.router.navigate(['/usuario'])
      return true;
    }
    return false;
  }

  public getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint + "/todos");
  }

  public getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  public getUsuarioPorUsername(username: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPointUsername}/${username}`);
  }

  public createUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint + "/crear", usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al crear al usuario, Correo debe ser único',e.error.mensaje,'error');
        return throwError(e);
      })
    );
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

  public habilitarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPointHabilitar}/${usuario.id}`, usuario, {headers: this.httpHeaders})
  }

  public deshabilitarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPointDeshabilitar}/${usuario.id}`,usuario, {headers: this.httpHeaders})
  }

  public usuariosHabilitadosPorHosp(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlUserHabHosp}/${id}`);
  }

  public usuariosDeshabilitadosPorHosp(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlUserDeshabHosp}/${id}`);
  }

  public usuariosBloqueadosPorHosp(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlUserBloqHosp}/${id}`);
  }

  public createUsuarioPaciente(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint + "/crearPaciente", usuario, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        swal.fire('Error al registrar el Paciente',`El correo del usuario debe ser unico, utilice otro correo`, 'error')
        return throwError(e);
      })
    );
  }

  //Actualizar usuario de paciente
    update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders});
  }

  // Obtener doctores por hospital para las citas.
  public doctoresPorHospital(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlDocHosp}/${id}`);
  }
  
}
