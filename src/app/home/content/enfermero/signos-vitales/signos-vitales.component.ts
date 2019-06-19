import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/models/consulta';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/services/consulta.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signos-vitales',
  templateUrl: './signos-vitales.component.html',
  styleUrls: ['./signos-vitales.component.css']
})
export class SignosVitalesComponent implements OnInit {

  consulta:Consulta;

  constructor(private consultaService:ConsultaService,
              private activatedRoute:ActivatedRoute,
              private router:Router,) { }

  ngOnInit() {
    this.cargarConsulta();
  }

  cargarConsulta(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
      if(id){
        this.consultaService.getConsulta(id).subscribe(
          consulta =>this.consulta=consulta);
      }
    })
  }

  guardar():void{
    this.consultaService.updateSignosV(this.consulta).subscribe(
      consulta => {
        swal.fire('Signos vitales registrados',`Signos vitales del paciente ${this.consulta.paciente.usuario.nombres} ${this.consulta.paciente.usuario.apellidos} registrados con éxito`, 'success')
        this.router.navigate(['/home/citasEnf'])
      }
    )
  }

}
