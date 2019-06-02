import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { HospitalService } from '../../../../services/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../../models/usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuariosHabilitados: Usuario[];
  usuariosDeshabilitados: Usuario[];
  usuariosBloqueados: Usuario[];

  constructor(private usuarioService: UsuarioService,
              private hospitalService: HospitalService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.usuarioService.getUsuario(id).subscribe(
            user => {
              this.usuario = user;
              this.usuarioService.usuariosHabilitadosPorHosp(this.usuario.hospital.id).subscribe(
                users => this.usuariosHabilitados = users
              )
              this.usuarioService.usuariosDeshabilitadosPorHosp(this.usuario.hospital.id).subscribe(
                users => this.usuariosDeshabilitados = users
              )
              this.usuarioService.usuariosBloqueadosPorHosp(this.usuario.hospital.id).subscribe(
                users => this.usuariosBloqueados = users
              )
            }
          )
        }
      }
    )
  }

  //Habilitar Usuario
  habilitarUsuario(u:Usuario): void {
    swal.fire({
      title: '¿Activar usuario?',
      text: `¿Esta seguro de activar el usuario: ${u.username}?`,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: 'btn btn-danger',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        u.enabled = true
        this.usuarioService.habilitarUsuario(u).subscribe(
          response => {
            this.router.navigateByUrl(`/usuarios/${this.usuario.id}`, {skipLocationChange: true}).then(()=>
            this.router.navigate([`/home/usuarios/${this.usuario.id}`]));
          }
        )
      }
    })

  }

  //Deshabilitar Usuario
  deshabilitarUsuario(u:Usuario): void {
    swal.fire({
      title: '¿Desactivar usuario?',
      text: `¿Esta seguro de desactivar el usuario: ${u.username}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        u.enabled = false
        this.usuarioService.deshabilitarUsuario(u).subscribe(
          response => {
            console.log('Dengados :(');
            this.router.navigateByUrl(`/usuarios/${this.usuario.id}`, {skipLocationChange: true}).then(()=>
            this.router.navigate([`/home/usuarios/${this.usuario.id}`]));
          }
        )
      }
    })

  }


}
