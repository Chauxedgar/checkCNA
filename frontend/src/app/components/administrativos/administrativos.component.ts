import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministrativoService } from '../../services/administrativo.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaGenericaComponent } from '../tabla-generica/tabla-generica.component';

@Component({
  selector: 'app-administrativos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, TablaGenericaComponent],
  templateUrl: './administrativos.component.html',
  styleUrls: ['./administrativos.component.css']
})
export class AdministrativosComponent implements OnInit {
  listaAdministrativos: any[] = [];
  mostrarFormulario = false;
  editando = false;
  idActual: number | null = null;

  columnas = [
    { encabezado: 'ID', llave: 'id' },
    { encabezado: 'Documento', llave: 'dni' },
    { encabezado: 'Nombre', llave: 'nombre' },
    { encabezado: 'Teléfono', llave: 'telefono' },
    { encabezado: 'Correo', llave: 'correo' },
    { encabezado: 'Cargo', llave: 'cargo' }
  ];

  nuevoRegistro = {
    dni: '', nombre: '', telefono: '', correo: '', 
    universidad: 'Universidad de Nariño', programa: 'Ingeniería en Producción Acuícola', cargo: ''
  };

  constructor(private apiService: AdministrativoService) {}

  ngOnInit(): void { this.cargarDatos(); }

  cargarDatos() {
    this.apiService.getAdministrativos().subscribe({
      next: (datos) => this.listaAdministrativos = datos,
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
      this.apiService.actualizarAdministrativo(this.idActual, this.nuevoRegistro).subscribe({
        next: () => { alert('Actualizado'); this.cargarDatos(); this.cerrarForm(); }
      });
    } else {
      this.apiService.crearAdministrativo(this.nuevoRegistro).subscribe({
        next: () => { alert('Registrado'); this.cargarDatos(); this.cerrarForm(); }
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar registro?')) {
      this.apiService.eliminarAdministrativo(id).subscribe({
        next: () => { alert('Eliminado'); this.cargarDatos(); }
      });
    }
  }
}
