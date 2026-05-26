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
    nombres: '',
    semestre: null,
    correo: '',
    telefono: '',
    universidad: '',
    programa: ''
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
    this.nuevoEstudiante = { dni: '', nombres: '', semestre: null, correo: '', telefono: '', universidad: '', programa: '' };
  }

  // NUEVO: Función que se ejecuta al darle clic al botón amarillo
  cargarDatosParaEdicion(estudiante: any) {
    this.editando = true;
    this.idEstudianteActual = estudiante.id;
    // Copiamos los datos del estudiante seleccionado al formulario
    this.nuevoEstudiante = { 
      dni: estudiante.dni, 
      nombres: estudiante.nombres,
      semestre: estudiante.semestre,
      correo: estudiante.correo,
      telefono: estudiante.telefono,
      universidad: estudiante.universidad,
      programa: estudiante.programa
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