import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/usuario';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{
  private usuarioCambio = new Subject<Usuario[]>();
  private mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/usuarios`
    );
  }

  getUsuarioCambio(){
    return this.usuarioCambio.asObservable();
  }

  setUsuarioCambio(usuario: Usuario[]){
    this.usuarioCambio.next(usuario);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

  cambiarPassword(usuario: Usuario) {
    return this.http.put(`${environment.HOST}/usuarios/cambiarpass`, usuario);
  }

  findByUsername(username: string) {
    return this.http.post(`${environment.HOST}/usuarios/listarpornombre`, username,
    { headers: new HttpHeaders().set('Content-Type', 'text/plain') });
  }
}
