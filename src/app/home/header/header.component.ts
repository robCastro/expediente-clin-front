import { Component } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor(private authService: AuthService, private router:Router) { }

  logout():void{
    swal.fire('Logout',`Hola ${this.authService.usuario.username},Ha cerrado sesion con exito!`,'success');
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
