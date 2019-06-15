import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './usuarios/login.component';
import { HomeComponent } from './home/home.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import { IndexComponent } from './home/content/index/index.component';
import { RegistrarHospitalComponent } from './home/content/admin-hospital/registrar-hospital/registrar-hospital.component';
import { ListadoHospitalComponent } from './home/content/admin-general/listado-hospital/listado-hospital.component';
import {EstadoTablaComponent} from './home/content/admin-general/estado-civil/estado-tabla/estado-tabla.component';
import { EspecialidadComponent } from './home/content/admin-general/especialidad/especialidad.component';
import {EstadoFormComponent} from './home/content/admin-general/estado-civil/estado-form/estado-form.component';
import { FormsModule } from '@angular/forms';
import {UsuarioFormComponent} from './home/content/admin-hospital/usuario-form/usuario-form.component';
import { EditarHospitalComponent } from './home/content/admin-hospital/editar-hospital/editar-hospital.component';
import { ListadoUsuariosComponent } from './home/content/admin-hospital/listado-usuarios/listado-usuarios.component';
import { CrearComponent } from './home/content/admin-general/especialidad/crear.component';
import { GeneroComponent } from './home/content/admin-general/genero/genero.component';
import { Crear1Component } from './home/content/admin-general/genero/crear1.component';
import { PacienteFormComponent } from './home/content/admin-hospital/paciente-form/paciente-form.component';
import { ListadoPacientesComponent } from './home/content/admin-hospital/listado-pacientes/listado-pacientes.component';
import {HistorialCrearComponent} from './home/content/shared/historial-crear/historial-crear.component';
import {HistorialEditarComponent} from './home/content/shared/historial-editar/historial-editar.component';
import { ListadoHistorialesComponent } from './home/content/shared/listado-historiales/listado-historiales.component';
import { CitaCrearComponent } from './home/content/shared/cita-crear/cita-crear.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrar_hospital', component: RegistrarHospitalComponent },
  { path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
        children: []
      },
      { path: 'especialidad', component: EspecialidadComponent},
      { path: 'especialidad/crear', component: CrearComponent},
      { path: 'especialidad/crear/:id', component: CrearComponent},
      { path: 'genero', component: GeneroComponent},
      { path: 'genero/crear1', component: Crear1Component},
      { path: 'genero/crear1/:id', component: Crear1Component},
      { path: 'paciente/crearPaciente', component: PacienteFormComponent},
      { path: 'paciente/crearPaciente/:id', component: PacienteFormComponent},
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'hospital',
        component: ListadoHospitalComponent,
        children: []
      },
      {
        path: 'hospital/editar/:id',
        component: EditarHospitalComponent,
        children: []
      },
      {
        path: 'usuarios/:id',
        component: ListadoUsuariosComponent,
        children: []
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      {
        path:'estado_civil_t',
        component:EstadoTablaComponent
      },
      {
        path:'estado_civil_f',
        component:EstadoFormComponent
      },
      {
        path:'estado_civil_f/:id',
        component:EstadoFormComponent
      },
      {
        path:'usuario_form',
        component:UsuarioFormComponent
      },
      {
        path:'usuario_form/:id',
        component:UsuarioFormComponent
      },
      {
        path:'pacientes/:id',
        component: ListadoPacientesComponent,
      },
      {
        path:'historial_crear/:id',
        component:HistorialCrearComponent
      },
      {
        path: 'historial_editar/:id',
        component:HistorialEditarComponent
      },
      {
        path:'historial_paciente/:id',
        component: ListadoHistorialesComponent,
      },
      {
        path:'cita',
        component: CitaCrearComponent
      }

    ]
  },
  { path: '**', component: NotFountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
