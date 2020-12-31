import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Message } from 'primeng/api';
import { from } from 'rxjs';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import { PasswordValidation } from '../recuperar/token/match';
import { Usuario } from '../../_model/usuario';
import { UsuarioService } from '../../_service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  username: string;
  roles: string[];
  token: any;

  form: FormGroup;
  msgs: Message[];
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });

    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    this.token = token;
    const decodedToken = helper.decodeToken(token);
    this.username = decodedToken.user_name;
    this.roles = decodedToken.authorities
  }

  onSubmit() {
    this.usuarioService.findByUsername(this.username).subscribe(data => {
      let user = data as Usuario;
      user.password = this.form.value.password;
      this.usuarioService.cambiarPassword(user).subscribe(data => {
        this.msgs = [{ severity: 'success', summary: 'Success', detail: 'Se cambio la contraseña.' }];
        setTimeout(() => {
          this.loginService.cerrarSesion();
          this.router.navigate(['login']);
        }, 2000);
      });
    });


    /* let clave: string = this.form.value.confirmPassword;
    this.loginService.restablecer(this.token, clave).subscribe(data => {
      this.msgs = [{ severity: 'success', summary: 'Success', detail: 'Se cambio la contraseña.' }];
      setTimeout(() => {
        this.loginService.cerrarSesion();
        this.router.navigate(['login']);
      }, 2000);
    }); */
  }
}
