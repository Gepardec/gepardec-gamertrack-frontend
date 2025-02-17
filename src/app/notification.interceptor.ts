import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptor, HttpErrorResponse, HttpResponse, HttpHeaderResponse
} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {NotificationService} from './notification.service';


export function NotificationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const notificationsService = inject(NotificationService);

  return next(req).pipe(
    tap({
      next: (response) => {
        if ((response as HttpResponse<unknown>).status === 201) {


          if (response instanceof HttpResponse) {
            console.log("HIER")
            let message = `${response.statusText}: Successfully`;

            let colorClass = 'success';
            notificationsService.showNotification(message, colorClass);
            }
        }
        console.log('Response:', response);
      }
    }),

    catchError((error: HttpErrorResponse) => {
      let message = 'Ein Fehler ist aufgetreten';
      let colorClass = 'error';

      message = `Error ${error.status}: ${error.statusText}`;


      if (error.status === 401 || error.status === 402 || error.status === 403) {
        colorClass = 'error';
      } else if (error.status === 500) {
        colorClass = 'warning';
      }

      notificationsService.showNotification(message, colorClass);
      throw error;
    })
  );
}

