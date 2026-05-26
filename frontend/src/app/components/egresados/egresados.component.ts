import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EgresadoService } from '../../services/egresado.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaGenericaComponent } from '../tabla-generica/tabla-generica.component';

@Component({
  selector: 'app-egresados',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, TablaGenericaComponent],
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent implements OnInit {
  listaEgresados: any[] = [];
  mostrarFormulario = false;
  editando = false;
  idEgresadoActual: number | null = null;

  // Configuración de la tabla genérica
  columnasEgresados = [
    { encabezado: 'ID', llave: 'id' },
    { encabezado: 'Cédula', llave: 'dni' },
    { encabezado: 'Nombre', llave: 'nombre' },
    { encabezado: 'Teléfono', llave: 'telefono' },
    { encabezado: 'Correo', llave: 'correo' },
    { encabezado: 'Universidad', llave: 'universidad' },
    { encabezado: 'Programa', llave: 'programa' },
    { encabezado: 'Tipo', llave: 'tipo' },
    { encabezado: 'Rol', llave: 'rol' },
    { encabezado: 'Empresa', llave: 'empresa' }
  ];

  nuevoEgresado = {
    dni: '',
    nombre: '',
    telefono: '',
    correo: '',
    universidad: 'Universidad de Nariño',
    programa: 'Ingeniería en Producción Acuícola',
    tipo: 'Egresado',
    rol: '',
    empresa: '' // Nuevo campo para la empresa del egresado
  };

  constructor(private egresadoService: EgresadoService) {}

  ngOnInit(): void {
    this.cargarEgresados();
  }

  cargarEgresados() {
    this.egresadoService.getEgresados().subscribe({
      next: (datos) => this.listaEgresados = datos,
      error: (err) => console.error('Error', err)
    });
  }

  abrirForm() {
    this.mostrarFormulario = true;
  }

  cerrarForm() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.idEgresadoActual = null;
    this.nuevoEgresado = { dni: '', nombre: '', telefono: '', correo: '', universidad: 'Universidad de Nariño', programa: 'Ingeniería en Producción Acuícola', tipo: 'Egresado', rol: '', empresa: '' };
  }

  cargarDatosParaEdicion(egresado: any) {
    this.editando = true;
    this.idEgresadoActual = egresado.id;
    this.nuevoEgresado = { ...egresado }; // Truco rápido para copiar todos los datos
    this.abrirForm();
  }

  guardarEgresado() {
    if (this.editando && this.idEgresadoActual !== null) {
      this.egresadoService.actualizarEgresado(this.idEgresadoActual, this.nuevoEgresado).subscribe({
        next: () => {
          alert('Egresado actualizado con éxito');
          this.cargarEgresados();
          this.cerrarForm();
        },
        error: () => alert('Error al actualizar.')
      });
    } else {
      this.egresadoService.crearEgresado(this.nuevoEgresado).subscribe({
        next: () => {
          alert('Egresado registrado con éxito');
          this.cargarEgresados();
          this.cerrarForm();
        },
        error: () => alert('Error al guardar. Verifica los datos.')
      });
    }
  }

  eliminarEgresado(id: number) {
    if (confirm('¿Deseas eliminar este egresado?')) {
      this.egresadoService.eliminarEgresado(id).subscribe({
        next: () => {
          alert('Eliminado correctamente');
          this.cargarEgresados();
        },
        error: () => alert('Error al eliminar')
      });
    }
  }
}