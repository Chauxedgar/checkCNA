import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreguntaService } from '../../services/pregunta.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaGenericaComponent } from '../tabla-generica/tabla-generica.component';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, TablaGenericaComponent],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  listaPreguntas: any[] = [];
  listaIndicadores: any[] = []; // Para llenar el menú desplegable
  
  mostrarFormulario = false;
  editando = false;
  idActual: number | null = null;

  columnas = [
    { encabezado: 'ID', llave: 'id' },
    { encabezado: 'Indicador (ID)', llave: 'indicador' },
    { encabezado: 'Enunciado', llave: 'enunciado' },
    { encabezado: 'Dirigido a', llave: 'estamento_dirigido' }
  ];

  nuevaPregunta = {
    indicador: '',
    enunciado: '',
    estamento_dirigido: ''
  };

  estamentosDisponibles = ['Estudiantes', 'Docentes', 'Egresados', 'Administrativos', 'Directivos', 'Empleadores', 'Todos'];

  constructor(private apiService: PreguntaService) {}

  ngOnInit(): void { 
    this.cargarDatos(); 
    this.cargarIndicadores();
  }

  cargarDatos() {
    this.apiService.getPreguntas().subscribe({
      next: (datos) => this.listaPreguntas = datos,
      error: (err) => console.error(err)
    });
  }

  cargarIndicadores() {
    this.apiService.getIndicadores().subscribe({
      next: (datos) => this.listaIndicadores = datos,
      error: (err) => console.error('Error cargando indicadores', err)
    });
  }

  abrirForm() { this.mostrarFormulario = true; }
  
  cerrarForm() { 
    this.mostrarFormulario = false; 
    this.editando = false; 
    this.idActual = null;
    this.nuevaPregunta = { indicador: '', enunciado: '', estamento_dirigido: '' };
  }

  cargarParaEdicion(item: any) {
    this.editando = true; 
    this.idActual = item.id;
    this.nuevaPregunta = { ...item };
    this.abrirForm();
  }

  guardar() {
    if (this.editando && this.idActual) {
      this.apiService.actualizarPregunta(this.idActual, this.nuevaPregunta).subscribe({
        next: () => { alert('Pregunta actualizada'); this.cargarDatos(); this.cerrarForm(); },
        error: (err) => alert('Error al actualizar: ' + JSON.stringify(err.error))
      });
    } else {
      this.apiService.crearPregunta(this.nuevaPregunta).subscribe({
        next: () => { alert('Pregunta registrada'); this.cargarDatos(); this.cerrarForm(); },
        error: (err) => alert('Error al guardar: ' + JSON.stringify(err.error))
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta pregunta del banco?')) {
      this.apiService.eliminarPregunta(id).subscribe({
        next: () => { alert('Eliminada'); this.cargarDatos(); }
      });
    }
  }
}