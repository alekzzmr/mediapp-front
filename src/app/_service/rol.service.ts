import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Rol } from '../_model/rol'
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService extends GenericService<Rol>{

  private rolCambio = new Subject<Rol[]>();
  private mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/roles`
    );
  }

  getRolCambio(){
    return this.rolCambio.asObservable();
  }

  setRolCambio(rol: Rol[]){
    this.rolCambio.next(rol);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
