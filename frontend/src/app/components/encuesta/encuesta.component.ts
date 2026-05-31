import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  estamentoActivo: string = '';
  documentoActivo: string = '';
  preguntas: any[] = [];
  respuestas: any = {}; // Guardará los datos en formato: { id_pregunta: valor_likert }
  enviando: boolean = false;
  encuestaCompletada: boolean = false;

  // Definición exacta de la escala Likert institucional
  escalaLikert = [
    { valor: 5, texto: 'Totalmente de acuerdo' },
    { valor: 4, texto: 'De acuerdo' },
    { valor: 3, texto: 'Ni de acuerdo ni en desacuerdo' },
    { valor: 2, texto: 'En desacuerdo' },
    { valor: 1, texto: 'Totalmente en desacuerdo' },
    { valor: 0, texto: 'No Sabe / No Aplica' }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // 1. Verificar quién es el usuario que acaba de pasar por el login
    this.estamentoActivo = localStorage.getItem('estamento_activo') || '';
    this.documentoActivo = localStorage.getItem('documento_activo') || '';

    // Si alguien intenta entrar directamente a la URL sin pasar por el login, lo expulsamos
    if (!this.estamentoActivo || !this.documentoActivo) {
      this.router.navigate(['/acceso-encuesta']);
      return;
    }

    // 2. Traer el examen correcto
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.http.get<any[]>(`http://localhost:8000/api/evaluacion/cuestionario/${this.estamentoActivo}/`)
      .subscribe({
        next: (datos) => {
          this.preguntas = datos;
        },
        error: (err) => console.error('Error al cargar las preguntas:', err)
      });
  }

  enviarEncuesta() {
    // Validar que el usuario no deje preguntas en blanco
    if (Object.keys(this.respuestas).length < this.preguntas.length) {
      alert('Por favor, responda todas las preguntas antes de enviar su evaluación.');
      return;
    }

    this.enviando = true;

    // Transformar las respuestas al formato que espera Django
    const respuestasArray = Object.keys(this.respuestas).map(key => ({
      pregunta_id: parseInt(key),
      valoracion: this.respuestas[key]
    }));

    const payload = {
      estamento: this.estamentoActivo,
      documento: this.documentoActivo,
      respuestas: respuestasArray
    };

    // Enviar el paquete a la base de datos
    this.http.post('http://localhost:8000/api/evaluacion/cuestionario/', payload)
      .subscribe({
        next: () => {
          this.encuestaCompletada = true;
          this.enviando = false;
          // Borrar los rastros de seguridad
          localStorage.removeItem('estamento_activo');
          localStorage.removeItem('documento_activo');
        },
        error: (err) => {
          alert('Ocurrió un error al guardar la encuesta. Verifique su conexión e intente de nuevo.');
          console.error(err);
          this.enviando = false;
        }
      });
  }
  
  salir() {
    this.router.navigate(['/acceso-encuesta']);
  }
}
