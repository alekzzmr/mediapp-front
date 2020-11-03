import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../_model/paciente';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PacienteService } from './../../_service/paciente.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers :[MessageService,ConfirmationService]
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[];
  paciente: Paciente;

  loading: boolean;
  submitted: boolean;
  selectedPaciente: Paciente[];

  pacienteDialog: boolean;

  constructor(private pacienteService: PacienteService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loading = false;
    this.paciente = new Paciente;

    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    })
  }

  showSelected() {
    console.log(this.selectedPaciente);
  }

  openNew() {
    this.paciente = new Paciente;
    this.submitted = false;
    this.pacienteDialog = true;
  }

  hideDialog() {
    this.pacienteDialog = false;
    this.submitted = false;
  }

  savePaciente() {
    this.submitted = true;
    //console.log(this.paciente.nombres.trim());
    if (this.paciente.nombres && this.paciente.apellidos && this.paciente.dni && this.paciente.email) {
      if (this.paciente.idPaciente) {
        this.pacienteService.modificar(this.paciente).pipe(switchMap(() => {
          return this.pacienteService.listar();
        })).subscribe(data => {
          this.pacientes = data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Paciente modificado', life: 3000 });
          this.pacienteDialog = false;
        });
      } else {
        this.pacienteService.registrar(this.paciente).pipe(switchMap(() => {
          return this.pacienteService.listar();
        })).subscribe(data => {
          this.pacientes = data
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Paciente creado', life: 3000 });
          this.pacienteDialog = false;
        });
      }
    }
  }

  editPaciente(paciente: Paciente) {
    this.paciente = {...paciente};
    this.pacienteDialog = true;
  }

  deletePaciente(paciente: Paciente) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar al paciente '+paciente.nombres+'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.pacienteService.eliminar(paciente.idPaciente).pipe(switchMap(() => {
            return this.pacienteService.listar()
          })).subscribe(data => {
            this.pacientes = data
            this.selectedPaciente = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Paciente eliminado', life: 3000 });
          });
        }
    });
  }

  deleteSelectedPacientes() {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar los pacientes seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
      accept: () => {

            /* this.pacientes = this.pacientes.filter(val => !this.selectedPaciente.includes(val)); */
            this.selectedPaciente = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Pacientes eliminados', life: 3000});
        }
    });
  }
}
