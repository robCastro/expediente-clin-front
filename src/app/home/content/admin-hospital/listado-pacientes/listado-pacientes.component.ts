import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {

  paciente: Paciente = new Paciente();
  usuarioActual: Usuario = new Usuario();
  pacientesHabilitados: Paciente[];
  pacientesInhabilitados: Paciente[];
  pacientesBloqueados: Paciente[];

  constructor(private pacienteService: PacienteService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService : AuthService) { }

  ngOnInit() {
    this.cargarPaciente();
  }

  cargarPaciente(): void{
    this.usuarioService.getUsuarioPorUsername(this.authService.usuario.username).subscribe(
      usuario => {
        this.usuarioActual = usuario;
        //Usuarios habilitados a partir del hospital.
        this.pacienteService.pacientesHabilitadosPorHospital(this.usuarioActual.hospital.id).subscribe(
          pacientes => this.pacientesHabilitados = pacientes
        )
        //Usuarios inhabilitados a partir del hospital.
        this.pacienteService.pacientesInhabilitadosPorHospital(this.usuarioActual.hospital.id).subscribe(
          pacientes => this.pacientesInhabilitados = pacientes
        )
        //Usuarios bloqueados a partir del hospital.
        this.pacienteService.pacientesBloqueadosPorHospital(this.usuarioActual.hospital.id).subscribe(
          pacientes => this.pacientesBloqueados = pacientes
        )
      }
    )
    /*this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){

        }
      }
    )*/
  }

  //Habilitar Usuario
  habilitarPaciente(p: Paciente): void {
    swal.fire({
      title: '¿Activar paciente y su usuario?',
      text: `¿Esta seguro de activar el paciente: ${p.usuario.nombres} y su usuario: ${p.usuario.username}?`,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: 'btn btn-danger',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        p.activo = true
        this.pacienteService.activarPaciente(p).subscribe(
          response => {
            p.usuario.enabled = true
            this.usuarioService.habilitarUsuario(p.usuario).subscribe(
              response => {
                console.log(p);
                this.router.navigateByUrl(`/pacientes`, {skipLocationChange: true}).then(()=>
                this.router.navigate([`/home/pacientes`]));
              }
            )
          }
        )
      }
    })
  }

  //Deshabilitar Usuario
  deshabilitarPaciente(p: Paciente): void {
    swal.fire({
      title: '¿Activar paciente y su usuario?',
      text: `¿Esta seguro de desactivar el paciente: ${p.usuario.nombres} y su usuario: ${p.usuario.username}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        p.activo = false
        this.pacienteService.desactivarPaciente(p).subscribe(
          response => {
            p.usuario.enabled = false
            this.usuarioService.deshabilitarUsuario(p.usuario).subscribe(
              response => {
                console.log(p);
                this.router.navigateByUrl(`/pacientes`, {skipLocationChange: true}).then(()=>
                this.router.navigate([`/home/pacientes`]));
              }
            )
          }
        )
      }
    })
  }

}
