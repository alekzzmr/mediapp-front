import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuState: boolean;
  breadcrumb: MenuItem[];

  @Input() sideBar: SidebarComponent;

  items: MenuItem[];

  username: string;
  role: string;

  constructor() { }

  ngOnInit(): void {
    this.breadcrumb = [
      { label: 'Categories' },
      { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' }
    ];

    this.items = [{
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-fw pi-plus' },
        { label: 'Download', icon: 'pi pi-fw pi-download' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Add User', icon: 'pi pi-fw pi-user-plus' },
        { label: 'Remove User', icon: 'pi pi-fw pi-user-minus' }
      ]
    }];

    this.username = "Alex";
    this.role = "Admin";
  }

  toggleMenu() {
    this.sideBar.toggle();
  }

}
