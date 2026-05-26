import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private API_URL = 'http://localhost:8000/api/estudiantes/';

  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // Método para enviar un estudiante nuevo a la base de datos
  crearEstudiante(datosEstudiante: any): Observable<any> {
    return this.http.post(this.API_URL, datosEstudiante);
  }

  // NUEVO: Método para eliminar un estudiante por su ID
  eliminarEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }
  // NUEVO: Método para actualizar (editar) un estudiante
  actualizarEstudiante(id: number, datosEstudiante: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datosEstudiante);
  }
}