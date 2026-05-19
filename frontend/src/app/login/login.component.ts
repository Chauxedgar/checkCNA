import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  datosLogin = {
    username: '',
    password: ''
  };

  mensajeRespuesta = '';

  constructor(private http: HttpClient, private router: Router) {}

  iniciarSesion() {
    if (this.datosLogin.username && this.datosLogin.password) {
      
      this.http.post('http://localhost:8000/api/login/', this.datosLogin)
        .subscribe({
          next: (respuesta: any) => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.mensajeRespuesta = 'Error: Credenciales incorrectas o usuario no existe.';
          }
        });

    } else {
      this.mensajeRespuesta = 'Por favor, llena ambos campos.';
    }
  }
}
