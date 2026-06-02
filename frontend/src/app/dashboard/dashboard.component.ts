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

  @ViewChild('graficaParticipacion') graficaCanvas!: ElementRef;
  chart: any;
  // ... (debajo de tu variable estadisticas)
  estamentoSeleccionado: string | null = null;
  listaDetalle: any[] = [];
  filtroTexto: string = '';

  // ... (debajo de tus otras funciones, como dibujarChart)

  // 1. Función que se activa al hacer clic en una tarjeta
  verDetalle(estamento: string) {
    this.estamentoSeleccionado = estamento;
    this.filtroTexto = ''; // Limpiamos el buscador al cambiar de tarjeta
    this.http.get<any[]>(`http://localhost:8000/api/evaluacion/detalle-participacion/${estamento}/`).subscribe({
      next: (datos) => this.listaDetalle = datos,
      error: (err) => console.error('Error cargando detalle', err)
    });
  }

  // 2. Motor del buscador en tiempo real
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
  



  // 1. Restauramos la variable para tus tarjetas originales
  estadisticas: any = {
    estudiantes: 0, docentes: 0, egresados: 0, 
    administrativos: 0, directivos: 0, empleadores: 0
  };

  constructor(private http: HttpClient, private router: Router) {}

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
          y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });

  }
  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  descargarInformeWord() {
    // Es crucial indicarle a Angular que vamos a recibir un archivo (blob), no un texto JSON
    this.http.get('http://localhost:8000/api/evaluacion/informe-word/', { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          // Lógica del navegador para forzar la descarga del archivo
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Informe_Autoevaluacion_IPA.docx';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => alert('Hubo un error al generar el documento.')
      });
  }
}