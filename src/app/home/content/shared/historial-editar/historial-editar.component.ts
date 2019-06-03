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
  selector: 'app-historial-editar',
  templateUrl: './historial-editar.component.html',
  styleUrls: ['./historial-editar.component.css']
})
export class HistorialEditarComponent implements OnInit {

  enfermedades:Enfermedad[];
  tipoEnfermedades:TipoEnfermedad[];
  historial:HistorialClinico= new HistorialClinico();
  //tipo:TipoEnfermedad=new TipoEnfermedad();

  constructor(private enfermedadService: EnfermedadService, private pacienteService: PacienteService,
        private tipoEnfermedadService: TipoEnfermedadService, private historialService: HistorialClinicoService,
        private activatedRoute:ActivatedRoute, private router:Router) {
         }


  ngOnInit() {
    this.cargarHistorial(),
    this.tipoEnfermedadService.getTipoEnfermedades().subscribe(tEnfermedades=>this.tipoEnfermedades=tEnfermedades),
    this.enfermedadService.getEnfermedades(1).subscribe(enfermedades=>this.enfermedades=enfermedades)

    //this.tipo=this.historial.enfermedad.tipoEnfermedad
    //this.tipo={"id":this.historial.enfermedad.tipoEnfermedad.id,"nombre":this.historial.enfermedad.tipoEnfermedad.nombre}
  }

  obtenerEnfermedades(id:number){
    this.enfermedadService.getEnfermedades(id).subscribe(enfermedades=>this.enfermedades=enfermedades)
  }

  comparar(o1:Enfermedad,o2:Enfermedad){
    return o1===null || o2===null? false:o1.id===o2.id;
  }


  cargarHistorial(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
        this.historialService.getHistorial(id).subscribe( his =>this.historial = his)

    }

    )

  }


  update():void{



    this.historialService.update(this.historial).subscribe(
      historial => {
        this.router.navigate([`/home/historial_paciente/${this.historial.paciente.id}`])
        swal.fire('Historial Actualizado', 'success')
      }
    )
  }
}
