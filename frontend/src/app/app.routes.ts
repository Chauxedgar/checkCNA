import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { DocentesComponent } from './components/docentes/docentes.component'; // Añadimos esto
import { EgresadosComponent } from './components/egresados/egresados.component';
import { AdministrativosComponent } from './components/administrativos/administrativos.component';
import { DirectivoComponent } from './components/directivo/directivo.component';
import { EmpleadorComponent } from './components/empleador/empleador.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AccesoEncuestaComponent } from './components/acceso-encuesta/acceso-encuesta.component';
import {EncuestaComponent} from "./components/encuesta/encuesta.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'docentes', component: DocentesComponent },
  { path: 'egresados', component: EgresadosComponent }, // Nueva ruta
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'administrativos', component: AdministrativosComponent },
  { path: 'directivos', component: DirectivoComponent },
  { path: 'empleadores', component: EmpleadorComponent },
  { path: 'preguntas', component: PreguntasComponent },
  { path: 'acceso-encuesta', component: AccesoEncuestaComponent }, // Nueva ruta
  { path: 'encuesta', component: EncuestaComponent }, // Nueva ruta
];