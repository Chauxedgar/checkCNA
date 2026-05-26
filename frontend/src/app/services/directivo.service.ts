import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectivoService {
  private API_URL = 'http://localhost:8000/api/directivos/';

  constructor(private http: HttpClient) {}

  getDirectivos(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  crearDirectivo(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }

  actualizarDirectivo(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datos);
  }

  eliminarDirectivo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }
}