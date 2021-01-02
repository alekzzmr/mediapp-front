import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PrimengModule } from './prime/primeng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ReportsComponent } from './pages/reports/reports.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { TokenComponent } from './pages/recuperar/token/token.component';
import { SignoComponent } from './pages/signo/signo.component';
import { EditarCrearComponent } from './pages/signo/editar-crear/editar-crear.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RolComponent } from './pages/rol/rol.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AsignarRolComponent } from './pages/asignar-rol/asignar-rol.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

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
    ReportsComponent,
    Not403Component,
    Not404Component,
    RecuperarComponent,
    TokenComponent,
    SignoComponent,
    EditarCrearComponent,
    PerfilComponent,
    UsuarioComponent,
    RolComponent,
    MenuComponent,
    AsignarRolComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    PdfViewerModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
      },
    }),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
