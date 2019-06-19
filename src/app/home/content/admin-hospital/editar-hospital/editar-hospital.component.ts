import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../../models/hospital';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../../models/usuario';
import { HospitalService } from '../../../../services/hospital.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { PaisService } from '../../../../services/pais.service';
import { Pais } from '../../../../models/pais';
import { Departamento } from '../../../../models/departamento';
import { Municipio } from '../../../../models/municipio';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-editar-hospital',
  templateUrl: './editar-hospital.component.html',
  styleUrls: ['./editar-hospital.component.css']
})
export class EditarHospitalComponent implements OnInit {

  hospital: Hospital = new Hospital();
  usuario: Usuario = new Usuario();
  pais: Pais = new Pais();
  departamento: Departamento = new Departamento();
  departamentos: Departamento[];
  municipio: Municipio = new Municipio();
  paises: Pais[];
  municipios: Municipio[];

  hosNumber: number;
  deptoNumber: number;


  constructor(private usuarioService: UsuarioService,
              private hospitalService: HospitalService,
              private paisService: PaisService,
              private departamentoService: DepartamentoService,
              private municipioService: MunicipioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public datepipe:DatePipe,
              private authService : AuthService) { }

  ngOnInit() {
    this.cargarUsuario();

    this.paisService.getPaises().subscribe(
      paises => this.paises = paises
    )
    this.departamentoService.getDepartamentos().subscribe(
      depto => this.departamentos = depto
    )

  }

  editarHospital(): void {
    console.log("Editado");
    console.log(this.hospital);
  }

  cargarUsuario(): void{
    this.usuarioService.getUsuarioPorUsername(this.authService.usuario.username).subscribe(
      user => {
        this.usuario = user;
        //Obtencion de Hospital.
        this.hospitalService.getHospital(this.usuario.hospital.id).subscribe(
          hosp => {
            this.hospital = hosp
            this.paisService.getPais(this.usuario.hospital.pais.id).subscribe(
              pais => {
                this.pais = pais;
                this.hospitalService.getDeptoHospital(this.usuario.hospital.id).subscribe(
                  num => {
                    this.departamento.id = num;
                    this.municipioService.getMunicipios(this.departamento.id).subscribe(
                      mun => this.municipios = mun
                    )
                  }
                )
              }
            )
          }
        )
      }
    )
    /*this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          //Obtencion de usuario

        }
      }
    )*/
  }

  cargarMunicipios() {
    console.log(this.departamento.id);
    this.municipioService.getMunicipios(this.departamento.id).subscribe(
      mun => this.municipios = mun
    )
  }

  cargarDepartamentos(){
    if(this.hospital.pais.id == 54){
      console.log("Es El Salvador")
    }
  }

  updateHospital(): void {
    this.hospitalService.update(this.hospital).subscribe(
      hospital => {
        swal.fire('Editado con éxito', `Hospital Actualizado: ${this.hospital.nombre}`, 'success')
        this.router.navigate(['/home'])
      }
    )
  }

  desactivarHospital(): void {
    swal.fire({
      title: '¿Desactivar hospital?',
      text: `¿Esta seguro de desactivar el hospital: ${this.usuario.hospital.nombre} y su usuario: ${this.usuario.username}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.usuario.enabled = false
        this.usuario.hospital.activo = false
        this.hospitalService.desactivarHospital(this.usuario.hospital).subscribe(
          response => {
            this.usuarioService.deshabilitarUsuario(this.usuario).subscribe(
              response => {
                console.log(this.usuario.hospital);
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                this.router.navigate(['/']));
                this.authService.logout();
                this.router.navigate(['/']);

              }
            )
          }
        );
      }
    })
  }

}
