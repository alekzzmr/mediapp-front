import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Rol } from '../../_model/rol';
import { RolService } from '../../_service/rol.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario = new Usuario();

  roles: Rol[];

  loading: boolean;
  submitted: boolean;
  selectedUsuario: Usuario[];

  usuarioDialog: boolean;
  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
    });

    this.rolService.listar().subscribe(data => {
      this.roles = data;
    });

    this.usuarioService.getMensajeCambio().subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: data, life: 3000 });
    })

    this.usuarioService.getUsuarioCambio().subscribe(data => {
      this.usuarios = data;
    });
  }

  showSelected() {
    console.log(this.selectedUsuario);
  }

  openNew() {
    this.usuario = new Usuario;
    this.submitted = false;
    this.usuarioDialog = true;
  }

  hideDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
  }

  saveUsuario() {
    this.submitted = true;
    //console.log(this.examen.nombres.trim());
    if (this.usuario.username && this.usuario.enabled && this.usuario.password) {
      if (this.usuario.idUsuario) {
        this.usuarioService.modificar(this.usuario).pipe(switchMap(() => {
          return this.usuarioService.listar();
        })).subscribe(data => {
          this.usuarioService.setUsuarioCambio(data);
          this.usuarioService.setMensajeCambio('Usuario modificado');
          this.usuarioDialog = false;
        });
      } else {
        this.usuarioService.registrar(this.usuario).pipe(switchMap(() => {
          return this.usuarioService.listar();
        })).subscribe(data => {
          this.usuarioService.setUsuarioCambio(data);
          this.usuarioService.setMensajeCambio('Usuario registrado');
          this.usuarioDialog = false;
        });
      }
    }
  }

  editUsuario(us: Usuario) {
    this.usuario = {...us};
    this.usuarioDialog = true;
  }

  deleteUsuario(us: Usuario) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres desactivar al usuario '+us.username+'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.usuarioService.eliminar(us.idUsuario).pipe(switchMap(() => {
            return this.usuarioService.listar()
          })).subscribe(data => {
            this.usuarioService.setUsuarioCambio(data);
            this.usuarioService.setMensajeCambio('Usuario eliminado');
            this.selectedUsuario = null;
          });
        }
    });
  }
}
