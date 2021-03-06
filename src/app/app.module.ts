import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { FooterComponent } from './home/footer/footer.component';
import { ContentComponent } from './home/content/content.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import { IndexComponent } from './home/content/index/index.component';
import { ListadoHospitalComponent } from './home/content/admin-general/listado-hospital/listado-hospital.component';
import {EstadoFormComponent} from './home/content/admin-general/estado-civil/estado-form/estado-form.component';
import { EditarHospitalComponent } from './home/content/admin-hospital/editar-hospital/editar-hospital.component';
import {EstadoTablaComponent} from './home/content/admin-general/estado-civil/estado-tabla/estado-tabla.component';
import { ListadoUsuariosComponent } from './home/content/admin-hospital/listado-usuarios/listado-usuarios.component';
import { UsuarioFormComponent } from './home/content/admin-hospital/usuario-form/usuario-form.component';
import { RegistrarHospitalComponent } from './home/content/admin-hospital/registrar-hospital/registrar-hospital.component';
import { EspecialidadComponent } from './home/content/admin-general/especialidad/especialidad.component';
import { CrearComponent } from './home/content/admin-general/especialidad/crear.component';
import { EspecialidadService } from './services/especialidad.service';
import { GeneroService } from './services/genero.service';
import { RouterModule, Routes } from '@angular/router';
import { GeneroComponent } from './home/content/admin-general/genero/genero.component';
import { Crear1Component } from './home/content/admin-general/genero/crear1.component';
import { PacienteFormComponent } from './home/content/admin-hospital/paciente-form/paciente-form.component';
import { ListadoPacientesComponent } from './home/content/admin-hospital/listado-pacientes/listado-pacientes.component';
import { HistorialCrearComponent } from './home/content/shared/historial-crear/historial-crear.component';
import { HistorialEditarComponent } from './home/content/shared/historial-editar/historial-editar.component';
import { ListadoHistorialesComponent } from './home/content/shared/listado-historiales/listado-historiales.component';
import { PacienteService } from './services/paciente.service';
import { DatePipe } from '@angular/common';
import { CitaCrearComponent } from './home/content/shared/cita-crear/cita-crear.component';
import { ConsultaComponent } from './home/content/medico/consulta/consulta.component';
import { SignosVitalesComponent } from './home/content/enfermero/signos-vitales/signos-vitales.component';
import { ListadoCitasComponent } from './home/content/recepcionista/listado-citas/listado-citas.component';
import { TratamientoComponent } from './home/content/medico/tratamiento/tratamiento.component';
import { ListadoPacientesRecComponent } from './home/content/recepcionista/listado-pacientes-rec/listado-pacientes-rec.component';
import { DetalleCitaComponent } from './home/content/paciente/detalle-cita/detalle-cita.component';
import { CitaListaComponent } from './home/content/paciente/cita-lista/cita-lista.component';
import { ListadoPacientesEnfComponent } from './home/content/enfermero/listado-pacientes-enf/listado-pacientes-enf.component';
import { ListadoCitasEnfComponent } from './home/content/enfermero/listado-citas-enf/listado-citas-enf.component';
import { ListadoCitasDocComponent } from './home/content/medico/listado-citas-doc/listado-citas-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    NotFountComponent,
    IndexComponent,
    EspecialidadComponent,
    EstadoFormComponent,
    CrearComponent,
    EstadoTablaComponent,
    GeneroComponent,
    UsuarioFormComponent,
    RegistrarHospitalComponent,
    Crear1Component,
    ListadoHospitalComponent,
    EditarHospitalComponent,
    ListadoUsuariosComponent,
    PacienteFormComponent,
    ListadoPacientesComponent,
    HistorialCrearComponent,
    HistorialEditarComponent,
    ListadoHistorialesComponent,
    CitaCrearComponent,
    ConsultaComponent,
    SignosVitalesComponent,
    ListadoCitasComponent,
    TratamientoComponent,
    ListadoPacientesRecComponent,
    DetalleCitaComponent,
    CitaListaComponent,
    ListadoPacientesEnfComponent,
    ListadoCitasEnfComponent,
    ListadoCitasDocComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

  ],
  providers: [DatePipe,
              EspecialidadService,
              GeneroService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
