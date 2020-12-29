import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import {Message} from 'primeng/api';
//import {MessageService} from 'primeng/api'

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  email: string;
  porcentaje: number = 0;

  msgs: Message[];
  constructor(
    private loginService: LoginService,
    public route: ActivatedRoute,
  //  private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  enviar(){
    this.porcentaje = 20;
    this.loginService.enviarCorreo(this.email).subscribe(data => {
      if (data === 1) {
        this.msgs = [{severity:'success', summary:'Success', detail:'Se enviaron las indicaciones al correo.'}];
        /* this.mensaje = "Se enviaron las indicaciones al correo."
        this.error = null */
        this.porcentaje = 100;
      } else {
        this.msgs = [{severity:'error', summary:'Error', detail:'El usuario ingresado no existe.'}];
        /* this.error = "El usuario ingresado no existe"; */
        this.porcentaje = 0;
      }
    });
  }
}
