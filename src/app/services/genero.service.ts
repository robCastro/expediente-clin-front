import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Genero } from '../models/genero';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private urlEndPoint: string ='http://localhost:8080/genero';
  private urlEndPointget: string ='http://localhost:8080/genero/lista';
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

  public getGeneros(): Observable<Genero[]>{
    return this.http.get(this.urlEndPointget).pipe(
       map(response => response as Genero[])
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
     this.router.navigate(['/genero'])
     return true;
   }
   return false;
 }

 getGenero(id: number): Observable<Genero>{
   return this.http.get<Genero>(`${this.urlEndPoint + "/genero"}/${id}`)
 }

  create(genero: Genero) : Observable<Genero> {
    return this.http.post<Genero>(this.urlEndPoint +"/crear", genero, {headers: this.httpHeaders})
  }

  update(genero: Genero): Observable<Genero>{
    return this.http.put<Genero>(`${this.urlEndPoint + "/genero"}/${genero.id}`, genero, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Genero>{
    return this.http.delete<Genero>(`${this.urlEndPoint}/${id}`);
  }

}
