import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-generica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.css']
})
export class TablaGenericaComponent {
  // Entradas (Lo que el componente recibe)
  @Input() titulo: string = 'Gestión de Registros';
  @Input() columnas: { encabezado: string, llave: string }[] = [];
  @Input() datos: any[] = [];
  @Input() textoBotonNuevo: string = '+ Nuevo Registro';

  // Salidas (Los eventos de clic que enviará hacia afuera)
  @Output() clicNuevo = new EventEmitter<void>();
  @Output() clicEditar = new EventEmitter<any>();
  @Output() clicEliminar = new EventEmitter<any>();

  // Funciones intermedias que disparan los eventos
  onNuevo() {
    this.clicNuevo.emit();
  }

  onEditar(item: any) {
    this.clicEditar.emit(item);
  }

  onEliminar(item: any) {
    // Al ser un componente genérico, pasamos el objeto completo o su ID
    this.clicEliminar.emit(item.id); 
  }
}