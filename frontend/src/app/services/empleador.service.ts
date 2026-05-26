import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadorService {
  private API_URL = 'http://localhost:8000/api/empleadores/';

  constructor(private http: HttpClient) {}

  getEmpleadores(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  crearEmpleador(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }

  actualizarEmpleador(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datos);
  }

  eliminarEmpleador(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }
}