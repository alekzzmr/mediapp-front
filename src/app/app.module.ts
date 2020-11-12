import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PrimengModule } from './prime/primeng.module';
import { FormsModule } from '@angular/forms';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { MedicoComponent } from './pages/medico/medico.component';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CreateEditComponent } from './pages/medico/create-edit/create-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PacienteComponent,
    MedicoComponent,
    CreateEditComponent,
    LoginComponent,
    EspecialidadComponent,
    ExamenComponent,
    ConsultaComponent,
    BuscarComponent,
    EspecialComponent,
    WizardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    HttpClientModule,
    TableModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
