import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http'


import { routes } from './app.routes';
import {NotificationInterceptor} from './core/notification/notification.interceptor';
import {NotificationService} from './core/notification/notification.service';
import { provideServiceWorker } from '@angular/service-worker';
import {PromptUpdate} from './core/serviceWorker/promptUpdate';
import {UpdateService} from './core/serviceWorker/update.service';
import {LogUpdateService} from './core/serviceWorker/logUpdate.service';
import {authInterceptor} from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(
      withInterceptors([NotificationInterceptor, authInterceptor]),
    ),
    NotificationService,
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }),
    LogUpdateService,
    UpdateService,
    PromptUpdate,
  ]
};
