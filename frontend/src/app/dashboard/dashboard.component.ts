import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Por si luego queremos añadir estilos extra
})
export class DashboardComponent {
  
  constructor(private router: Router) {}

  cerrarSesion() {
    // Más adelante aquí limpiaremos los datos de sesión, 
    // por ahora, lo devolvemos a la pantalla de inicio.
    this.router.navigate(['/login']);
  }
}