import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {inject} from '@angular/core';
import {NotificationService} from './notification.service';


export function NotificationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const notificationsService = inject(NotificationService);

  return next(req).pipe(
    tap({
      next: (response) => {
        if ((response as HttpResponse<unknown>).status === 201) {
          if (response instanceof HttpResponse) {
            let message = `${response.statusText}: Successfully`;

            let colorClass = 'success';
            notificationsService.showNotification(message, colorClass);
            }
        }
      }
    }),

    catchError((error: HttpErrorResponse) => {
      let message: string;
      let colorClass = 'error';



      if (error.error) {
        message = error.error.message
      } else {
        message = `Error ${error.status}: ${error.error.message}`;
      }


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

