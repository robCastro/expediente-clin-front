import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import swal from 'sweetalert2';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

especialidades: Especialidad[];

  constructor(private especialidadService: EspecialidadService,
  private authService : AuthService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.especialidadService.getEspecialidades().subscribe(
     especialidades => this.especialidades = especialidades
   );
 }

 delete(especialidad: Especialidad): void {
   swal.fire({
     title: 'Está seguro?',
     text: `¿Seguro que desea eliminar la especialidad ${especialidad.nombre}?`,
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, eliminar!',
     cancelButtonText: 'No, cancelar!',
     confirmButtonClass: 'btn btn-success',
     cancelButtonClass: 'btn btn-danger',
     buttonsStyling: false,
     reverseButtons: true
   }).then((result) => {
     if (result.value) {

       this.especialidadService.delete(especialidad.id).subscribe(
         response => {
           this.especialidades = this.especialidades.filter(espe => espe !== especialidad)
           swal.fire(
             'Especialidad Eliminada!',
             `Especialidad ${especialidad.nombre} eliminado con éxito.`,
             'success'
           )
         }
       )

     }
   })
 }

}
