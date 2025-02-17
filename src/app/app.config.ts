import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http'
import { authInterceptor } from './auth.interceptor';


import { routes } from './app.routes';
import {NotificationInterceptor} from './notification.interceptor';
import {NotificationService} from './notification.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withInterceptors([NotificationInterceptor]),
    ), NotificationService

  ]
};
