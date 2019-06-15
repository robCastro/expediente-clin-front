import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-listado-pacientes-enf',
  templateUrl: './listado-pacientes-enf.component.html',
  styleUrls: ['./listado-pacientes-enf.component.css']
})
export class ListadoPacientesEnfComponent implements OnInit {

  pacientes: Object[];
  usuarioActual: Usuario = new Usuario();
  
  constructor(private pacienteService: PacienteService,
              private usuarioService: UsuarioService,
              private authService : AuthService) { }

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes(): void{
    this.usuarioService.getUsuarioPorUsername(this.authService.usuario.username).subscribe(
      usuario => {
        this.usuarioActual = usuario;
        this.pacienteService.getPacientesBasicos(this.usuarioActual.hospital.id).subscribe(
          pacientes => this.pacientes = pacientes
        )
      }
    )
  }
}
