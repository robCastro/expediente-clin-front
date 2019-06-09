import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    titulo:string = 'Por Favor Sign In!';
    usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
  this.usuario=new Usuario(); }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      swal.fire('login',`Hola ${this.authService.usuario.username},ya estas autenticado`,'info');
      this.router.navigate(['home/index']);
    }
  }

  login():void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Inicio de Sesion','Usuario o Contraseñas vacias','error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['home/index']);
      swal.fire('login',`Hola ${usuario.username},haz iniciado sesion con exito`,'success');
    },err =>{
      if(err.status == 400){
        swal.fire('Error Login','Usuario o Contraseña Incorrectas!','error');
      }
    }
  );
  }
}
