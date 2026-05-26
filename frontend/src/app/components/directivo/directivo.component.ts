import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivoService } from '../../services/directivo.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaGenericaComponent } from '../tabla-generica/tabla-generica.component';

@Component({
  selector: 'app-directivos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, TablaGenericaComponent],
  templateUrl: './directivos.component.html',
  styleUrls: ['./directivos.component.css']
})
export class DirectivosComponent implements OnInit {
  listaDirectivos: any[] = [];
  mostrarFormulario = false;
  editando = false;
  idActual: number | null = null;

  columnas = [
    { encabezado: 'ID', llave: 'id' },
    { encabezado: 'Documento', llave: 'dni' },
    { encabezado: 'Nombre', llave: 'nombre' },
    { encabezado: 'Teléfono', llave: 'telefono' },
    { encabezado: 'Correo', llave: 'correo' },
    { encabezado: 'Universidad', llave: 'universidad' },
    { encabezado: 'Programa', llave: 'programa' },
    { encabezado: 'Cargo', llave: 'cargo' }
  ];

  nuevoRegistro = {
    dni: '', nombre: '', telefono: '', correo: '', 
    universidad: 'Universidad de Nariño', programa: 'Ingeniería en Producción Acuícola', cargo: ''
  };

  constructor(private apiService: DirectivoService) {}

  ngOnInit(): void { this.cargarDatos(); }

  cargarDatos() {
    this.apiService.getDirectivos().subscribe({
      next: (datos) => this.listaDirectivos = datos,
      error: (err) => console.error(err)
    });
  }

  abrirForm() { this.mostrarFormulario = true; }
  cerrarForm() { 
    this.mostrarFormulario = false; this.editando = false; this.idActual = null;
    this.nuevoRegistro = { dni: '', nombre: '', telefono: '', correo: '', universidad: 'Universidad de Nariño', programa: 'Ingeniería en Producción Acuícola', cargo: '' };
  }

  cargarParaEdicion(item: any) {
    this.editando = true; this.idActual = item.id;
    this.nuevoRegistro = { ...item };
    this.abrirForm();
  }

  guardar() {
    if (this.editando && this.idActual) {
      this.apiService.actualizarDirectivo(this.idActual, this.nuevoRegistro).subscribe({
        next: () => { alert('Actualizado'); this.cargarDatos(); this.cerrarForm(); }
      });
    } else {
      this.apiService.crearDirectivo(this.nuevoRegistro).subscribe({
        next: () => { alert('Registrado'); this.cargarDatos(); this.cerrarForm(); }
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar registro?')) {
      this.apiService.eliminarDirectivo(id).subscribe({
        next: () => { alert('Eliminado'); this.cargarDatos(); }
      });
    }
  }
}
