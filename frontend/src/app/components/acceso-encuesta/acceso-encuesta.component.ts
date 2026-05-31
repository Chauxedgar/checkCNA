import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acceso-encuesta.component.html',
  styleUrls: ['./acceso-encuesta.component.css']
})
export class AccesoEncuestaComponent {
  credenciales = {
    documento: '',
    contrasena: ''
  };
  mensajeError = '';
  cargando = false;

  constructor(private http: HttpClient, private router: Router) {}

  ingresar() {
    this.mensajeError = '';
    this.cargando = true;

    this.http.post<any>('http://localhost:8000/api/evaluacion/validar-acceso/', this.credenciales)
      .subscribe({
        next: (respuesta) => {
          // Guardamos quién es el usuario para usarlo en la siguiente pantalla
          localStorage.setItem('estamento_activo', respuesta.estamento);
          localStorage.setItem('documento_activo', respuesta.documento);
          
          // Lo enviamos a la ruta de la encuesta (que crearemos después)
          this.router.navigate(['/encuesta']);
          this.cargando = false;
        },
        error: (err) => {
          this.mensajeError = err.error.error || 'Error de conexión con el servidor.';
          this.cargando = false;
        }
      });
  }
}