import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { CreateEditComponent } from './pages/medico/create-edit/create-edit.component'
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './_service/guard.service';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';


const routes: Routes = [
  {
    path: 'paciente',
    component: PacienteComponent,
    canActivate: [GuardService]
  },
  {
    path: 'medico',
    component: MedicoComponent,
    children: [
        { path: 'create', component: CreateEditComponent },
        { path: 'edit/:id', component: CreateEditComponent },
    ],
    canActivate: [GuardService]
  },
  {
    path: 'especialidad',
    component: EspecialidadComponent,
    canActivate: [GuardService]
  },
  {
    path: 'examen',
    component: ExamenComponent,
    canActivate: [GuardService]
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [GuardService]
  },
  {
    path: 'buscar',
    component: BuscarComponent,
    canActivate: [GuardService]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'not-403', component: Not403Component
  },
  {
    path: 'not-404', component: Not404Component
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-404',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
