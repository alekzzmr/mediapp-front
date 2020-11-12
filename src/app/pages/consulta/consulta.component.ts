import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  paciente: Paciente;

  medicos: Medico[];
  medico: Medico;

  especialidades: Especialidad[];
  especialidad: Especialidad;

  fecha: Date;
  es: any;

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService
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

  mostrar() {
    console.log(this.paciente);
  }
}
