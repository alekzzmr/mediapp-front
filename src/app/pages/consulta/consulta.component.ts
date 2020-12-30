import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { ConsultaListaExamenDTO } from 'src/app/_dto/consultaListaExamenDTO';
import * as moment from 'moment';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  paciente: Paciente;
  medicos: Medico[];
  medico: Medico;
  especialidades: Especialidad[];
  especialidad: Especialidad;
  detalleConsulta: DetalleConsulta[] = [];
  detConsulta: DetalleConsulta = new DetalleConsulta();
  examenes: Examen[];
  examen: Examen;
  examenesSeleccionados: Examen[] = [];

  fecha: Date;
  maxFecha: Date = new Date();

  detalleDialog: boolean = false;
  examenDialog: boolean = false;
  es: any;
  submitted: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }

    this.listarPaciente();
    this.listarMedicos();
    this.listarEspecialidades();
    this.listarExamenes();
  }

  listarPaciente() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

  listarEspecialidades() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }

  registrarConsulta() {
    if (!this.estadoBotonRegistrar()) {

      let cons = new Consulta();
      cons.especialidad = this.especialidad;
      cons.medico = this.medico;
      cons.paciente = this.paciente;
      cons.numConsultorio = "C1";
      cons.fecha = moment(this.fecha).format("YYYY-MM-DDTHH:mm:ss");
      cons.detalleConsulta = this.detalleConsulta;

      let CLEDTO = new ConsultaListaExamenDTO();
      CLEDTO.consulta = cons;
      CLEDTO.lstExamen = this.examenesSeleccionados;

      this.consultaService.registrarTransaccion(CLEDTO).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Registro exitoso', detail: "La consulta fue registrada exitosamente", life: 3000 });
        this.limpiarVariables();
      })
    }
  }

  AddDetalle() {
    this.detalleConsulta.push(this.detConsulta);
    this.detConsulta = new DetalleConsulta();
    this.detalleDialog = false;
    //console.log(this.detConsulta, this.detalleConsulta);
  }

  deleteDetalle(detalle : DetalleConsulta) {
    this.detalleConsulta = this.detalleConsulta.filter(val => val!=detalle);
  }

  AddExamen() {
    let c = 0;
    this.examenesSeleccionados.forEach(e => {
      if (e.idExamen == this.examen.idExamen) c++;
    });

    if (c > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "El examen ya esta listado", life: 3000 });
    } else {
      console.log("pusheando");
      this.examenesSeleccionados.push(this.examen);
      this.examen = null;
    }

    /*this.examenesSeleccionados.push(this.examen);
    this.examenes=this.examenes.filter(val => val.idExamen != this.examen.idExamen);
    this.examen = null; */
    this.examenDialog = false;
  }

  deleteExamen(ex: Examen) {
    this.examenes.push(ex);
    this.examenesSeleccionados = this.examenesSeleccionados.filter(val => val != ex);
    //console.log(this.examenes);
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidad.idEspecialidad === 0 || this.medico.idMedico === 0 || this.paciente.idPaciente === 0);
  }

  limpiarVariables() {
    this.paciente = new Paciente();
    this.medico = new Medico();
    this.especialidad = new Especialidad();
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.fecha = null;
  }
}
