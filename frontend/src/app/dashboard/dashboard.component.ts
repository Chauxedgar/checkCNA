import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('graficaParticipacion') graficaCanvas!: ElementRef;
  chart: any;
  
  // 1. Restauramos la variable para tus tarjetas originales
  estadisticas: any = {
    estudiantes: 0, docentes: 0, egresados: 0, 
    administrativos: 0, directivos: 0, empleadores: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  ngAfterViewInit(): void {
    this.cargarGrafica();
  }

  // 2. Función original para alimentar tus tarjetas superiores
  cargarEstadisticas() {
    this.http.get<any>('http://localhost:8000/api/dashboard/stats/').subscribe({
      next: (data) => this.estadisticas = data,
      error: (err) => console.error('Error cargando stats', err)
    });
  }

  // 3. Función nueva para alimentar la gráfica
  cargarGrafica() {
    this.http.get<any>('http://localhost:8000/api/evaluacion/grafica-participacion/').subscribe({
      next: (datos) => {
        this.dibujarChart(datos);
      },
      error: (err) => console.error('Error cargando datos de la gráfica', err)
    });
  }

  dibujarChart(datos: any) {
    if (this.chart) { this.chart.destroy(); }
    this.chart = new Chart(this.graficaCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: datos.etiquetas,
        datasets: [
          {
            label: 'Ya Votaron',
            data: datos.votaron,
            backgroundColor: '#28a745',
            borderWidth: 1
          },
          {
            label: 'Faltan por Votar',
            data: datos.faltan,
            backgroundColor: '#dc3545',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Progreso de Participación por Estamento', font: { size: 18 } }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true }
        }
      }
    });
  }
}