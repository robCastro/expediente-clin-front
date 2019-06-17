import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { Usuario } from 'src/app/models/usuario';
import { Consulta } from 'src/app/models/consulta';
import { CitaService } from 'src/app/services/cita.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-listado-citas-doc',
  templateUrl: './listado-citas-doc.component.html',
  styleUrls: ['./listado-citas-doc.component.css']
})
export class ListadoCitasDocComponent implements OnInit {

  paciente: Paciente = new Paciente();
  usuarioActual: Usuario = new Usuario();
  CitasPendientesDoctor: Consulta[];
  CitasPasadasDoctor: Consulta[];


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
        //citas pendientes a partir del usuario doctor
        this.citaService.CitasPendientesDoctor(this.usuarioActual.id).subscribe(
          consultas => this.CitasPendientesDoctor = consultas
        )
        //Citas Pasadas a partir del usuario doctor
        this.citaService.CitasPasadasDoctor(this.usuarioActual.id).subscribe(
          consultas => this.CitasPasadasDoctor = consultas
        )

      }
    )
  }
  }
