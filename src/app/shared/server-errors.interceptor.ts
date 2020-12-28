import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService ,private router : Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.REINTENTOS)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(err);

                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request', life: 5000 });
                }
                else if (err.status === 401) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token vencido', life: 5000 });
                  sessionStorage.clear();
                  this.router.navigate(['/login']);
                }
                else if (err.status === 404){
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El recurso no existe', life: 5000 });
                }
                else if (err.status === 403) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No tiene permiso para este recurso', life: 5000 });
                    //sessionStorage.clear();
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del servidor', life: 5000 });
                } else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: '', life: 5000 });
                }
                return EMPTY;
            }));
    }
}
