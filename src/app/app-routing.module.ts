import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './usuarios/login.component';
import { HomeComponent } from './home/home.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import { IndexComponent } from './home/content/index/index.component';
import { EspecialidadComponent } from './home/content/admin-general/especialidad/especialidad.component';
import { FormsModule } from '@angular/forms';
import { CrearComponent } from './home/content/admin-general/especialidad/crear.component';
import { GeneroComponent } from './home/content/admin-general/genero/genero.component';
import { Crear1Component } from './home/content/admin-general/genero/crear1.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
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
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', component: NotFountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
