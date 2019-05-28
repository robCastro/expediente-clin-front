import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital';
import { Router, ActivatedRoute } from '@angular/router';
import { Pais } from '../../../../models/pais';
import { UsuarioService } from '../../../../services/usuario.service';
import swal from 'sweetalert2';
import { MensajeService } from '../../../../services/mensaje.service';

@Component({
  selector: 'app-listado-hospital',
  templateUrl: './listado-hospital.component.html',
  styleUrls: ['./listado-hospital.component.css']
})
export class ListadoHospitalComponent implements OnInit {

  userHospAprobado: Usuario[];
  userHospPendiente: Usuario[];
  userHospDenegado: Usuario[];
  usuarioHab: Usuario = new Usuario();
 
  constructor(private hospitalService: HospitalService,
              private usuarioService: UsuarioService,
              private mensajeService: MensajeService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.hospitalService.getUserHospitalAprobados().subscribe(
      user => this.userHospAprobado = user
    );

    this.hospitalService.getUserHospitalPendientes().subscribe(
      user => this.userHospPendiente = user
    )

    this.hospitalService.getUserHospitalDenegados().subscribe(
      user => this.userHospDenegado = user
    )

  }

  habilitarUsuario2(u: Usuario):void {
    swal.fire('Hola'+u.nombres)
    this.usuarioService.habilitarUsuario(u).subscribe(
      user => swal.fire('Usuario habilitado', `El usuario ${u.username} ha sido habilitado`, 'success')
    )
    
  }

  habilitarUsuarioHospital(u:Usuario): void {
    swal.fire({
      title: '¿Aprobar hospital?',
      text: `¿Esta seguro de aprobar el hospital: ${u.hospital.nombre} y su usuario: ${u.username}?`,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: 'btn btn-danger',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        u.enabled = true
        u.hospital.aprobado = true
        this.hospitalService.habilitarHospital(u.hospital).subscribe(
          response => {
            this.usuarioService.habilitarUsuario(u).subscribe(
              response => {
                this.mensajeService.enviarMensaje(
                `El hospital: ${u.hospital.nombre} y su usuario: ${u.username} han sido aprobados.`,
                `Hospital ${u.hospital.nombre} aprobado`,
                `${u.email}`).subscribe(
                  response => console.log(`Habilitado hospital y usuario ${u.email}`)
                )
                this.router.navigateByUrl('/hospital', {skipLocationChange: true}).then(()=>
                this.router.navigate(['home/hospital'])); 
              }
            )
          } 
        );
      }
    })
  }

  //Denegar Hospital y Usuario.
  denegarUsuarioHospital(u:Usuario): void {
    swal.fire({
      title: '¿Denegar hospital?',
      text: `¿Esta seguro de denegar el hospital: ${u.hospital.nombre} y su usuario: ${u.username}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        u.enabled = false
        u.hospital.aprobado = false
        this.hospitalService.denegarHospital(u.hospital).subscribe(
          response => {
            this.usuarioService.deshabilitarUsuario(u).subscribe(
              response => {
                console.log('Dengados :(');
                this.router.navigateByUrl('/hospital', {skipLocationChange: true}).then(()=>
                this.router.navigate(['home/hospital'])); 
              }
            )
          } 
        );
      }
    })

  }



}
