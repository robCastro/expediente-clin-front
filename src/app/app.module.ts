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
import { DatePipe } from '@angular/common';
import { RegistrarHospitalComponent } from './home/content/admin-hospital/registrar-hospital/registrar-hospital.component';
import { EspecialidadComponent } from './home/content/admin-general/especialidad/especialidad.component';
import { CrearComponent } from './home/content/admin-general/especialidad/crear.component';
import { EspecialidadService } from './services/especialidad.service';
import { GeneroService } from './services/genero.service';
import { RouterModule, Routes } from '@angular/router';
import { GeneroComponent } from './home/content/admin-general/genero/genero.component';
import { Crear1Component } from './home/content/admin-general/genero/crear1.component';

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
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [DatePipe,
              EspecialidadService,
              GeneroService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
