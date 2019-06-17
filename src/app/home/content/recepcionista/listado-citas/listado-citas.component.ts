import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { Usuario } from 'src/app/models/usuario';
import { Consulta } from 'src/app/models/consulta';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.css']
})
export class ListadoCitasComponent implements OnInit {

  paciente: Paciente = new Paciente();
  usuarioActual: Usuario = new Usuario();
  citasPendientes: Consulta[];
  citasPasadas: Consulta[];


  constructor(private citaService: CitaService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService : AuthService) { }

  ngOnInit() {
    this.cargarCita();
  }

  cargarCita(): void{
    this.usuarioService.getUsuarioPorUsername(this.authService.usuario.username).subscribe(
      usuario => {
        this.usuarioActual = usuario;
        //citas pendientes a partir del hospital.
        this.citaService.CitasPendientes(this.usuarioActual.hospital.id).subscribe(
          consultas => this.citasPendientes = consultas
        )
        //Citas Pasadas a partir del hospital.
        this.citaService.CitasPasadas(this.usuarioActual.hospital.id).subscribe(
          consultas => this.citasPasadas = consultas
        )

      }
    )
  }
}
