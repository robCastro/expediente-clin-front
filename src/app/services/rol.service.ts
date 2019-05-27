import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlEndPoint: string = "http://localhost:8080/rol";
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { 
  }

  public getRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlEndPoint + "/todos");
  }

  public getRol(id): Observable<Rol>{
    return this.http.get<Rol>(`${this.urlEndPoint}/${id}`);
  }
}
