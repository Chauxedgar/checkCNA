import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocenteService } from '../../services/docente.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaGenericaComponent } from '../tabla-generica/tabla-generica.component'; // Importamos la fábrica de tablas

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, TablaGenericaComponent], // Añadida aquí
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  listaDocentes: any[] = [];
  mostrarFormulario = false;
  editando = false;
  idDocenteActual: number | null = null;

  // 1. Le decimos a la tabla genérica qué columnas pintar y qué llaves buscar
  columnasDocentes = [
    { encabezado: 'ID', llave: 'id' },
    { encabezado: 'DNI', llave: 'dni' },
    { encabezado: 'Nombre', llave: 'nombre' },
    { encabezado: 'Teléfono', llave: 'telefono' },
    { encabezado: 'Correo', llave: 'correo' },
    { encabezado: 'Universidad', llave: 'universidad' },
    { encabezado: 'Programa', llave: 'programa' }
  ];

  // 2. Modelo exacto calcado de Django
  nuevoDocente = {
    dni: '', 
    nombre: '',
    telefono: '',
    correo: '',
    universidad: 'Universidad de Nariño',
    programa: 'Ingeniería en Producción Acuícola'
  };

  constructor(private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.cargarDocentes();
  }

  cargarDocentes() {
    this.docenteService.getDocentes().subscribe({
      next: (datos) => this.listaDocentes = datos,
      error: (err) => console.error('Error al cargar', err)
    });
  }

  abrirForm() {
    this.mostrarFormulario = true;
  }

  cerrarForm() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.idDocenteActual = null;
    this.nuevoDocente = { 
      dni: '', nombre: '', telefono: '', correo: '', 
      universidad: 'Universidad de Nariño', programa: 'Ingeniería en Producción Acuícola' 
    };
  }

  cargarDatosParaEdicion(docente: any) {
    this.editando = true;
    this.idDocenteActual = docente.id;
    this.nuevoDocente = { 
      dni: docente.dni, 
      nombre: docente.nombre,
      telefono: docente.telefono,
      correo: docente.correo,
      universidad: docente.universidad,
      programa: docente.programa
    };
    this.abrirForm();
  }

  guardarDocente() {
    if (this.editando && this.idDocenteActual !== null) {
      this.docenteService.actualizarDocente(this.idDocenteActual, this.nuevoDocente).subscribe({
        next: () => {
          alert('¡Docente actualizado con éxito!');
          this.cargarDocentes();
          this.cerrarForm();
        },
        error: (err) => alert('Error al actualizar. Revisa la consola.')
      });
    } else {
      this.docenteService.crearDocente(this.nuevoDocente).subscribe({
        next: () => {
          alert('¡Docente registrado con éxito!');
          this.cargarDocentes();
          this.cerrarForm();
        },
        error: (err) => {
          console.error(err);
          alert('Error al guardar. Asegúrate de que el DNI sea único y válido.');
        }
      });
    }
  }

  eliminarDocente(id: number) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este docente?');
    if (confirmacion) {
      this.docenteService.eliminarDocente(id).subscribe({
        next: () => {
          alert('Docente eliminado correctamente.');
          this.cargarDocentes();
        },
        error: (err) => alert('Hubo un error al eliminar.')
      });
    }
  }
}