import { Injectable } from '@angular/core';
import {Enfermedad} from 'src/app/models/enfermedad';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private urlEndPointsingle: string ='http://localhost:8080/enfermedad/lista';

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


  getEnfermedades(id: number): Observable<Enfermedad[]> {
    return this.http.get(`${this.urlEndPointsingle}/${id}`).pipe(
      map(response => response as Enfermedad[])
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
      this.router.navigate(['/enfermedad/lista'])
      return true;
    }
    return false;
  }

}
