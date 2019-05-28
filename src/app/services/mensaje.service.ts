import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  resultado: boolean;

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  enviarMensaje(msg: string, as: string, em: string): any {
    return this.http.post("http://127.0.0.1:8080/mensaje/enviar",
      {}, //added blank object as request body
      {
        params : {
          'mensaje': msg,
          'asunto': as,
          'email': em
        },
      },
    );
  };
  

}
