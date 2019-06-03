import { Component, OnInit } from '@angular/core';
import {EnfermedadService} from 'src/app/services/enfermedad.service';
import {TipoEnfermedadService} from 'src/app/services/tipo-enfermedad.service';
import {PacienteService} from 'src/app/services/paciente.service';
import {HistorialClinicoService} from 'src/app/services/historial-clinico.service';
import { Enfermedad } from 'src/app/models/enfermedad';
import { TipoEnfermedad } from 'src/app/models/tipo-enfermedad';
import { Paciente } from 'src/app/models/paciente';
import { HistorialClinico } from 'src/app/models/historial-clinico';
import swal from 'sweetalert2'
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-historial-crear',
  templateUrl: './historial-crear.component.html',
  styleUrls: ['./historial-crear.component.css']
})
export class HistorialCrearComponent implements OnInit {

  enfermedades:Enfermedad[];
  tipoEnfermedades:TipoEnfermedad[];
  historial:HistorialClinico= new HistorialClinico();
  paciente:Paciente= new Paciente();

  constructor(private enfermedadService: EnfermedadService, private pacienteService: PacienteService,
        private tipoEnfermedadService: TipoEnfermedadService, private historialService: HistorialClinicoService,
        private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.tipoEnfermedadService.getTipoEnfermedades().subscribe(tEnfermedades=>this.tipoEnfermedades=tEnfermedades),
    this.enfermedadService.getEnfermedades(1).subscribe(enfermedades=>this.enfermedades=enfermedades)
    this.historial.enfermedad={"id":1,"nombre":"Alergia","tipoEnfermedad":{"id":1,"nombre":"Alergias"}}
    this.cargarPaciente()
  }

  obtenerEnfermedades(id:number){
    this.enfermedadService.getEnfermedades(id).subscribe(enfermedades=>this.enfermedades=enfermedades)
  }

  comparar(o1:Enfermedad,o2:Enfermedad){
    return o1===null || o2===null? false:o1.id===o2.id;
  }

  cargarPaciente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
        this.pacienteService.getPaciente(id).subscribe( pac =>this.paciente =pac)
    }
   )

  }

  public create(): void{

    this.historial.paciente=this.paciente
    console.log(this.historial.paciente)


    this.historialService.createUsuario(this.historial).subscribe(
      response => {
        this.router.navigate([`/home/historial_paciente/${this.historial.paciente.id}`])
        swal.fire('Nuevo historial Clinico Creado', 'success')
      }
    );
  }



}
