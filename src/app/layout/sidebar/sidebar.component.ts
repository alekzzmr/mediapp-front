import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { trigger, state, style, animate, transition } from '@angular/animations';


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

  constructor() { }

  ngOnInit(): void {
    this.items = [{
      items: [
        {
          label: 'Buscar',
          icon: 'pi pi-search',
          routerLink: 'medico'
        },
        {
          label: 'Resgistrar',
          icon: 'pi pi-pencil',
          routerLink: 'medico'
        },
        {
          label: 'Registrar E.',
          icon: 'pi pi-pencil',
          routerLink: 'medico'
        },
        {
          label: 'Registrar W.',
          icon: 'pi pi-paperclip',
          routerLink: 'medico'
        },
        {
          label: 'Especialidades.',
          icon: 'pi pi-sitemap',
          routerLink: 'medico'
        },
        {
          label: 'Médicos',
          icon: 'pi pi-user-plus',
          routerLink: 'medico'
        },
        {
          label: 'Exámenes',
          icon: 'pi pi-file',
          routerLink: 'medico'
        },
        {
          label: 'Pacientes',
          icon: 'pi pi-users',
          routerLink: 'paciente'
        },
        {
          label: 'Resportes',
          icon: 'pi pi-chart-bar',
          routerLink: 'paciente'
        }


      ]}
    ];
  }

  update() {
      alert("updated")
  }

  delete() {
      alert("deleted")
  }

  toggle() {
    //alert('hola toggle')
    this.isOpen = !this.isOpen;
  }

}
