import { Component, OnInit } from '@angular/core';
import { Signo } from '../../_model/signo';
import { SignoService } from '../../_service/signo.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signo',
  templateUrl: './signo.component.html',
  styleUrls: ['./signo.component.css']
})
export class SignoComponent implements OnInit {

  signos: Signo[];
  selectedSigno: Signo;

  loading: boolean = false;
  constructor(
    private signoService: SignoService,
    private messageService: MessageService,
    private router: Router,
    public route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listarSignosVitales();
    this.signoService.getMensajeCambio().subscribe(data => {
      this.messageService.add({ severity: 'success',  summary: 'Successful',  detail: data,  life: 3000 });
    });
  }

  listarSignosVitales() {
    this.signoService.listar().subscribe(data => {
      this.signos = data;
    });
    this.signoService.getSignoCambio().subscribe(data => {
      this.signos = data;
    });
  }
  openNew() {
    this.router.navigate(['create'], {
      relativeTo: this.route
    });
  }

  editSigno(s: Signo) {
    this.router.navigate(['edit', s.idSigno], {
      relativeTo: this.route
    });
  }

  deleteSigno(s: Signo) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que quieres eliminar los signos vitales de paciente '+s.paciente.nombres+'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.signoService.eliminar(s.idSigno).pipe(switchMap(() => {
            return this.signoService.listar();
          })).subscribe(data => {
            this.signoService.setSignoCambio(data);
            this.signoService.setMensajecambio('Signos vitales eliminado');
          });
        }
    });
  }

}
