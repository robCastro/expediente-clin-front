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
    CrearComponent,
    GeneroComponent,
    Crear1Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [EspecialidadService,GeneroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
