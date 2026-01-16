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
import { HealthService } from '../health/health.service';

export function NotificationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const notificationsService = inject(NotificationService);
  const healthService = inject(HealthService);

  return next(req).pipe(
    tap({
      next: (response) => {
        if (response instanceof HttpResponse) {
          // Success notification example
          if (response.status === 201) {
            const message = `${response.statusText}: Successfully`;
            const colorClass = 'success';
            notificationsService.showNotification(message, colorClass);
          }

          // Reset DB down flag when health endpoint succeeds
          if (req.url.includes('/gepardec-gamertrack/api/v1/health') && response.status >= 200 && response.status < 300) {
            healthService.setDbDown(false);
          }
        }
      },
    }),
    catchError((error: HttpErrorResponse) => {
      // Default values
      let message = error.statusText || 'Error';
      let colorClass = 'error';

      // Specific handling: database health endpoint indicates DB outage with 503
      if (req.url.includes('/gepardec-gamertrack/api/v1/health')) {
        if (error.status === 503) {
          healthService.setDbDown(true);
          message = 'Die Datenbank ist derzeit nicht erreichbar. Bitte versuchen Sie es später erneut.';
          colorClass = 'error';
          notificationsService.showNotification(message, colorClass);
        }
        return throwError(() => error);
      }

      // If DB is marked as down, suppress other error notifications to avoid overriding the DB message
      if (healthService.isDbDown()) {
        return throwError(() => error);
      }

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

