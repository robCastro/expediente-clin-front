import { Injectable } from '@angular/core';
import {Medicamento} from 'src/app/models/medicamento';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private urlEndPointsingle: string ='http://localhost:8080/medicamento/lista';

  constructor(private http: HttpClient) { }

  getMedicamentos(id: number): Observable<Medicamento[]> {
    return this.http.get(`${this.urlEndPointsingle}/${id}`).pipe(
      map(response => response as Medicamento[])
    );
  }
}
