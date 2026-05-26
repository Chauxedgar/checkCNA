import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component'; // 1. Importamos el componente

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'estudiantes', component: EstudiantesComponent }, // 2. Añadimos la ruta
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];