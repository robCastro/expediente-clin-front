import { Component, OnInit } from '@angular/core';
import { TipoEnfermedadService } from '../../../../services/tipo-enfermedad.service';
import { TipoEnfermedad } from '../../../../models/tipo-enfermedad';
import { Enfermedad } from '../../../../models/enfermedad';
import { EnfermedadService } from '../../../../services/enfermedad.service';
import { ActivatedRoute } from '@angular/router';
import { Consulta } from '../../../../models/consulta';
import { ConsultaService } from '../../../../services/consulta.service';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  tiposEnfermedades: TipoEnfermedad[];
  enfermedades: Enfermedad[];
  consulta: Consulta;

  constructor(
    private tipoEnfermedadService: TipoEnfermedadService,
    private enfermedadService: EnfermedadService,
    private consultaService:ConsultaService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarConsulta();
    console.log("On init");
    this.tipoEnfermedadService.getTipoEnfermedades().subscribe(tipos => {
      this.tiposEnfermedades = tipos;
    });
    this.enfermedadService.getEnfermedades(1).subscribe(enfermedades => {
      this.enfermedades = enfermedades;
    });
  }

  obtenerEnfermedades(id:number){
    console.log(id);
    this.enfermedadService.getEnfermedades(id).subscribe(resp => {
      this.enfermedades = resp;
    });
  }

  private cargarConsulta(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.consultaService.getConsulta(id).subscribe(
          consulta =>{
            this.consulta=consulta;
            this.consulta.paciente.usuario.fecha = this.consulta.paciente.usuario.fecha.substring(0, 10);
            console.log(this.consulta);
          });
      }
    });
  }
}
