import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { HistorialClinico } from 'src/app/models/historial-clinico';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {
  private urlEndPoint:string = "http://localhost:8080/historial";
  private urlEndPointGet:string = "http://localhost:8080/historial/uno";
    private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  public createUsuario(historial: HistorialClinico): Observable<HistorialClinico>{
    return this.http.post<HistorialClinico>(this.urlEndPoint + "/crear", historial, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al crear el historial clinico',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  update(historial: HistorialClinico): Observable<HistorialClinico>{
    return this.http.put<HistorialClinico>(`${this.urlEndPoint}/${historial.id}`, historial, {headers: this.httpHeaders});
  }

  getHistorial(id): Observable<HistorialClinico> {
    return this.http.get<HistorialClinico>(`${this.urlEndPointGet}/${id}`);
  }
}
