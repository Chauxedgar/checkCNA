import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  // Apuntamos a la ruta de docentes en Django
  private API_URL = 'http://localhost:8000/api/docentes/';

  constructor(private http: HttpClient) {}

  getDocentes(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  crearDocente(datosDocente: any): Observable<any> {
    return this.http.post(this.API_URL, datosDocente);
  }

  actualizarDocente(id: number, datosDocente: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datosDocente);
  }

  eliminarDocente(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }
}