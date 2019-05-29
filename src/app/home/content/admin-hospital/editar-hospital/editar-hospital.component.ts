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
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarUsuario();

    this.paisService.getPaises().subscribe(
      paises => this.paises = paises
    )

  }

  editarHospital(): void {
    console.log("Editado");
    console.log(this.hospital);
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          //Obtencion de usuario
          this.usuarioService.getUsuario(id).subscribe(
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
                          this.deptoNumber = num;
                          this.municipioService.getMunicipios(this.deptoNumber).subscribe(
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
        }
      }
    )
  }

  updateHospital(): void {
    this.hospitalService.update(this.hospital).subscribe(
      hospital => {
        swal.fire('Editado con éxito', `Hospital Actualizado: ${this.hospital.nombre}`, 'success')
      }
    )
  }

}
