import { Injectable } from '@angular/core';
import {Municipio} from 'src/app/models/municipio';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private urlEndPointsingle: string ='http://localhost:8080/municipio/lista';
  private urlEndPoint: string ='http://localhost:8080/municipio';
  constructor(private http: HttpClient) { }

  getMunicipios(id: number): Observable<Municipio[]> {
    return this.http.get(`${this.urlEndPointsingle}/${id}`).pipe(
      map(response => response as Municipio[])
    );
  }

  public getMunicipio(id: number): Observable<Municipio>{
    return this.http.get<Municipio>(`${this.urlEndPoint}/${id}`);
  }
}
