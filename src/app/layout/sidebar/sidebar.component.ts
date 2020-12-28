import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LoginService } from '../../_service/login.service';
import { Menu } from 'src/app/_model/menu';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width :'240px',
        left:'0px'
      })),
      state('closed', style({
        width :'0px',
        left :'-240px'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class SidebarComponent implements OnInit {

  items: MenuItem[];
  isOpen = true;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    /* this.items = [{
      items: [
        {
          label: 'Buscar',
          icon: 'pi pi-search',
          routerLink: 'buscar'
        },
        {
          label: 'Resgistrar',
          icon: 'pi pi-pencil',
          routerLink: 'consulta'
        },
        {
          label: 'Especialidades.',
          icon: 'pi pi-sitemap',
          routerLink: 'especialidad'
        },
        {
          label: 'Médicos',
          icon: 'pi pi-user-plus',
          routerLink: 'medico'
        },
        {
          label: 'Exámenes',
          icon: 'pi pi-file',
          routerLink: 'examen'
        },
        {
          label: 'Pacientes',
          icon: 'pi pi-users',
          routerLink: 'paciente'
        },
        {
          label: 'Reportes',
          icon: 'pi pi-chart-bar',
          routerLink: 'reports'
        }
      ]}
    ]; */

    this.loginService.getMenuCambio().subscribe(data => {

      let m = []
      data.forEach(e=> {
        m.push({
          label: e.nombre,
          icon: e.icono,
          routerLink : e.url
        });
      });

      this.items = [{
        items: m
      }];
    });
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

}
