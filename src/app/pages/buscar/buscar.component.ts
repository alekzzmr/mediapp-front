import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { FiltroConsultaDTO } from 'src/app/_dto/filtroConsultaDTO';
import { ConsultaListaExamenDTO } from 'src/app/_dto/consultaListaExamenDTO';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Paciente } from 'src/app/_model/paciente';
import * as moment from 'moment';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: any;

  consultas: Consulta[];
  detalleConsulta: DetalleConsulta[];
  paciente: Paciente = new Paciente();
  examenes: ConsultaListaExamenDTO[];

  es: any;
  loading: boolean;
  detalleDialog: boolean = false;
  maxFecha: Date = new Date();
  constructor(private consultaService : ConsultaService) { }

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.form ={
      dni: null,
      nombreCompleto: null,
      fechaConsulta : null
    }
  }

  buscar() {
    let filtro = new FiltroConsultaDTO(this.form.dni, this.form.nombreCompleto, moment(this.form.fechaConsulta).format('YYYY-MM-DDTHH:mm:ss'));

    if(filtro.fechaConsulta!='Invalid date'){
      delete filtro.dni;
      delete filtro.nombreCompleto;
    }else{
      delete filtro.fechaConsulta;

      if (filtro.dni === null) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto === null) {
        delete filtro.nombreCompleto
      }
    }

    console.log(filtro);

    this.consultaService.buscar(filtro).subscribe(data => {
      this.consultas = data;

      //console.log(data);
    });
  }

  hideDialog() {
    this.detalleDialog = false;
  }

  verDetalle(consulta: Consulta) {
    this.detalleConsulta = consulta.detalleConsulta;
    this.paciente = consulta.paciente;
    this.listarExamenes(consulta);
    this.detalleDialog = !this.detalleDialog;
  }

  listarExamenes(c){
    this.consultaService.listarExamenPorConsulta(c.idConsulta).subscribe(data => {
      this.examenes = data;
    })
  }

}
