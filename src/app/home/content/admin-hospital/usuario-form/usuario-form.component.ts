import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/pais.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import {RolService} from 'src/app/services/rol.service';
import {GeneroService} from 'src/app/services/genero.service';
import {EstadoCivilService} from 'src/app/services/estado-civil.service';
import {EspecialidadService} from 'src/app/services/especialidad.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {HospitalService} from 'src/app/services/hospital.service';
import { Pais } from 'src/app/models/pais';
import { Departamento } from 'src/app/models/departamento';
import { Municipio } from 'src/app/models/municipio';
import {Usuario} from 'src/app/models/usuario'
import {Genero} from 'src/app/models/genero'
import {Rol} from 'src/app/models/rol'
import {EstadoCivil} from 'src/app/models/estado-civil'
import {Especialidad} from 'src/app/models/especialidad'
import {Hospital} from 'src/app/models/hospital'
import swal from 'sweetalert2'


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  paises:Pais[];
  departamentos:Departamento[];
  municipios:Municipio[];
  generos: Genero[];
  roless: Rol[];
  estadociviles:EstadoCivil[];
  especialidades:Especialidad[];
  usuario:Usuario= new Usuario();
  hospital:Hospital;
  rol:Rol;

  constructor(private paisService: PaisService,
    private departamentoService:DepartamentoService,
    private municipioService:MunicipioService,private rolService: RolService,
    private generoService: GeneroService, private estadoService: EstadoCivilService,
    private especialidadService: EspecialidadService, private usuarioService: UsuarioService, private hospitalService: HospitalService ) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe(paises=>this.paises=paises)
    this.departamentoService.getDepartamentos().subscribe(departamentos=>this.departamentos=departamentos)
    this.municipioService.getMunicipios(1).subscribe(municipios=>this.municipios=municipios)
    this.generoService.getGeneros().subscribe(generos=>this.generos=generos)
    this.rolService.getRoles().subscribe(roles=>this.roless=roles)
    this.estadoService.getEstadosCiviles().subscribe(estadosciviles=>this.estadociviles=estadosciviles)
    this.especialidadService.getEspecialidades().subscribe(especialidades=>this.especialidades=especialidades)
    this.hospitalService.getHospital(1).subscribe(hos =>this.hospital = hos)
  }

  obtenerMunicipios(id:number){
    this.municipioService.getMunicipios(id).subscribe(municipios=>this.municipios=municipios)
  }

  public create(): void{

    this.usuario.hospital=this.hospital;
    console.log(this.usuario);
    this.usuarioService.createUsuario(this.usuario).subscribe(
      response => {
        swal.fire('Nuevo Usuario',`Usuario: ${response.username} Contraseña: ${this.usuario.fecha}`, 'success')
      }
    );
  }

}
