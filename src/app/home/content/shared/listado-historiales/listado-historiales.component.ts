import { Component, OnInit } from '@angular/core';
import { HistorialClinicoService } from 'src/app/services/historial-clinico.service';
import { HistorialClinico } from 'src/app/models/historial-clinico';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-listado-historiales',
  templateUrl: './listado-historiales.component.html',
  styleUrls: ['./listado-historiales.component.css']
})
export class ListadoHistorialesComponent implements OnInit {

  historiales:HistorialClinico[];
  id:number;
  paciente:Paciente;

  constructor(private historialService: HistorialClinicoService,
              private activatedRoute:ActivatedRoute,
              private pacienteService: PacienteService) { }

  ngOnInit() {
    this.cargarHistorial()
    this.pacienteService.getPaciente(this.id).subscribe(paciente=>this.paciente=paciente)
  }

  cargarHistorial(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
      this.id=id
      if(id){
        this.historialService.getHistorialPorPaciente(id).subscribe(
          historiales =>this.historiales=historiales);
      }
    })
  }

  historialesEx():boolean{
    if (this.historiales.length != 0)
      return true;
    else
      return false;
  }

  reloadView(): void{
    this.historiales.length = 0;
    this.historialService.getHistorialPorPaciente(this.id).subscribe(
      historiales =>this.historiales=historiales);
  }

  delete(historial: HistorialClinico): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está Seguro?',
      text: `¿Seguro que desea eliminar el historial ${historial.enfermedad.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.historialService.deleteHistorial(historial.id).subscribe(
          response =>{
            this.reloadView();
            swalWithBootstrapButtons.fire(
              'Historial eliminado!',
              `Historial ${historial.enfermedad.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    })
  }

}
