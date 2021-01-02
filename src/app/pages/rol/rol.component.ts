import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Rol } from '../../_model/rol';
import { RolService } from '../../_service/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  roles: Rol[];
  rol: Rol = new Rol();

  loading: boolean;
  submitted: boolean;
  selectedRol: Rol[];
  rolDialog: boolean;

  constructor(
    private rolService: RolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.rolService.listar().subscribe(data => {
      this.roles = data;
    });

    this.rolService.getMensajeCambio().subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: data, life: 3000 });
    })

    this.rolService.getRolCambio().subscribe(data => {
      this.roles = data;
    });
  }

  openNew() {
    this.rol = new Rol;
    this.submitted = false;
    this.rolDialog = true;
  }

  hideDialog() {
    this.rolDialog = false;
    this.submitted = false;
  }

  saveRol() {
    this.submitted = true;
    //console.log(this.examen.nombres.trim());
    if (this.rol.nombre && this.rol.descripcion) {
      if (this.rol.idRol) {
        this.rolService.modificar(this.rol).pipe(switchMap(() => {
          return this.rolService.listar();
        })).subscribe(data => {
          this.rolService.setRolCambio(data);
          this.rolService.setMensajeCambio('Rol modificado');
          this.rolDialog = false;
        });
      } else {
        this.rolService.registrar(this.rol).pipe(switchMap(() => {
          return this.rolService.listar();
        })).subscribe(data => {
          this.rolService.setRolCambio(data);
          this.rolService.setMensajeCambio('Rol registrado');
          this.rolDialog = false;
        });
      }
    }
  }

  editRol(us: Rol) {
    this.rol = {...us};
    this.rolDialog = true;
  }

  deleteRol(us: Rol) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar el rol '+us.nombre+'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.rolService.eliminar(us.idRol).pipe(switchMap(() => {
            return this.rolService.listar()
          })).subscribe(data => {
            this.rolService.setRolCambio(data);
            this.rolService.setMensajeCambio('Rol eliminado');
            this.selectedRol = null;
          });
        }
    });
  }
}
