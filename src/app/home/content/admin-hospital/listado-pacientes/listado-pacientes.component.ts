import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {

  paciente: Paciente = new Paciente();
  usuarioActual: Usuario = new Usuario();
  pacientesHabilitados: Paciente[];

  constructor(private pacienteService: PacienteService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarPaciente();
  }

  cargarPaciente(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.usuarioService.getUsuario(id).subscribe(
            usuario => {
              this.usuarioActual = usuario;
              //Usuarios habilitados a partir del hospital.
              this.pacienteService.pacientesHabilitadosPorHospital(this.usuarioActual.hospital.id).subscribe(
                pacientes => this.pacientesHabilitados = pacientes
              )
            }
          )
        }
      }
    )
  }

}
