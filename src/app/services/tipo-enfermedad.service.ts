import { Injectable } from '@angular/core';
import {TipoEnfermedad} from 'src/app/models/tipo-enfermedad';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TipoEnfermedadService {
    private urlEndPointGet: string ='http://localhost:8080/tipoEnfermedad/todos';

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


  public getTipoEnfermedades(): Observable<TipoEnfermedad[]> {
    return this.http.get(this.urlEndPointGet).pipe(
       map(response => response as TipoEnfermedad[])
      );
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
     this.router.navigate(['/tipoEnfermedad'])
     return true;
   }
   return false;
 }

}
