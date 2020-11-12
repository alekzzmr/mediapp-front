import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { CreateEditComponent } from './pages/medico/create-edit/create-edit.component'
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { BuscarComponent } from './pages/buscar/buscar.component';


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
  component: EspecialidadComponent
  },
  {
  path: 'examen',
  component: ExamenComponent
  },
  {
  path: 'consulta',
  component: ConsultaComponent
  },
  {
  path: 'consulta-especial',
  component: EspecialComponent
  },
  {
  path: 'consulta-wizard',
  component: WizardComponent
  },

  {
  path: 'buscar',
  component: BuscarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
