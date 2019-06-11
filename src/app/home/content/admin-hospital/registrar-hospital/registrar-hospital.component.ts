import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/pais.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { Pais } from 'src/app/models/pais';
import { Departamento } from 'src/app/models/departamento';
import { Municipio } from 'src/app/models/municipio';
import { Hospital } from 'src/app/models/hospital';
import { Usuario } from 'src/app/models/usuario';
import { HospitalService } from 'src/app/services/hospital.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import {DatePipe} from '@angular/common'

@Component({
  selector: 'app-registrar-hospital',
  templateUrl: './registrar-hospital.component.html',
  styleUrls: ['./registrar-hospital.component.css']
})
export class RegistrarHospitalComponent implements OnInit {

  paises:Pais[];
  departamentos:Departamento[];
  municipios:Municipio[];
  municipios1:Municipio[];
  hospital: Hospital= new Hospital();
  usuario: Usuario=new Usuario();
  rol:Rol;
  hospitalN:Hospital;
  usuarioN:Usuario;
  idHospital:number;

  constructor(private paisService: PaisService,
    private departamentoService:DepartamentoService,
    private municipioService:MunicipioService,
    private hospitalService:HospitalService,
    private usuarioService:UsuarioService,
    private rolService:RolService,
    private router:Router,
    public datepipe:DatePipe) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe(paises=>this.paises=paises)
    this.departamentoService.getDepartamentos().subscribe(departamentos=>this.departamentos=departamentos)
    this.municipioService.getMunicipios(1).subscribe(municipios=>this.municipios=municipios)
    this.municipioService.getMunicipios(1).subscribe(municipios1=>this.municipios1=municipios1)
    this.rolService.getRol(2).subscribe(rol=>this.rol=rol)
    this.usuario.pais={"id":54,"nombre":"El Salvador"}
    this.hospital.pais={"id":54,"nombre":"El Salvador"}
  }

  obtenerMunicipios(id:number){
    this.municipioService.getMunicipios(id).subscribe(municipios=>this.municipios=municipios)
  }
  obtenerMunicipios1(id:number){
    this.municipioService.getMunicipios(id).subscribe(municipios1=>this.municipios1=municipios1)
  }

  public create():void{
    let fechaHoy=this.datepipe.transform(new Date().toLocaleString("en-UTC"),'yyyy-MM-dd');
    this.hospital.fecha=fechaHoy;
    this.usuario.roles=[this.rol];
    this.usuarioService.createUsuarioInactivo(this.usuario).subscribe(
      usuarioNuevo=>{
        let fecha=this.datepipe.transform(this.usuario.fecha,'dd/MM/yyyy')
        this.usuarioN=Object.values(usuarioNuevo)[0]
        this.hospitalService.create(this.hospital).subscribe(
          hospitalNuevo=>{
            this.usuarioN.hospital=Object.values(hospitalNuevo)[0]
            this.usuarioService.editUsuario(this.usuarioN,this.usuarioN.id).subscribe(
              usuarioAc=>this.usuarioN=Object.values(usuarioAc)[0]
            );
          }
        );
        swal.fire('Nuevo Hospital',`Hospital ${this.hospital.nombre} registrado con éxito,
        se le enviara un correo cuando el hospital sea aprobado. El usuario para el administrador
        es ${Object.values(usuarioNuevo)[0].username} y la contraseña es ${fecha}`, 'success')
        this.router.navigate(['/'])
      }
    );
  }

  validarPaisHosp(){
    if (this.hospital.pais.id==54)
      return false;
    else
      this.hospital.municipio=null;
      return true;
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
