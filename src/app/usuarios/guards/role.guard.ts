import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth : AuthService,private authService : AuthService,
  private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(!this.authService.isAuthenticated()){
          this.router.navigate(['/'])
          return false;
      }

      let role = next.data['role'] as string;
      console.log(role);
      if(this.auth.isAuthenticated()){
        return true;
      }
      swal.fire('Acceso Denegado',`Hola ${this.authService.usuario.username},no tienes aaceso a este recurso!`,'warning');
      this.router.navigate(['/'])
    return false;
  }

}
