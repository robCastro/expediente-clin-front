import { Component, OnInit } from '@angular/core';
import {ConsultaService} from 'src/app/services/consulta.service';
import {Consulta} from 'src/app/models/consulta';
import {Router, ActivatedRoute} from '@angular/router';
import {GrupoTerapeuticoService} from 'src/app/services/grupo-terapeutico.service';
import {MedicamentoService} from 'src/app/services/medicamento.service';
import {TratamientoService} from 'src/app/services/tratamiento.service';
import {GrupoTerapeutico} from 'src/app/models/grupo-terapeutico';
import {Medicamento} from 'src/app/models/medicamento';
import {Tratamiento} from 'src/app/models/tratamiento';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

consulta:Consulta= new Consulta();
tratamiento:Tratamiento= new Tratamiento();
gruposTera:GrupoTerapeutico[];
medicamentos:Medicamento[];
tratamientos: Tratamiento[];
id:number;
error:any={isError:false,errorMessage:''};

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private consultaService:ConsultaService,private grupoTeraService: GrupoTerapeuticoService,
  private medicamentoService:MedicamentoService, private tratamientoService:TratamientoService) { }

  ngOnInit() {
    this.cargarConsulta(),
    this.grupoTeraService.getGruposTera().subscribe(gTerapeuticos=>this.gruposTera=gTerapeuticos),
    this.medicamentoService.getMedicamentos(1).subscribe(medica=>this.medicamentos=medica),
    this.tratamiento.medicamento={"id":1,"nombre":"Ibuprofeno"}

  }

  obtenerMedicamentos(id:number){
    this.medicamentoService.getMedicamentos(id).subscribe(medicamentos=>this.medicamentos=medicamentos)
  }

  comparar(o1:Medicamento,o2:Medicamento){
    return o1===null || o2===null? false:o1.id===o2.id;
  }

  cargarConsulta(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id= params['id']
      this.id=id
      if(id){
        this.consultaService.getConsulta(id).subscribe( (consulta) =>this.consulta =consulta),
        this.tratamientoService.getTratamientoPorConsulta(id).subscribe(tra =>this.tratamientos =tra)
      }
    }
    )
  }

  public create(): void{

    this.tratamiento.consulta=this.consulta

    this.tratamientoService.create(this.tratamiento).subscribe(
      response => {
        swal.fire('Nuevo Medicamento Agregado',`Medicamento: ${this.tratamiento.medicamento.nombre}`, 'success')
        this.reloadView()
        this.limpiar()
      }
    );
  }

  limpiar(){
    this.tratamiento.fechaInicio=null;
    this.tratamiento.fechaFin=null;
    this.tratamiento.frecuencia=' ';
    this.tratamiento.dosis=' ';
  }

  reloadView(): void{
     this.tratamientos.length = 0;
     this.tratamientoService.getTratamientoPorConsulta(this.id).subscribe(
       trat =>this.tratamientos=trat);
 }

 delete(tratamiento: Tratamiento): void{
   const swalWithBootstrapButtons = swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false,
   })

   swalWithBootstrapButtons.fire({
     title: '¿Está Seguro?',
     text: `¿Seguro que desea eliminar el medicamento ${tratamiento.medicamento.nombre}?`,
     type: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Si, eliminar',
     cancelButtonText: 'No, cancelar!',
     reverseButtons: true
   }).then((result) => {
     if (result.value) {
       this.tratamientoService.delete(tratamiento.id).subscribe(
         response =>{
           this.reloadView();
           swalWithBootstrapButtons.fire(
             'Medicamento eliminado!',
             `Medicamento ${tratamiento.medicamento.nombre} eliminado con éxito`,
             'success'
           )
         }
       )
     }
   })
 }


}
