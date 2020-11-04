import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { CreateEditComponent } from './pages/medico/create-edit/create-edit.component'
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';

const routes: Routes = [
  {
  path: 'paciente',
  component: PacienteComponent
  },
  {
  path: 'medico',
  component: MedicoComponent,
  children: [
      { path: 'create', component: CreateEditComponent },
      { path: 'edit/:id', component: CreateEditComponent },
    ],
  },
  {
  path: 'especialidad',
  component: PacienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
