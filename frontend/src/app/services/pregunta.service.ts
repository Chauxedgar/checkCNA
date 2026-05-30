import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private API_URL = 'http://localhost:8000/api/evaluacion/preguntas/';
  private INDICADORES_URL = 'http://localhost:8000/api/evaluacion/indicadores/';

  constructor(private http: HttpClient) {}

  // Métodos para Preguntas
  getPreguntas(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  crearPregunta(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }

  actualizarPregunta(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datos);
  }

  eliminarPregunta(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }

  // Método extra para traer los indicadores y llenar el menú desplegable
  getIndicadores(): Observable<any> {
    return this.http.get(this.INDICADORES_URL);
  }
}