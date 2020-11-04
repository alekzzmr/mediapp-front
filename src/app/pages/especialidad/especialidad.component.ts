import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Especialidad } from '../../_model/especialidad';
import { EspecialidadService } from '../../_service/especialidad.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class EspecialidadComponent implements OnInit {

  especialidades: Especialidad[];
  especialidad: Especialidad;

  loading: boolean;
  submitted: boolean;
  selectedEspecialidad: Especialidad[];

  especialidadDialog: boolean;

  constructor(
    private especialidadService: EspecialidadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });

    this.especialidadService.getMensajeCambio().subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: data, life: 3000 });
    })

    this.especialidadService.getEspecialidadCambio().subscribe(data => {
      this.especialidades = data;
    });
  }

  showSelected() {
    console.log(this.selectedEspecialidad);
  }

  openNew() {
    this.especialidad = new Especialidad;
    this.submitted = false;
    this.especialidadDialog = true;
  }

  hideDialog() {
    this.especialidadDialog = false;
    this.submitted = false;
  }

  saveEspecialidad() {
    this.submitted = true;
    //console.log(this.especialidad.nombres.trim());
    if (this.especialidad.nombre && this.especialidad.descripcion) {
      if (this.especialidad.idEspecialidad) {
        this.especialidadService.modificar(this.especialidad).pipe(switchMap(() => {
          return this.especialidadService.listar();
        })).subscribe(data => {
          this.especialidadService.setEspecialidadCambio(data);
          this.especialidadService.setMensajeCambio('Especialidad modificada');
          this.especialidadDialog = false;
        });
      } else {
        this.especialidadService.registrar(this.especialidad).pipe(switchMap(() => {
          return this.especialidadService.listar();
        })).subscribe(data => {
          this.especialidadService.setEspecialidadCambio(data);
          this.especialidadService.setMensajeCambio('Especialidad registrada');
          this.especialidadDialog = false;
        });
      }
    }
  }

  editEspecialidad(especialidad: Especialidad) {
    this.especialidad = {...especialidad};
    this.especialidadDialog = true;
  }

  deleteEspecialidad(especialidad: Especialidad) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar al especialidad '+especialidad.nombre+'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.especialidadService.eliminar(especialidad.idEspecialidad).pipe(switchMap(() => {
            return this.especialidadService.listar()
          })).subscribe(data => {
            this.especialidadService.setEspecialidadCambio(data);
            this.especialidadService.setMensajeCambio('Especialidad eliminada');
            this.selectedEspecialidad = null;
          });
        }
    });
  }

  deleteSelectedEspecialidades() {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar los especialidads seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
      accept: () => {

            /* this.especialidads = this.especialidads.filter(val => !this.selectedespecialidad.includes(val)); */
            this.selectedEspecialidad = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'especialidades eliminados', life: 3000});
        }
    });
  }
}
