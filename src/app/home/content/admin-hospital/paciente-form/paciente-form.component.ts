import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais';
import { Departamento } from 'src/app/models/departamento';
import { Municipio } from 'src/app/models/municipio';
import { Genero } from 'src/app/models/genero';
import { Rol } from 'src/app/models/rol';
import { EstadoCivil } from 'src/app/models/estado-civil';
import { Usuario } from 'src/app/models/usuario';
import { Hospital } from 'src/app/models/hospital';
import { PaisService } from 'src/app/services/pais.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { RolService } from 'src/app/services/rol.service';
import { EstadoCivilService } from 'src/app/services/estado-civil.service';
import { GeneroService } from 'src/app/services/genero.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PacienteService } from 'src/app/services/paciente.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  paises:Pais[];
  departamentos:Departamento[];
  municipios:Municipio[];
  generos: Genero[];
  roless: Rol[];
  estadociviles:EstadoCivil[];
  hospital:Hospital;
  rol:Rol;
  pacienteN:Paciente;
  usuarioN:Usuario;
  paciente: Paciente= new Paciente();
  usuario: Usuario=new Usuario();
  idHospital:number;

  constructor(private paisService: PaisService,
    private departamentoService:DepartamentoService,
    private municipioService:MunicipioService,private rolService: RolService,
    private generoService: GeneroService, private estadoService: EstadoCivilService,
    private usuarioService: UsuarioService, private hospitalService: HospitalService,
    private pacienteService: PacienteService,
    private router:Router,
    public datepipe:DatePipe) { }


    ngOnInit() {
      this.paisService.getPaises().subscribe(paises=>this.paises=paises)
      this.departamentoService.getDepartamentos().subscribe(departamentos=>this.departamentos=departamentos)
      this.municipioService.getMunicipios(1).subscribe(municipios=>this.municipios=municipios)
      this.generoService.getGeneros().subscribe(generos=>this.generos=generos)
      this.rolService.getRol(6).subscribe(rol=>this.rol=rol)
      this.estadoService.getEstadosCiviles().subscribe(estadosciviles=>this.estadociviles=estadosciviles)
      this.hospitalService.getHospital(1).subscribe(hos =>this.hospital = hos)
      this.usuario.pais={"id":54,"nombre":"El Salvador"}

    }

    obtenerMunicipios(id:number){
      this.municipioService.getMunicipios(id).subscribe(municipios=>this.municipios=municipios)
    }

    public create():void {
      this.usuario.roles=[this.rol]
        this.usuarioService.createUsuarioPaciente(this.usuario).subscribe(
          usuarioNuevo=>{
            console.log(usuarioNuevo);
            this.paciente.usuario=Object.values(usuarioNuevo)[0]
            this.pacienteService.create(this.paciente).subscribe(
            pacienteNuevo=>{
              this.pacienteN=Object.values(pacienteNuevo)[0]
              console.log(this.pacienteN);
              }
            );
            let fecha=this.datepipe.transform(this.usuario.fecha,'dd/MM/yyyy')
            swal.fire('Nuevo Paciente',`Paciente ${this.usuario.nombres} registrado con éxito,
            El Usuario para paciente es ${Object.values(usuarioNuevo)[0].username} y la contraseña es ${fecha} `, 'success')
            this.router.navigate(['/home'])
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

          compararPais(o1:Pais,o2:Pais){
          return o1===null || o2===null? false:o1.id===o2.id;
          }
  }
