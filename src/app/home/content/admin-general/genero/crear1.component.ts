import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-crear1',
  templateUrl: './crear1.component.html',
  styleUrls: ['./crear1.component.css']
})
export class Crear1Component implements OnInit {

  private genero: Genero = new Genero();

  constructor(private generoService: GeneroService,
  private router: Router,
  private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.cargarGenero()
  }

  cargarGenero(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.generoService.getGenero(id).subscribe ( (genero) => this.genero = genero)
      }
    })
  }


  public create() : void{
    this.generoService.create(this.genero).subscribe(
      genero => {
      this.router.navigate(['home/genero'])
      swal.fire('Nuevo Genero',  `Genero ${this.genero.nombre} creado con éxito!`,'success')
    }
  );
  }

  update():void{
    this.generoService.update(this.genero)
    .subscribe( genero => {
      this.router.navigate(['home/genero'])
      swal.fire('Genero Actualizado',  `Genero ${this.genero.nombre} Actualizado con éxito!`,'success')

    })

  }

}
