import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('graficaParticipacion', { static: true }) graficaParticipacion!: ElementRef;
  chart: any;

  // Variables para las tarjetas y auditoría
  estadisticas: any = {
    estudiantes: 0, docentes: 0, egresados: 0, 
    administrativos: 0, directivos: 0, empleadores: 0
  };
  estamentoSeleccionado: string | null = null;
  listaDetalle: any[] = [];
  filtroTexto: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  ngAfterViewInit(): void {
    this.cargarGrafica();
  }

  // --- LÓGICA DE TARJETAS Y AUDITORÍA ---
  verDetalle(estamento: string) {
    this.estamentoSeleccionado = estamento;
    this.filtroTexto = ''; 
    this.http.get<any[]>(`http://localhost:8000/api/evaluacion/detalle-participacion/${estamento}/`).subscribe({
      next: (datos) => this.listaDetalle = datos,
      error: (err) => console.error('Error cargando detalle', err)
    });
  }

  get usuariosFiltrados() {
    if (!this.filtroTexto) return this.listaDetalle;
    const buscar = this.filtroTexto.toLowerCase();
    return this.listaDetalle.filter(u => 
      (u.nombre && u.nombre.toLowerCase().includes(buscar)) ||
      (u.dni && u.dni.toLowerCase().includes(buscar)) ||
      (u.estado && u.estado.toLowerCase().includes(buscar))
    );
  }

  cerrarDetalle() {
    this.estamentoSeleccionado = null;
  }

  // --- LÓGICA DE DATOS Y GRÁFICA ---
  cargarEstadisticas() {
    this.http.get<any>('http://localhost:8000/api/dashboard/stats/').subscribe({
      next: (data) => this.estadisticas = data,
      error: (err) => console.error('Error cargando stats', err)
    });
  }

  cargarGrafica() {
    this.http.get<any>('http://localhost:8000/api/evaluacion/grafica-participacion/').subscribe({
      next: (datos) => this.dibujarChart(datos),
      error: (err) => console.error('Error cargando gráfica', err)
    });
  }

  dibujarChart(datos: any) {
    if (!this.graficaParticipacion?.nativeElement) return;
    if (this.chart) { this.chart.destroy(); }

    this.chart = new Chart(this.graficaParticipacion.nativeElement, {
      type: 'bar',
      data: {
        labels: datos.etiquetas,
        datasets: [
          { label: 'Ya Votaron', data: datos.votaron, backgroundColor: '#28a745' },
          { label: 'Faltan por Votar', data: datos.faltan, backgroundColor: '#dc3545' }
        ]
      },
      options: { 
        responsive: true, 
        scales: {
          x: { stacked: true },
          y: { 
            stacked: true, 
            beginAtZero: true,
            ticks: { 
              precision: 0, 
              stepSize: 1
            }
          }
        } 
      }
    });
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  descargarInformeWord() {
    this.http.get('http://localhost:8000/api/evaluacion/informe-word/', { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Informe_Autoevaluacion_IPA.docx';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => alert('Error al generar informe')
      });
  }
}