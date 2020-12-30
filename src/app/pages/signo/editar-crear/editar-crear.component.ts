import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { Signo } from 'src/app/_model/signo';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignoService } from 'src/app/_service/signo.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-crear',
  templateUrl: './editar-crear.component.html',
  styleUrls: ['./editar-crear.component.css']
})
export class EditarCrearComponent implements OnInit {

  signo: Signo = new Signo();
  pacientes: Paciente[];

  newPaciente: Paciente = new Paciente();

  maxFecha: Date = new Date();
  id: number;
  edicion: boolean = false;
  title: string;
  pacienteDialog: boolean = false;
  submitted: boolean = false;

  pacienteSelected: Paciente = new Paciente();
  fecha: Date = null;
  temp: string = '';
  pulso: string = '';
  ritmo: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signoService: SignoService,
    private pacienteService: PacienteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.title = "Nuevo registro";
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
      //console.log(this.pacientes);
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.title = "Editar signo";
      this.signoService.listarPorId(this.id).subscribe(data => {
        this.signo = data;
        this.pacienteSelected = data.paciente;
        this.fecha = new Date(moment(data.fecha).format('YYYY-MM-DD'));
        this.temp = data.temperatura;
        this.pulso = data.pulso;
        this.ritmo = data.ritmo;
      });
    }
  };

  validarFormulario() {
    return (this.pacienteSelected === null || this.fecha === null  || this.temp.length === 0 || this.pulso.length === 0 || this.ritmo.length === 0);
  }

  saveSigno() {
    this.asignarData();
    //console.log(this.signo, this.validarFormulario());
    if (this.edicion) {
      this.signoService.modificar(this.signo).pipe(switchMap(() => {
        return this.signoService.listar();
      })).subscribe(data => {
        this.signoService.setSignoCambio(data);
        this.signoService.setMensajecambio('Datos actualizados');
        this.close()
      });
    } else {
      this.signoService.registrar(this.signo).pipe(switchMap(() => {
        return this.signoService.listar();
      })).subscribe(data => {
        this.signoService.setSignoCambio(data);
        this.signoService.setMensajecambio('Medico registrado')
        this.close();
      });
    }
  };

  close() {
    this.router.navigate(['signo']);
  }

  asignarData() {
    this.signo.paciente = this.pacienteSelected;
    this.signo.fecha = moment(this.fecha).format("YYYY-MM-DDTHH:mm:ss");
    this.signo.temperatura = this.temp;
    this.signo.pulso = this.pulso;
    this.signo.ritmo = this.ritmo;
  }

  savePaciente() {
    this.submitted = true;
    if (this.newPaciente.nombres && this.newPaciente.apellidos && this.newPaciente.dni && this.newPaciente.email) {
      this.pacienteService.registrar(this.newPaciente).pipe(switchMap(() => {
          return this.pacienteService.listar();
      })).subscribe(data => {
        this.pacientes = data
        let filtro = data.filter(n => (n.nombres == this.newPaciente.nombres && n.apellidos == this.newPaciente.apellidos && n.dni == this.newPaciente.dni));
        if (filtro.length > 0) {
          this.pacienteSelected = filtro[0];
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Paciente creado', life: 3000 });
        this.newPaciente = new Paciente();
        this.pacienteDialog = false;
      });
    }
  }
}
