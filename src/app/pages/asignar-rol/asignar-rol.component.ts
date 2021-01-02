import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Menu } from 'src/app/_model/menu';
import { Rol } from 'src/app/_model/rol';
import { Usuario } from 'src/app/_model/usuario';
import { MenuService } from 'src/app/_service/menu.service';
import { RolService } from 'src/app/_service/rol.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.css']
})
export class AsignarRolComponent implements OnInit {

  rolesUsuarioNoAsignado: Rol[] = [];
  rolesMenuNoAsignado: Rol[] = [];

  usuarios: Usuario[];
  roles: Rol[];
  menus: Menu[];

  usuarioSelected: Usuario = new Usuario();
  menuSelected: Menu = new Menu();

  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.rolService.listar().subscribe(data => {
      this.roles = data;
    });

    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
    });

    this.menuService.listar().subscribe(data => {
      this.menus = data;
    })
  }

  getRolesUsuario() {
    this.rolesUsuarioNoAsignado = this.roles.filter(n =>  !this.usuarioSelected.roles.some( a => a.idRol === n.idRol));
  }

  cambioUsuarioRol() {
    this.usuarioService.modificar(this.usuarioSelected).subscribe(data => {
      this.usuarioService.setMensajeCambio(`Roles del usuario ${this.usuarioSelected.username} actualizados`);
    })
  }

  cambioMenuRol() {
    this.menuService.modificar(this.menuSelected).subscribe(data => {
      this.menuService.setMensajeCambio(`Roles actualizados del menu ${this.menuSelected.nombre} actualizados`);
    })
  }

  getRolesMenu() {
    this.rolesMenuNoAsignado = this.roles.filter(n =>  !this.menuSelected.roles.some( a => a.idRol === n.idRol));
  }
}
