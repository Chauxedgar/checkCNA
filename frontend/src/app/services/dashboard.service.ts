import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = 'http://localhost:8000/api/dashboard/stats/';

  constructor(private http: HttpClient) { }
  obtenerEstadisticas(): Observable<any> {
    return this.http.get(this.API_URL);  
  }
}