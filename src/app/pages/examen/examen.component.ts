import { Component, OnInit } from '@angular/core';
import { Examen } from '../../_model/examen';
import { ExamenService } from '../../_service/examen.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  examenes: Examen[];
  examen: Examen;

  loading: boolean;
  submitted: boolean;
  selectedExamen: Examen[];

  examenDialog: boolean;

  constructor(
    private examenService: ExamenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.examen = new Examen;

    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });

    this.examenService.getMensajeCambio().subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: data, life: 3000 });
    })

    this.examenService.getExamenCambio().subscribe(data => {
      this.examenes = data;
    });
  }

  showSelected() {
    console.log(this.selectedExamen);
  }

  openNew() {
    this.examen = new Examen;
    this.submitted = false;
    this.examenDialog = true;
  }

  hideDialog() {
    this.examenDialog = false;
    this.submitted = false;
  }

  saveExamen() {
    this.submitted = true;
    //console.log(this.examen.nombres.trim());
    if (this.examen.nombre && this.examen.descripcion) {
      if (this.examen.idExamen) {
        this.examenService.modificar(this.examen).pipe(switchMap(() => {
          return this.examenService.listar();
        })).subscribe(data => {
          this.examenService.setExamenCambio(data);
          this.examenService.setMensajeCambio('examen modificada');
          this.examenDialog = false;
        });
      } else {
        this.examenService.registrar(this.examen).pipe(switchMap(() => {
          return this.examenService.listar();
        })).subscribe(data => {
          this.examenService.setExamenCambio(data);
          this.examenService.setMensajeCambio('Examen registrado');
          this.examenDialog = false;
        });
      }
    }
  }

  editExamen(examen: Examen) {
    this.examen = {...examen};
    this.examenDialog = true;
  }

  deleteExamen(examen: Examen) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar al examen '+examen.nombre+'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.examenService.eliminar(examen.idExamen).pipe(switchMap(() => {
            return this.examenService.listar()
          })).subscribe(data => {
            this.examenService.setExamenCambio(data);
            this.examenService.setMensajeCambio('Examen eliminada');
            this.selectedExamen = null;
          });
        }
    });
  }

  deleteSelectedexamenes() {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar los examens seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
      accept: () => {

            /* this.examens = this.examens.filter(val => !this.selectedexamen.includes(val)); */
            this.selectedExamen = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Examenes eliminados', life: 3000});
        }
    });
  }

}
