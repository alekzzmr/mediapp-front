import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Signo } from '../_model/signo';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignoService extends GenericService<Signo>{
  private signosCambio = new Subject<Signo[]>();
  private mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signos`
    );
  }

  getSignoCambio(){
    return this.signosCambio.asObservable();
  }

  setSignoCambio(signos: Signo[]){
    this.signosCambio.next(signos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajecambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
}
