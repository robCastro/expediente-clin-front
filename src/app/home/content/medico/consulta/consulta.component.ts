import { Component, OnInit } from '@angular/core';
import { TipoEnfermedadService } from '../../../../services/tipo-enfermedad.service';
import { TipoEnfermedad } from '../../../../models/tipo-enfermedad';
import { Enfermedad } from '../../../../models/enfermedad';
import { EnfermedadService } from '../../../../services/enfermedad.service';
import { ActivatedRoute } from '@angular/router';
import { Consulta } from '../../../../models/consulta';


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
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("On init");
    this.tipoEnfermedadService.getTipoEnfermedades().subscribe(tipos => {
      this.tiposEnfermedades = tipos;
    });
    this.enfermedadService.getEnfermedades(1).subscribe(enfermedades => {
      this.enfermedades = enfermedades;
    });
    this.cargarConsulta();
  }

  obtenerEnfermedades(id:number){
    console.log(id);
    this.enfermedadService.getEnfermedades(id).subscribe(resp => {
      this.enfermedades = resp;
    });
  }

  cargarConsulta(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
    });
  }
}
