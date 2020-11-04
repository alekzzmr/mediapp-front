import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../_service/medico.service';
import { Medico } from '../../_model/medico';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  providers :[MessageService,ConfirmationService]
})
export class MedicoComponent implements OnInit {

  medicos: Medico[];

  constructor(
    private medicoService: MedicoService,
    private router: Router,
    public route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });

    this.medicoService.getMedicoCambio().subscribe(data => {
      this.medicos = data;
    })

    this.medicoService.getMensajeCambio().subscribe(data => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: data,
        life: 3000
      });
    })
  }

  openNew() {
    this.router.navigate(['create'], {
      relativeTo: this.route
    });
  }

  openEdit(id: number) {
    this.router.navigate(['edit', id], {
      relativeTo: this.route
    });
  }

  deleteMedico(medico: Medico) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que quieres eliminar al medico '+medico.nombres+'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.medicoService.eliminar(medico.idMedico).pipe(switchMap(() => {
            return this.medicoService.listar();
          })).subscribe(data => {
            this.medicoService.setMedicoCambio(data);
            this.medicoService.setMensajeCambio('Medico eliminado');
          });
        }
    });
  }
}
