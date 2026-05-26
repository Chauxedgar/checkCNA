import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  listaEstudiantes: any[] = [];
  
  mostrarFormulario = false;
  editando = false; // Variable para saber si estamos creando o editando
  idEstudianteActual: number | null = null; // Guardamos el ID del que estamos editando

  nuevoEstudiante = {
    dni: '',
    nombre: '', // <-- Cambiado a singular
    telefono: '',
    correo: '',
    universidad: 'Universidad de Nariño', // Valores por defecto de tu modelo
    programa: 'Ingeniería en Producción Acuícola', // Valores por defecto de tu modelo
    semestre: '', // En tu modelo es CharField, así que usamos comillas en vez de null
    tipo: 'Estudiante' 
  };

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe({
      next: (datos) => this.listaEstudiantes = datos,
      error: (err) => console.error('Error al cargar', err)
    });
  }

  abrirForm() {
    this.mostrarFormulario = true;
  }

  cerrarForm() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.idEstudianteActual = null;
    this.nuevoEstudiante = { dni: '', nombre: '', telefono: '', correo: '', universidad: 'Universidad de Nariño', programa: 'Ingeniería en Producción Acuícola', semestre: '', tipo: 'Estudiante' };
  }

  // NUEVO: Función que se ejecuta al darle clic al botón amarillo
  cargarDatosParaEdicion(estudiante: any) {
    this.editando = true;
    this.idEstudianteActual = estudiante.id;
    this.nuevoEstudiante = { 
      dni: estudiante.dni, 
      nombre: estudiante.nombre, // <-- Singular
      telefono: estudiante.telefono,
      correo: estudiante.correo,
      universidad: estudiante.universidad,
      programa: estudiante.programa,
      semestre: estudiante.semestre,
      tipo: estudiante.tipo // <-- Incluimos tipo
    };
    this.abrirForm();
  }

  // MODIFICADO: Ahora decide si guarda uno nuevo o actualiza uno existente
  guardarEstudiante() {
    if (this.editando && this.idEstudianteActual !== null) {
      // Modo Edición
      this.estudianteService.actualizarEstudiante(this.idEstudianteActual, this.nuevoEstudiante).subscribe({
        next: () => {
          alert('¡Estudiante actualizado con éxito!');
          this.cargarEstudiantes();
          this.cerrarForm();
        },
        error: (err) => alert('Error al actualizar.')
      });
    } else {
      // Modo Creación (como lo tenías antes)
      this.estudianteService.crearEstudiante(this.nuevoEstudiante).subscribe({
        next: () => {
          alert('¡Estudiante registrado con éxito!');
          this.cargarEstudiantes();
          this.cerrarForm();
        },
        error: (err) => alert('Error al guardar.')
      });
    }
  }

  eliminarEstudiante(id: number) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este estudiante?');
    if (confirmacion) {
      this.estudianteService.eliminarEstudiante(id).subscribe({
        next: () => {
          alert('Estudiante eliminado correctamente.');
          this.cargarEstudiantes();
        },
        error: (err) => alert('Hubo un error al eliminar.')
      });
    }
  }
}