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
import { ActivatedRoute, Router } from '@angular/router';

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
  doctores: Usuario[];
  fecha: string;

  //Eventos del FullCalendar.
  eventos = [];

  constructor(private citasService: CitaService, 
              private pacienteService: PacienteService,
              private doctorService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  //Select del FullCalendar e Inicio para Crear una Cita.            
  select(start, end, jsEvent, view){

    if (start.isAfter(moment())) {
      swal.fire({
        title: '¿Desea reservar cita?',
        text: "Fecha de reserva: "+ start.format('DD-MM-YYYY') + " y su hora de reserva: "+ start.format("h(:mm)a")
              + " con el Doctor: "+this.doctor.nombres,
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

    //El paciente que se encuentra en sesion o el que pondra el recepcionista.
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          //Obtencion del paciente.
          this.pacienteService.getPaciente(id).subscribe(
            pacient => {
              this.paciente = pacient;
                //Los doctores del hospital especifico (del hospital del paciente u enfermera).
                this.doctorService.doctoresPorHospital(this.paciente.usuario.hospital.id).subscribe(
                  doc => this.doctores = doc
                )
            }
          )
        }
      }
    );

  } // Fin ngOnInit

  calendario(id: any): void{
    //El doctor especifico.
    if (id == "0"){

    } else {
      console.log(id);
      //Inicializando eventos otra vez a 0 para que no guarde nada.
      this.eventos = [];
      this.doctorService.getUsuario(id).subscribe(

        doc => {
          this.doctor = doc;
            //Desplegar las fechas de las citas por doctor y el hospital del paciente.
            this.citasService.citasPorDoctor((id).toString(), (this.paciente.usuario.hospital.id).toString()).subscribe(
            
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
                $("#calendar").fullCalendar("destroy");
                $("#calendar").fullCalendar("render");
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
                  select: (start, end, jsEvent, view) => {
                    this.select(start, end, jsEvent, view);
                  },
                  eventClick: function(calEvent, jsEvent, view) {
                    var inicio_date = new Date((calEvent.start).toString());
                    var inicio_moment = moment(inicio_date).format('DD-MM-YYYY h:mma');
                    var fin_date = new Date((calEvent.end).toString());
                    var fin_moment = moment(fin_date).format('DD-MM-YYYY h:mma');

                    swal.fire({
                      title: 'Cita',
                      html: `Cita doctor: ${calEvent.title} <br> <strong>Inicio</strong>: ${inicio_moment} <br> <strong>Fin</strong>: ${fin_moment}`,
                    })
                  },
                });
                console.log(this.eventos);
              }
            )
        }
      )
    }

  }

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
        this.router.navigateByUrl(`/cita_listado/${this.paciente.id}`, {skipLocationChange: true}).then(()=>
        this.router.navigate([`/home/cita_listado/${this.paciente.id}`]));
      }
    );
  }

}
