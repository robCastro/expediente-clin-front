import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-cita-crear',
  templateUrl: './cita-crear.component.html',
  styleUrls: ['./cita-crear.component.css']
})
export class CitaCrearComponent implements OnInit {

  //Variables.
  citas: Consulta[];
  cita_nueva: Consulta = new Consulta();
  paciente: Paciente = new Paciente();
  doctor: Usuario = new Usuario();
  fecha: string;

  //Eventos del FullCalendar.
  eventos = [];

  constructor(private citasService: CitaService, 
              private pacienteService: PacienteService,
              private doctorService: UsuarioService) {}

  //Select del FullCalendar e Inicio para Crear una Cita.            
  select(start, end, jsEvent, view){

    if (start.isAfter(moment())) {
      swal.fire({
        title: '¿Desea reservar cita?',
        text: "Fecha de reserva: "+ start.format('DD-MM-YYYY') + " y su hora de reserva: "+ start.format("h(:mm)a"),
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor:'btn btn-danger',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          console.log('Clicked on: ' + start.format());
          console.log('Hora: '+start.format("H"))
          var hora = parseInt(start.format("H"));
          this.crear_cita(start.format(), hora);
        }
      })
    } else {
      swal.fire({
        type: 'error',
        title: 'Error',
        text: 'No se puede insertar una cita en el pasado.'
      })
    }
  }

  //ngOnInit
  ngOnInit(){

    //Desplegar las fechas de las citas por doctor y el hospital del paciente.
    this.citasService.citasPorDoctor('3','1').subscribe(
    
      citas_service => {

        this.citas = citas_service;
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
              title: this.citas[i].usuario.nombres, 
              start: new Date(this.citas[i].fecha +"T"+this.citas[i].hora+":00:00"),
              end: new Date(this.citas[i].fecha +"T"+nueva_fecha_fin[i]+":00:00")
            })
        }

        //FullCalendar.
        $('#calendar').fullCalendar({
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
          /*select: function(start, end, jsEvent, view) {
            if (start.isAfter(moment())) {
      
              var eventTitle = prompt("Provide Event Title");
              if (eventTitle) {
                $("#calendar").fullCalendar('renderEvent', {
                  title: eventTitle,
                  start: start,
                  end: end,
                  stick: true
                });
                alert('Appointment booked at: ' + start.format("h(:mm)a"));
                console.log('Clicked on: ' + start.format());
              }
            } else {
              alert('Cannot book an appointment in the past');
            }
          },*/
          select: (start, end, jsEvent, view) => {
            this.select(start, end, jsEvent, view);
          },
          eventClick: function(calEvent, jsEvent, view) {
            alert('Event: ' + calEvent.title);
          },
        });


      }
    )

    this.pacienteService.getPaciente(1).subscribe(
      pacient => this.paciente = pacient
    )

    this.doctorService.getUsuario(3).subscribe(
      doc => this.doctor = doc
    )

    console.log(this.eventos);

  } // Fin ngOnInit


  crear_cita(time, hour): void {
 
    //let time = this.datepipe.transform(fecha.toLocaleString("en-UTC"),'yyyy-MM-dd');
    //this.cita_nueva.fecha = (time.getTime()).toString();
    this.cita_nueva.fecha = time;
    this.cita_nueva.hora = hour;
    this.cita_nueva.peso = null;
    this.cita_nueva.temperatura = null;
    this.cita_nueva.estatura = null;
    this.cita_nueva.presion = null;
    this.cita_nueva.ritmo = null;
    this.cita_nueva.sintoma = null;

    this.cita_nueva.paciente = this.paciente;
    this.cita_nueva.usuario = this.doctor; //El doctor que hace la consulta.
    this.cita_nueva.enfermedad = null;
    this.citasService.create(this.cita_nueva).subscribe(
      response => {
        console.log(this.cita_nueva);
      }
    );
  }

}
