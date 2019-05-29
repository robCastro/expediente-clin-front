import { Component, OnInit } from '@angular/core';
import {EstadoCivil} from 'src/app/models/estado-civil'
import {EstadoCivilService} from 'src/app/services/estado-civil.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent implements OnInit {
  private estadocivil: EstadoCivil= new EstadoCivil()
  private titulo:string ="Crear Estadocivil"
  estados: EstadoCivil[];
  private estado: EstadoCivil = new EstadoCivil()

  constructor(private estadocivilService: EstadoCivilService, private router:Router,
  private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.cargarEstadoCivil()
  }

  public create(): void{
    this.estadocivilService.create(this.estadocivil).subscribe(
      response => {
        this.router.navigate(['/home/estado_civil_t'])
        swal.fire('Nuevo Estado Civil',`Estado Civil ${this.estadocivil.nombre} creado con éxito`, 'success')
      }
    );
  }

  cargarEstadoCivil(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
      if(id){
        this.estadocivilService.getEstadoCivil(id).subscribe( (estadocivil) =>this.estadocivil =estadocivil)

      }
    }

    )
  }

  update():void{
    this.estadocivilService.update(this.estadocivil).subscribe(
      estadocivil => {
        this.router.navigate(['/home/estado_civil_t'])
        swal.fire('Estado Civil Actualizado',`Estado Civil ${this.estadocivil.nombre} actualizado con éxito`, 'success')
      }
    )
  }

}
