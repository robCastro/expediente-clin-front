import { Component, OnInit } from '@angular/core';
import {ConsultaService} from 'src/app/services/consulta.service';
import {Consulta} from 'src/app/models/consulta';
import {Router, ActivatedRoute} from '@angular/router';
import {TratamientoService} from 'src/app/services/tratamiento.service';
import {Tratamiento} from 'src/app/models/tratamiento';


@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent implements OnInit {

  consulta:Consulta= new Consulta();
  tratamientos: Tratamiento[];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private consultaService:ConsultaService,
  private tratamientoService:TratamientoService) { }

  ngOnInit() {
    this.cargarConsulta()
  }

  cargarConsulta(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
      if(id){
        this.consultaService.getConsulta(id).subscribe( (consulta) =>this.consulta =consulta),
        this.tratamientoService.getTratamientoPorConsulta(id).subscribe(tra =>this.tratamientos =tra)
      }
    }
    )
  }

}
