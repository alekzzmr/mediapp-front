import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicoService } from '../../../_service/medico.service';
import { Medico } from '../../../_model/medico';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css'],
  providers :[MessageService]
})
export class CreateEditComponent implements OnInit {

  medico: Medico;
  id: number;
  edicion: boolean = false;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.medico = new Medico;
    this.title = "Nuevo médico";

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  };

  close() {
    this.router.navigate(['medico']);
  };

  initForm() {
    if (this.edicion) {
      this.title = "Editar médico";
      this.medicoService.listarPorId(this.id).subscribe(data => {
        this.medico = data;
      });
    }

  };

  saveMedico() {
    if (this.edicion) {
      this.medicoService.modificar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('Datos actualizados');
        this.close()
      });
    } else {
      this.medicoService.registrar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('Medico registrado')
        this.close();
      });
    }
  };

}
