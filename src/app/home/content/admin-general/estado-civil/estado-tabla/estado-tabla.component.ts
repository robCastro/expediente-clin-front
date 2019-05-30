import { Component, OnInit } from '@angular/core';
import {EstadoCivil} from 'src/app/models/estado-civil'
import {EstadoCivilService} from 'src/app/services/estado-civil.service'
import {Router} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-estado-tabla',
  templateUrl: './estado-tabla.component.html',
  styleUrls: ['./estado-tabla.component.css']
})
export class EstadoTablaComponent implements OnInit {
  private estadocivil: EstadoCivil= new EstadoCivil()
  private titulo:string ="Crear Estadocivil"
  estados: EstadoCivil[];
  private estado: EstadoCivil = new EstadoCivil()


  constructor(private estadocivilService: EstadoCivilService, private router:Router  ) { }

  ngOnInit() {
    this.estadocivilService.getEstadosCivilesActivos().subscribe(
      estados =>this.estados =estados);
  }

  reloadView(): void{
       this.estados.length = 0;
       this.estadocivilService.getEstadosCivilesActivos().subscribe(
         estados =>this.estados =estados);
   }

  delete(estadoCivil: EstadoCivil): void{
    const swalWithBootstrapButtons = swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
})

swalWithBootstrapButtons.fire({
  title: '¿Está Seguro?',
  text: `¿Seguro que desea eliminar el estado civil ${estadoCivil.nombre}?`,
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, eliminar',
  cancelButtonText: 'No, cancelar!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {

    this.estadocivilService.deleteLogico(estadoCivil).subscribe(
      response =>{

        this.reloadView();
        swalWithBootstrapButtons.fire(
          'Estado Civil eliminado!',
          `Estado Civil ${estadoCivil.nombre} eliminado con éxito`,
          'success'
        )
      }
    )
  }
})

  }

}
