import { Injectable } from '@angular/core';
import {Enfermedad} from 'src/app/models/enfermedad';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private urlEndPointsingle: string ='http://localhost:8080/enfermedad/lista';

  constructor(private http: HttpClient) { }


  getEnfermedades(id: number): Observable<Enfermedad[]> {
    return this.http.get(`${this.urlEndPointsingle}/${id}`).pipe(
      map(response => response as Enfermedad[])
    );
  }
}
