import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EgresadoService {
  private API_URL = 'http://localhost:8000/api/egresados/'; // Verifica que tu urls.py de Django diga 'egresados'

  constructor(private http: HttpClient) {}

  getEgresados(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  crearEgresado(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }

  actualizarEgresado(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datos);
  }

  eliminarEgresado(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }
}