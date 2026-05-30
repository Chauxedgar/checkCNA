import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadorService } from '../../services/empleador.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaGenericaComponent } from '../tabla-generica/tabla-generica.component';

@Component({
  selector: 'app-empleador',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, TablaGenericaComponent],
  templateUrl: './empleador.component.html',
  styleUrls: ['./empleador.component.css']
})
export class EmpleadorComponent implements OnInit {
  listaEmpleadores: any[] = [];
  mostrarFormulario = false;
  editando = false;
  idActual: number | null = null;

  columnas = [
    { encabezado: 'ID', llave: 'id' },
    { encabezado: 'Documento', llave: 'dni' },
    { encabezado: 'Nombre', llave: 'nombre' },
    { encabezado: 'Teléfono', llave: 'telefono' },
    { encabezado: 'Correo', llave: 'correo' },
    { encabezado: 'Empresa', llave: 'empresa' },
  ];

  nuevoRegistro = {
    dni: '', nombre: '', telefono: '', correo: '', empresa: ''
  };

  constructor(private apiService: EmpleadorService) {}

  ngOnInit(): void { this.cargarDatos(); }

  cargarDatos() {
    this.apiService.getEmpleadores().subscribe({
      next: (datos) => this.listaEmpleadores = datos,
      error: (err) => console.error(err)
    });
  }

  abrirForm() { this.mostrarFormulario = true; }
  cerrarForm() { 
    this.mostrarFormulario = false; this.editando = false; this.idActual = null;
    this.nuevoRegistro = { dni: '', nombre: '', telefono: '', correo: '', empresa: '' };
  }

  cargarParaEdicion(item: any) {
    this.editando = true; this.idActual = item.id;
    this.nuevoRegistro = { ...item };
    this.abrirForm();
  }

  guardar() {
    if (this.editando && this.idActual) {
      this.apiService.actualizarEmpleador(this.idActual, this.nuevoRegistro).subscribe({
        next: () => { alert('Actualizado'); this.cargarDatos(); this.cerrarForm(); }
      });
    } else {
      this.apiService.crearEmpleador(this.nuevoRegistro).subscribe({
        next: () => { alert('Registrado'); this.cargarDatos(); this.cerrarForm(); }
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar registro?')) {
      this.apiService.eliminarEmpleador(id).subscribe({
        next: () => { alert('Eliminado'); this.cargarDatos(); }
      });
    }
  }
}
