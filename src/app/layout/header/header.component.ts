import { Component, Input, OnInit, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginService } from '../../_service/login.service';
import { Router } from '@angular/router';

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
  roles: string [];

  constructor(
    public loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      /* { label: 'Alex Montalvo' },
      { label: 'Facebook', url: 'https://www.facebook.com/alekzzmr' } */
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

    this.getSessionData();

  }

  toggleMenu() {
    this.sideBar.toggle();
  }

  getSessionData() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);
    this.username = decodedToken.user_name;
    this.roles = decodedToken.authorities
  }

  irPerfil() {
    this.router.navigate(['perfil']);
  }

}
