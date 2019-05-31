import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

generos: Genero[];

  constructor(private generoService: GeneroService) { }

  ngOnInit() {
   this.generoService.getGeneros().subscribe(
     generos => this.generos = generos
   );
 }

 delete(genero: Genero): void {
   swal.fire({
     title: 'Está seguro?',
     text: `¿Seguro que desea eliminar el genero ${genero.nombre}?`,
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

       this.generoService.delete(genero.id).subscribe(
         response => {
           this.generos = this.generos.filter(gen => gen !== genero)
           swal.fire(
             'Genero Eliminado!',
             `Genero ${genero.nombre} eliminado con éxito.`,
             'success'
           )
         }
       )

     }
   })
 }

}
