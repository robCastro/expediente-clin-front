import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  private especialidad: Especialidad = new Especialidad();

  constructor(private especialidadService: EspecialidadService,
  private router: Router,
  private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.cargarEspecialidad()
  }

  cargarEspecialidad(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.especialidadService.getEspecialidad(id).subscribe ( (especialidad) => this.especialidad = especialidad)
      }
    })
  }


  public create() : void{
    this.especialidadService.create(this.especialidad).subscribe(
      especialidad => {
      this.router.navigate(['home/especialidad'])
      swal.fire('Nueva Especialidad',  `Especialidad ${this.especialidad.nombre} creada con éxito!`,'success')
    }
  );
  }

  update():void{
    this.especialidadService.update(this.especialidad)
    .subscribe( especialidad => {
      this.router.navigate(['home/especialidad'])
      swal.fire('Especialidad Actualizada',  `Especialidad ${this.especialidad.nombre} Actualizada con éxito!`,'success')

    })

  }

}
