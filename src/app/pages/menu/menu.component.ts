import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';
import { Rol } from 'src/app/_model/rol';
import { MenuService } from 'src/app/_service/menu.service';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: Menu[];
  menu: Menu = new Menu();
  roles: Rol[];

  loading: boolean;
  submitted: boolean;
  selectedMenu: Menu[];
  menuDialog: boolean;
  iconos: any [];
  constructor(
    private menuService: MenuService,
    private rolService: RolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.menuService.listar().subscribe(data => {
      this.menus = data;
      console.log(this.menus);
    });

    this.menuService.getMensajeCambio().subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: data, life: 3000 });
    })

    this.menuService.getMenuCambio().subscribe(data => {
      this.menus = data;
    });

    this.rolService.listar().subscribe(data => {
      this.roles = data;
    });

    this.iconos = [
      { name: "pi pi-align-center" },
      { name: "pi pi-align-justify" },
      { name: "pi pi-align-left" },
      { name: "pi pi-align-right" },
      { name: "pi pi-amazon" },
      { name: "pi pi-android" },
      { name: "pi pi-angle-double-down" },
      { name: "pi pi-angle-double-left" },
      { name: "pi pi-angle-double-right" },
      { name: "pi pi-angle-double-up" },
      { name: "pi pi-angle-down" },
      { name: "pi pi-angle-left" },
      { name: "pi pi-angle-right" },
      { name: "pi pi-angle-up" },
      { name: "pi pi-apple" },
      { name: "pi pi-arrow-circle-down" },
      { name: "pi pi-arrow-circle-left" },
      { name: "pi pi-arrow-circle-right" },
      { name: "pi pi-arrow-circle-up" },
      { name: "pi pi-arrow-down" },
      { name: "pi pi-arrow-left" },
      { name: "pi pi-arrow-right" },
      { name: "pi pi-arrow-up" },
      { name: "pi pi-backward" },
      { name: "pi pi-ban" },
      { name: "pi pi-bars" },
      { name: "pi pi-bell" },
      { name: "pi pi-book" },
      { name: "pi pi-bookmark" },
      { name: "pi pi-briefcase" },
      { name: "pi pi-calendar" },
      { name: "pi pi-calendar-minus" },
      { name: "pi pi-calendar-plus" },
      { name: "pi pi-calendar-times" },
      { name: "pi pi-camera" },
      { name: "pi pi-caret-down" },
      { name: "pi pi-caret-left" },
      { name: "pi pi-caret-right" },
      { name: "pi pi-caret-up" },
      { name: "pi pi-chart-bar" },
      { name: "pi pi-chart-line" },
      { name: "pi pi-check" },
      { name: "pi pi-check-circle" },
      { name: "pi pi-check-square" },
      { name: "pi pi-chevron-circle-down" },
      { name: "pi pi-chevron-circle-left" },
      { name: "pi pi-chevron-circle-right" },
      { name: "pi pi-chevron-circle-up" },
      { name: "pi pi-chevron-down" },
      { name: "pi pi-chevron-left" },
      { name: "pi pi-chevron-right" },
      { name: "pi pi-chevron-up" },
      { name: "pi pi-circle-off" },
      { name: "pi pi-circle-on" },
      { name: "pi pi-clock" },
      { name: "pi pi-clone" },
      { name: "pi pi-cloud" },
      { name: "pi pi-cloud-download" },
      { name: "pi pi-cloud-upload" },
      { name: "pi pi-cog" },
      { name: "pi pi-comment" },
      { name: "pi pi-comments" },
      { name: "pi pi-compass" },
      { name: "pi pi-copy" },
      { name: "pi pi-credit-card" },
      { name: "pi pi-desktop" },
      { name: "pi pi-directions" },
      { name: "pi pi-directions-alt" },
      { name: "pi pi-discord" },
      { name: "pi pi-dollar" },
      { name: "pi pi-download" },
      { name: "pi pi-eject" },
      { name: "pi pi-ellipsis-h" },
      { name: "pi pi-ellipsis-v" },
      { name: "pi pi-envelope" },
      { name: "pi pi-euro" },
      { name: "pi pi-exclamation-circle" },
      { name: "pi pi-exclamation-triangle" },
      { name: "pi pi-external-link" },
      { name: "pi pi-eye" },
      { name: "pi pi-eye-slash" },
      { name: "pi pi-facebook" },
      { name: "pi pi-fast-backward" },
      { name: "pi pi-fast-forward" },
      { name: "pi pi-file" },
      { name: "pi pi-file-excel" },
      { name: "pi pi-file-o" },
      { name: "pi pi-file-pdf" },
      { name: "pi pi-filter" },
      { name: "pi pi-filter-slash" },
      { name: "pi pi-flag" },
      { name: "pi pi-folder" },
      { name: "pi pi-folder-open" },
      { name: "pi pi-forward" },
      { name: "pi pi-github" },
      { name: "pi pi-globe" },
      { name: "pi pi-google" },
      { name: "pi pi-heart" },
      { name: "pi pi-home" },
      { name: "pi pi-id-card" },
      { name: "pi pi-image" },
      { name: "pi pi-images" },
      { name: "pi pi-inbox" },
      { name: "pi pi-info" },
      { name: "pi pi-info-circle" },
      { name: "pi pi-key" },
      { name: "pi pi-link" },
      { name: "pi pi-list" },
      { name: "pi pi-lock" },
      { name: "pi pi-lock-open" },
      { name: "pi pi-map" },
      { name: "pi pi-map-marker" },
      { name: "pi pi-microsoft" },
      { name: "pi pi-minus" },
      { name: "pi pi-minus-circle" },
      { name: "pi pi-mobile" },
      { name: "pi pi-money-bill" },
      { name: "pi pi-moon" },
      { name: "pi pi-palette" },
      { name: "pi pi-paperclip" },
      { name: "pi pi-pause" },
      { name: "pi pi-paypal" },
      { name: "pi pi-pencil" },
      { name: "pi pi-percentage" },
      { name: "pi pi-phone" },
      { name: "pi pi-play" },
      { name: "pi pi-plus" },
      { name: "pi pi-plus-circle" },
      { name: "pi pi-power-off" },
      { name: "pi pi-print" },
      { name: "pi pi-question" },
      { name: "pi pi-question-circle" },
      { name: "pi pi-refresh" },
      { name: "pi pi-replay" },
      { name: "pi pi-reply" },
      { name: "pi pi-save" },
      { name: "pi pi-search" },
      { name: "pi pi-search-minus" },
      { name: "pi pi-search-plus" },
      { name: "pi pi-send" },
      { name: "pi pi-share-alt" },
      { name: "pi pi-shield" },
      { name: "pi pi-shopping-cart" },
      { name: "pi pi-sign-in" },
      { name: "pi pi-sign-out" },
      { name: "pi pi-sitemap" },
      { name: "pi pi-slack" },
      { name: "pi pi-sliders-h" },
      { name: "pi pi-sliders-v" },
      { name: "pi pi-sort" },
      { name: "pi pi-sort-alpha-down" },
      { name: "pi pi-sort-alpha-down-alt" },
      { name: "pi pi-sort-alpha-up" },
      { name: "pi pi-sort-alpha-up-alt" },
      { name: "pi pi-sort-alt" },
      { name: "pi pi-sort-amount-down" },
      { name: "pi pi-sort-amount-down-alt" },
      { name: "pi pi-sort-amount-up" },
      { name: "pi pi-sort-amount-up-alt" },
      { name: "pi pi-sort-down" },
      { name: "pi pi-sort-numeric-down" },
      { name: "pi pi-sort-numeric-down-alt" },
      { name: "pi pi-sort-numeric-up" },
      { name: "pi pi-sort-numeric-up-alt" },
      { name: "pi pi-sort-up" },
      { name: "pi pi-spinner" },
      { name: "pi pi-star" },
      { name: "pi pi-star-o" },
      { name: "pi pi-step-backward" },
      { name: "pi pi-step-backward-alt" },
      { name: "pi pi-step-forward" },
      { name: "pi pi-step-forward-alt" },
      { name: "pi pi-sun" },
      { name: "pi pi-table" },
      { name: "pi pi-tablet" },
      { name: "pi pi-tag" },
      { name: "pi pi-tags" },
      { name: "pi pi-th-large" },
      { name: "pi pi-thumbs-down" },
      { name: "pi pi-thumbs-up" },
      { name: "pi pi-ticket" },
      { name: "pi pi-times" },
      { name: "pi pi-times-circle" },
      { name: "pi pi-trash" },
      { name: "pi pi-twitter" },
      { name: "pi pi-undo" },
      { name: "pi pi-unlock" },
      { name: "pi pi-upload" },
      { name: "pi pi-user" },
      { name: "pi pi-user-edit" },
      { name: "pi pi-user-minus" },
      { name: "pi pi-user-plus" },
      { name: "pi pi-users" },
      { name: "pi pi-video" },
      { name: "pi pi-vimeo" },
      { name: "pi pi-volume-down" },
      { name: "pi pi-volume-off" },
      { name: "pi pi-volume-up" },
      { name: "pi pi-wallet" },
      { name: "pi pi-wifi" },
      { name: "pi pi-window-maximize" },
      { name: "pi pi-window-minimize" },
      { name: "pi pi-youtube" }
    ]
  }

  openNew() {
    this.menu = new Menu;
    this.submitted = false;
    this.menuDialog = true;
  }

  hideDialog() {
    this.menuDialog = false;
    this.submitted = false;
  }

  saveMenu() {
    this.submitted = true;
    //console.log(this.examen.nombres.trim());
    if (this.menu.nombre && this.menu.icono && this.menu.url) {
      if (this.menu.idMenu) {
        this.menuService.modificar(this.menu).pipe(switchMap(() => {
          return this.menuService.listar();
        })).subscribe(data => {
          this.menuService.setMenuCambio(data);
          this.menuService.setMensajeCambio('examen modificada');
          this.menuDialog = false;
        });
      } else {
        this.menuService.registrar(this.menu).pipe(switchMap(() => {
          return this.menuService.listar();
        })).subscribe(data => {
          this.menuService.setMenuCambio(data);
          this.menuService.setMensajeCambio('Examen registrado');
          this.menuDialog = false;
        });
      }
    }
  }

  editMenu(us: Menu) {
    this.menu = {...us};
    this.menuDialog = true;
  }

  deleteMenu(us: Menu) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de que quieres eliminar al menu '+us.nombre+'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.menuService.eliminar(us.idMenu).pipe(switchMap(() => {
            return this.menuService.listar()
          })).subscribe(data => {
            this.menuService.setMenuCambio(data);
            this.menuService.setMensajeCambio('Menu eliminado');
            this.selectedMenu = null;
          });
        }
    });
  }
}
