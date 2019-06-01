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
import { DatePipe } from '@angular/common'


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
    private especialidadService: EspecialidadService, private usuarioService: UsuarioService, private hospitalService: HospitalService,
    public datepipe: DatePipe ) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe(paises=>this.paises=paises)
    this.departamentoService.getDepartamentos().subscribe(departamentos=>this.departamentos=departamentos)
    this.municipioService.getMunicipios(1).subscribe(municipios=>this.municipios=municipios)
    this.generoService.getGeneros().subscribe(generos=>this.generos=generos)
    this.rolService.getRoles().subscribe(roles=>this.roless=roles)
    this.estadoService.getEstadosCiviles().subscribe(estadosciviles=>this.estadociviles=estadosciviles)
    this.especialidadService.getEspecialidades().subscribe(especialidades=>this.especialidades=especialidades)
    this.hospitalService.getHospital(1).subscribe(hos =>this.hospital = hos)
    this.usuario.pais={"id":54,"nombre":"El Salvador"}
    this.usuario.roles=[{"id":3,"nombre":"Medico"}]
  }

  obtenerMunicipios(id:number){
    this.municipioService.getMunicipios(id).subscribe(municipios=>this.municipios=municipios)
  }

  public create(): void{

    this.usuario.hospital=this.hospital;
    console.log(this.usuario);


    this.usuarioService.createUsuario(this.usuario).subscribe(
      response => {
          let latest_date =this.datepipe.transform(this.usuario.fecha, 'dd/MM/yyyy');
        swal.fire('Nuevo Usuario',`Usuario: ${Object.values(response)[0].username} Contraseña: ${latest_date}`, 'success')
      }
    );
  }

  validarPais(){
    if (this.usuario.pais.id==54)
      return false;
    else
      this.usuario.municipio=null;
      return true;


  }

  validarEspecialidad(){
     this.rol=this.usuario.roles[0];
    if (this.rol.id==3)
      return false;
    else
    {
      this.usuario.especialidad=null;
      return true;}
  }

  compararPais(o1:Pais,o2:Pais){
    return o1===null || o2===null? false:o1.id===o2.id;
  }
}
