import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse, HttpResponse, HttpStatusCode
} from '@angular/common/http';
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

        if ((response as HttpResponse<unknown>) === null) {
          if (response instanceof HttpResponse) {
            notificationsService.showNotification('Backen unreachable, Cached Data is being served', 'warning');
            }
        }
      }
    }),

    catchError((error: HttpErrorResponse) => {
      let message: string = error.statusText;
      let colorClass = 'error';

      if (error.error) {
        message = message +`: ${error.error.message}`;
      }

      if (error.status in [401, 402, 403]) {
        colorClass = 'error';
      } else if (error.status in [500, 503]) {
        message = `${error.statusText}, Cached Data is being served`;
        colorClass = 'warning';
      }

      notificationsService.showNotification(message, colorClass);
      throw error;
    })
  );
}

