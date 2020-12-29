import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { PasswordValidation } from './match';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  form: FormGroup;
  token: string;
  msgs: Message[];
  rpta: number;
  tokenValido: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService : LoginService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });

    this.route.params.subscribe((params : Params) => {
      this.token = params['token'];
      this.loginService.verificarTokenReset(this.token).subscribe(data => {

        if(data === 1){
          this.tokenValido = true;
        } else {
          this.msgs = [{ severity: 'error', summary: 'Error', detail: 'El token ya ha expirado.' }];
          this.tokenValido = false;
          setTimeout( () => {
            this.router.navigate(['login']);
          }, 2000)
        }
      });
    })
  }

  onSubmit() {
    //console.log(this.form.invalid);
    let clave: string = this.form.value.confirmPassword;
    this.loginService.restablecer(this.token, clave).subscribe(data => {
      this.msgs = [{ severity: 'success', summary: 'Success', detail: 'Se cambio la contraseña.' }];
      /* this.mensaje = 'Se cambio la contraseña'; */
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    });
  }
}
