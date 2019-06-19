import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar'
import swal from 'sweetalert2';
import { Consulta } from '../../../../models/consulta';
import { Paciente } from '../../../../models/paciente';
import { Usuario } from '../../../../models/usuario';
import { CitaService } from '../../../../services/cita.service';
import { PacienteService } from '../../../../services/paciente.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cita-lista',
  templateUrl: './cita-lista.component.html',
  styleUrls: ['./cita-lista.component.css']
})
export class CitaListaComponent implements OnInit {

  //Variables
  paciente: Paciente = new Paciente();
  citas: Consulta[];
  cita: Consulta = new Consulta();

  //Eventos del FullCalendar.
  eventos = [];

  constructor(private citasService: CitaService, 
              private pacienteService: PacienteService,
              private doctorService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  //Click en el evento del FullCalendar.
  eventClick (calEvent, jsEvent, view) {

    //Para el condicional.
    var prueba = new Date((calEvent.end).toString());
    var cita_end = moment(prueba);

    //Para los swal.
    var inicio_date = new Date((calEvent.start).toString());
    var inicio_moment = moment(inicio_date).format('DD-MM-YYYY h:mma');
    var fin_date = new Date((calEvent.end).toString());
    var fin_moment = moment(fin_date).format('DD-MM-YYYY h:mma');


    //Citas antes de ahora con minutos segundos exactos.
    if(cita_end.isBefore(moment())) {
      //Si la cita es antes, puede ver el detalle del tratamiento.

    } else {
      //Si la cita después puede borrarla.
      swal.fire({
        title: '¿Eliminar cita?',
        html: `Cita doctor: ${calEvent.title} <br> <strong>Inicio</strong>: ${inicio_moment} <br> <strong>Fin</strong>: ${fin_moment}`,
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          //Eliminando la cita.
          this.citasService.delete(calEvent.id).subscribe(
            response => {
              this.router.navigateByUrl(`/cita_listado/${this.paciente.id}`, {skipLocationChange: true}).then(()=>
              this.router.navigate([`/home/cita_listado/${this.paciente.id}`]));
              swal.fire('Cita eliminada');
            }
          )
        }
      })
    }
  }


  ngOnInit() {

    //El paciente que se encuentra en sesion.
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          //Obtencion del paciente.
          this.pacienteService.getPaciente(id).subscribe(
            pacient => {
              this.paciente = pacient;
              this.citasService.citasPorPaciente((this.paciente.id).toString(), (this.paciente.usuario.hospital.id).toString()).subscribe(
                citas => {
                  this.citas = citas;
                  var nueva_fecha_fin = [];
                  for(var i =0; i < this.citas.length; i++) 
                  {
                    if(parseInt(this.citas[i].hora)<=9){
                      this.citas[i].hora = "0"+this.citas[i].hora;
                    } 
    
                    nueva_fecha_fin[i] = parseInt(this.citas[i].hora)+1;
                    if(nueva_fecha_fin[i]<=9){
                      nueva_fecha_fin[i] = "0"+nueva_fecha_fin[i];
                    } 
    
                    console.log(
                      "Inicio" +
                      new Date(this.citas[i].fecha +"T"+this.citas[i].hora+":00:00")
                      +"Fin"+
                      new Date(this.citas[i].fecha +"T"+nueva_fecha_fin[i]+":00:00")
                    );
    
                    //Insertando en el Array de Eventos para desplegar el FullCalendar.
                    this.eventos.push( 
                      {
                        id: this.citas[i].id,
                        title: this.citas[i].usuario.nombres, 
                        start: new Date(this.citas[i].fecha +"T"+this.citas[i].hora+":00:00"),
                        end: new Date(this.citas[i].fecha +"T"+nueva_fecha_fin[i]+":00:00")
                      })
                  }
                  console.log(this.eventos);
                  $('#calendar').fullCalendar({
                    locale: 'es',
                    contentHeight: "auto",
                    defaultView: 'agendaDay',
                    selectable: true,
                    minTime: "08:00:00",
                    maxTime: "17:00:00",
                    slotDuration: '00:60:00',
                    slotLabelInterval: 15,
                    slotLabelFormat: 'h(:mm)a',
                    header: {
                      left: 'prev,next today',
                      center: 'title',
                      right: 'agendaDay,agendaWeek,listDay'
                    },
                    events: this.eventos,
                    businessHours: [{
                      dow: [1, 2, 3, 4, 5], // Monday - Friday
                      start: '08:00',
                      end: '12:00',
                    }, {
                      dow: [1, 2, 3, 4, 5], // Monday - Friday (if adding lunch hours)
                      start: '13:00',
                      end: '17:00',
                    }],
                    selectConstraint: "businessHours",
                    eventClick: (calEvent, jsEvent, view) => {
                      this.eventClick(calEvent, jsEvent, view);
                    },
                    
                  });
                }
              );

            }
          )
        }
      }
    );


  }

}
