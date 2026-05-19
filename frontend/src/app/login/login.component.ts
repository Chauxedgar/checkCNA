import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  datosLogin = { username: '', password: '' };
  mensajeRespuesta = '';

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.datosLogin).subscribe({
      next: (res) => this.router.navigate(['/dashboard']),
      error: (err) => this.mensajeRespuesta = 'Credenciales inválidas'
    });
  }
}