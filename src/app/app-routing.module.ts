import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import { IndexComponent } from './home/content/index/index.component';

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
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', component: NotFountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
