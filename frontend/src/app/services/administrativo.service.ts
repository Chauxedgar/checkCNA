import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {
  private API_URL = 'http://localhost:8000/api/administrativos/';

  constructor(private http: HttpClient) {}

  getAdministrativos(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  crearAdministrativo(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }

  actualizarAdministrativo(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}${id}/`, datos);
  }

  eliminarAdministrativo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`);
  }
}