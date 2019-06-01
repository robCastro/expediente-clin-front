import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import { IndexComponent } from './home/content/index/index.component';
import { RegistrarHospitalComponent } from './home/content/admin-hospital/registrar-hospital/registrar-hospital.component';
import {EstadoTablaComponent} from './home/content/admin-general/estado-civil/estado-tabla/estado-tabla.component';
import {EstadoFormComponent} from './home/content/admin-general/estado-civil/estado-form/estado-form.component';
import {UsuarioFormComponent} from './home/content/admin-hospital/usuario-form/usuario-form.component';

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

    ]
  },
  { path: '**', component: NotFountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
