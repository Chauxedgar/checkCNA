import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent], // <--- Cargamos el Navbar
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  estadisticas = {
    estudiantes: 0,
    docentes: 0,
    egresados: 0,
    administrativos: 0,
    directivos: 0,
    empleadores: 0
  }
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarResumen();
  }
  cargarResumen() {
    this.dashboardService.obtenerEstadisticas().subscribe({
      next: (datos) => {
        this.estadisticas = datos;
      },
      error: (err) => console.error('Error al cargar las estadísticas', err)
    });
  }
}
