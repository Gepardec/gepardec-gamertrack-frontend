import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from './notification.service';

export function NotificationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const notificationsService = inject(NotificationService);

  return next(req).pipe(
    tap({
      next: (response) => {
        if (response instanceof HttpResponse && response.status === 201) {
          const message = `${response.statusText}: Successfully`;
          const colorClass = 'success';
          notificationsService.showNotification(message, colorClass);
        }
      },
    }),
    catchError((error: HttpErrorResponse) => {
      // Default values
      let message = error.statusText || 'Error';
      let colorClass = 'error';

      // Network error or backend unavailable (browser shows status 0 on network issues)
      const backendUnavailableStatuses = [0, 502, 503, 504];
      if (backendUnavailableStatuses.includes(error.status)) {
        message = 'Der Server ist derzeit nicht erreichbar, versuchen sie es später noch einmal!';
        colorClass = 'warning';
      } else if ([401, 402, 403].includes(error.status)) {
        colorClass = 'error';
      } else if ([500].includes(error.status)) {
        message = `${error.statusText}, Cached Data is being served`;
        colorClass = 'warning';
      }

      notificationsService.showNotification(message, colorClass);
      return throwError(() => error);
    })
  );
}

