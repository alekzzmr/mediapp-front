import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu>{
  private menuCambio = new Subject<Menu[]>();
  private mensajeCambio = new Subject<string>();
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/menus`);
  }

  listarPorUsuario(nombre: string) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getMenuCambio(){
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menu: Menu[]){
    this.menuCambio.next(menu);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
}
